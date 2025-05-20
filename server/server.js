import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

// API URL for people data
const apiBase = `https://fdnd-agency.directus.app/items/atlas_`;

var apiPersons = `person/`;
var apiAddress = `address/`;
var apiPoster = `poster/`;
var apiFamily = `family/`;

// Will store fetched API data here
let fetchedData = [];

async function fetchData() {
  try {
    const posterRes = await fetch(`${apiBase}poster/?fields=*,files.*`);
    const json = await posterRes.json();

    json.data.forEach(poster => {
      console.log(JSON.stringify(poster, null, 2));
    });

    return json.data; // return enriched poster data
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}


// Fetch data on startup
fetchData()
  .then(data => {
    fetchedData = data;
    console.log('Fetched data:', fetchedData);
  })
  .catch(err => {
    console.error('Error in fetchData:', err);
  });

// Set up Liquid template engine
const engine = new Liquid({
  extname: '.liquid',
});

// Create tinyhttp app
const app = new App();

// Middleware + static file serving
app
  .use(logger())
  .use('/', sirv('dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

// Home route using fetched API data
app.get('/', async (req, res) => {
  return res.send(renderTemplate('server/views/index.liquid', {
    title: 'Home',
    people: fetchedData
  }));
});

// Liquid rendering helper
const renderTemplate = (template, data) => {
  return engine.renderFileSync(template, data);
};
