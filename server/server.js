import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';
import bodyParser from 'body-parser'

// API URL base
const testJson = `/json/details.json`;

let testData = null;

fetchTestData();

async function fetchTestData() {
  try {
    const filePath = path.resolve('./server/json/details.json');
    const file = await fs.readFile(filePath, 'utf-8');
    testData = JSON.parse(file); // 👈 store globally
    return testData;
  } catch (error) {
    console.error('Fout bij ophalen van testdata:', error);
    return null;
  }
}

// ✅ LiquidJS setup
const engine = new Liquid({ extname: '.liquid' });
const renderTemplate = (template, data) => engine.renderFileSync(template, data);

// ✅ tinyhttp server
const app = new App();

app.use(bodyParser.json());

let numberOfRoses = 0;
const bloemenVoorStraat = {};

const __dirname = path.resolve();

app
  .use(logger())
  .use('/images', sirv('images'))
  .use('/fonts', sirv(path.join(__dirname, 'fonts')))
  .use('/', sirv('dist')) // statische bestanden
  .listen(3000, () => console.log('Server gestart op http://localhost:3000'));

// ✅ Home route met verrijkte data
app.get('/', async (req, res) => {
  return res.send(renderTemplate('server/views/index.liquid', {
    title: 'Home'
  }));
});

app.get('/verhalen/:id', (req, res) => {
  const verhaalId = req.params.id;

  if (!testData) {
    return res.status(500).send('Data nog niet geladen');
  }

  const verhaalData = testData.find(v => v.verhaal.id === verhaalId);

  if (!verhaalData) {
    return res.status(404).send('Verhaal niet gevonden');
  }

  return res.send(renderTemplate('server/views/verhaal-detail.liquid', {
    title: verhaalData.verhaal.titel,
    item: verhaalData.verhaal
  }));
});

app.get('/print/qr/:id', async (req, res) => {
  const id = req.params.id;
  const detailUrl = `http://localhost:3000/verhalen/${id}`; // Change to your real URL in production

  try {
    const qrDataUrl = await QRCode.toDataURL(detailUrl);

    return res.send(renderTemplate('server/views/print-qr.liquid', {
      title: `QR voor adres ${id}`,
      qrDataUrl,
      detailUrl
    }));
  } catch (err) {
    console.error(err);
    return res.status(500).send('QR Code kon niet worden gegenereerd.');
  }
});

app.get('/gedenkmuur', async (req, res) => {
  const straatSet = new Set(testData.map(item => item.verhaal.straat));
  const straten = Array.from(straatSet);

  const selectedStraat = req.query.straat;

  let filteredItems = testData;

  if (selectedStraat) {
    filteredItems = filteredItems.filter(item =>
      item.verhaal.straat === selectedStraat
    );
  }

  return res.send(renderTemplate('server/views/gedenkmuur.liquid', {
    title: 'Gedenkmuur',
    items: testData,
    straten,
    selectedStraat,
    numberOfRoses,
    bloemenVoorStraat 
  }));
});

app.get('/families', async (req, res) => {
  // Maak een unieke map van familie -> id
  const familieMap = new Map();
  testData.forEach(item => {
    const { familie, id } = item.verhaal;
    if (!familieMap.has(familie)) {
      familieMap.set(familie, id);
    }
  });

  const families = Array.from(familieMap.entries()).map(([naam, id]) => ({
    naam,
    id
  }));

  const selectedStraat = req.query.straat;
  const selectedFamilieNaam = req.query.familieNaam?.toLowerCase() || '';

  let filteredItems = testData;

  if (selectedStraat) {
    filteredItems = filteredItems.filter(item =>
      item.verhaal.straat === selectedStraat
    );
  }

  if (selectedFamilieNaam) {
    filteredItems = filteredItems.filter(item =>
      item.verhaal.familie.toLowerCase().includes(selectedFamilieNaam)
    );
  }

  return res.send(renderTemplate('server/views/families.liquid', {
    title: 'Families',
    items: testData,
    families,
    filteredItems,
    selectedFamilieNaam,
  }));
});

// Route voor bloemen leggen
app.post('/legbloem', (req, res) => {
  const { straat, image, alt, left, width } = req.body;

  if (!straat) {
    return res.status(400).send({ error: 'Straat is verplicht' });
  }

  if (!bloemenVoorStraat[straat]) {
    bloemenVoorStraat[straat] = [];
  }

  bloemenVoorStraat[straat].push({ src: image, alt, left, width });

  numberOfRoses++;

  return res.send({ numberOfRoses, bloemenVoorStraat });
})

app.get('/over-ons', async (req, res) => {
  return res.send(renderTemplate('server/views/over-ons.liquid', {
    title: 'Over ons'
  }));
});

app.get('/api/bloemen/:straat', (req, res) => {
  const straat = req.params.straat;

  res.json(bloemenVoorStraat[straat] || []);
});