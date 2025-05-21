import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

let numberOfRoses = 0;

// API URL base
const apiBase = `https://fdnd-agency.directus.app/items/atlas_`;

let enrichedData = [];

// ✅ Fetch en combineer data van alle endpoints
async function fetchAllData() {
  try {
    const [posterRes, addressRes, personRes, familyRes] = await Promise.all([
      fetch(`${apiBase}poster/?fields=*,covers.*,files.*`),
      fetch(`${apiBase}address/?fields=*`),
      fetch(`${apiBase}person/?fields=*`),
      fetch(`${apiBase}family/?fields=*`)
    ]);

    const [posters, addresses, persons, families] = await Promise.all([
      posterRes.json(),
      addressRes.json(),
      personRes.json(),
      familyRes.json()
    ]);

    return {
      posters: posters.data,
      addresses: addresses.data,
      persons: persons.data,
      families: families.data
    };
  } catch (error) {
    console.error('Fout bij ophalen van data:', error);
    return {};
  }
}

// ✅ Verrijk data met relaties (poster → address → person → family)
function enrichData({ posters, addresses, persons, families }) {
  const addressById = Object.fromEntries(addresses.map(a => [a.id, a]));
  const familyById = Object.fromEntries(families.map(f => [f.id, f]));

  // Voeg familie toe aan personen
  const enrichedPersons = persons.map(person => {
    let familyData = null;
    if (person.family && familyById[person.family]) {
      familyData = familyById[person.family];
    }
    return {
      ...person,
      family: familyData
    };
  });

  const enrichedPersonById = Object.fromEntries(enrichedPersons.map(p => [p.id, p]));

  // Poster verrijken
  return posters.map(poster => {
    const posterAddresses = (poster.address || []).map(addrId => {
      const addr = addressById[addrId];
      if (!addr) return null;

      const addressPersons = (addr.person || []).map(pid => enrichedPersonById[pid]).filter(Boolean);

      return {
        ...addr,
        person: addressPersons
      };
    }).filter(Boolean);

    return {
      ...poster,
      addresses: posterAddresses
    };
  });
}

// ✅ Start ophalen van data bij opstart
fetchAllData()
  .then(data => {
    enrichedData = enrichData(data);
    console.log('Gegevens succesvol verrijkt');

    console.log(JSON.stringify(enrichedData, null, 2));
  })
  .catch(err => {
    console.error('Fout bij verrijken van data:', err);
  });

// ✅ LiquidJS setup
const engine = new Liquid({ extname: '.liquid' });
const renderTemplate = (template, data) => engine.renderFileSync(template, data);

// ✅ tinyhttp server
const app = new App();

app
  .use(logger())
  .use('/images', sirv('images'))
  .use('/', sirv('dist')) // statische bestanden
  .listen(3000, () => console.log('Server gestart op http://localhost:3000'));

// ✅ Home route met verrijkte data
app.get('/', async (req, res) => {
  return res.send(renderTemplate('server/views/index.liquid', {
    title: 'Home',
    items: enrichedData
  }));
});

// ✅ Detailpagina op basis van adres-ID
app.get('/adressen/:id/', async (req, res) => {
  const id = parseInt(req.params.id);
  let item = null;

  // Zoek het adres én de bijbehorende poster
  for (const poster of enrichedData) {
    const address = poster.addresses.find(addr => addr.id === id);
    if (address) {
      item = {
        ...address,
        poster: {
          name: poster.name,
          files: poster.files,
          covers: poster.covers
        }
      };
      break;
    }
  }

  console.log('item', item);

  if (!item) {
    return res.status(404).send('Adres niet gevonden');
  }

  return res.send(renderTemplate('server/views/detail.liquid', {
    title: `Detailpagina voor adres ${id}`,
    item
  }));
});

/* Header pages */

app.get('/4-mei', async (req, res) => {
  return res.send(renderTemplate('server/views/4-mei.liquid', {
    title: '4 Mei',
    items: enrichedData
  }));
});

app.get('/terugblik', async (req, res) => {
  return res.send(renderTemplate('server/views/terugblik.liquid', {
    title: 'Terugblik',
    items: enrichedData
  }));
});

app.get('/verhalen', async (req, res) => {
  return res.send(renderTemplate('server/views/verhalen.liquid', {
    title: 'Verhalen',
    items: enrichedData
  }));
});

app.get('/gedenk-posters', async (req, res) => {
  return res.send(renderTemplate('server/views/gedenk-posters.liquid', {
    title: 'Gedenk-posters',
    items: enrichedData,
    numberOfRoses
  }));
});

app.post('/legbloem', async (req, res) => {
  numberOfRoses++;
  return res.send({ numberOfRoses });
});

app.get('/over-ons', async (req, res) => {
  return res.send(renderTemplate('server/views/over-ons.liquid', {
    title: 'Over ons',
    items: enrichedData
  }));
});

/* Header pages */