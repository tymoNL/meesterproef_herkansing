import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';

let numberOfRoses = 0;

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

app
  .use(logger())
  .use('/images', sirv('images'))
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
  const detailUrl = `http://localhost:3000/adressen/${id}`; // Change to your real URL in production

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

/* Header pages */
app.get('/gedenk-posters', async (req, res) => {
  const straatSet = new Set(testData.map(item => item.verhaal.straat));
  const straten = Array.from(straatSet);

  // Maak een unieke map van familie -> id (bijv. voor de eerste persoon met die familienaam)
  const familieMap = new Map();
  testData.forEach(item => {
    const { familie, id } = item.verhaal;
    if (!familieMap.has(familie)) {
      familieMap.set(familie, id);
    }
  });

  // Zet het om naar een array van objecten
  const families = Array.from(familieMap.entries()).map(([naam, id]) => ({
    naam,
    id
  }));

  const selectedStraat = req.query.straat;

  const filteredItems = selectedStraat
    ? testData.filter(item => item.verhaal.straat === selectedStraat)
    : testData;

console.log(numberOfRoses);

  return res.send(renderTemplate('server/views/gedenk-posters.liquid', {
    title: 'Gedenk-posters',
    items: testData,
    straten,
    families,
    filteredItems,
    selectedStraat,
    numberOfRoses
  }));
});



app.post('/legbloem', async (req, res) => {
  numberOfRoses++;
  return res.send({ numberOfRoses });
});

app.get('/over-ons', async (req, res) => {
  return res.send(renderTemplate('server/views/over-ons.liquid', {
    title: 'Over ons'
  }));
});

/* Header pages */