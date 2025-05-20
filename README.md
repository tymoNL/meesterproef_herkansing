# API

Maker: **Tymo Smids**

Datum: *2025/03/25* - *2025/04/29*

## Randvoorwaarden

- Minimaal een overzichts- en detailpagina;
- Gebouwd in TinyHTTP + Liquid;
- Minimaal een content API;
- Minimaal twee Web API's.

## Mijn project

De pagina's die ik heb zijn: een homepagina, detailpagina en een favorieten pagina. Het project is gebouwd in **TinyHTTP** en **Liquid** is de templating taal die is gebruikt. De **content API** die is gebruikt is de `MovieDB API`. De **Web API's** die gebruikt worden zijn: de `Localstorage API` en de `View transition API`.

### Verbinden met de API

De API key is opgeslagen in het `.env` bestand. Dit bestand staat in de `.gitignore`. Dit zorgt ervoor dat de key veilig wordt opgeslagen want de bestanden in de .gitignore worden niet meegestuurd naar Github. Als dit niet wordt gedaan kan iedereen bij de api key en zelf request afvuren.

```js
// ApiKey and URL for The Movie Database API
const apiKey = process.env.movieDB_APIKey;
const apiUrl = 'https://api.themoviedb.org/3/discover/movie';
```

Als de `apiUrl` direct in de browser zou worden gezet krijg je een Json bestand terug. Dit bestand is ook wat je krijgt als je een `Fetch()` afvuurt.

```js
  const response = await fetch(movieDetailsUrl);
  const item = await response.json();
```

De data die je terugkrijgt kan je nu gebruiken om de website te vullen.

```js
<article class="card">
  <img class="card__image" id="movie_{{ item.id }}" style="view-transition-name: movie_{{ item.id }}"
       src="https://image.tmdb.org/t/p/original{{ item.poster_path }}" 
       alt="{{ item.title }}" 
       title="{{ item.title }}" 
       loading="lazy"/>
  <h2 class="h2">{{ item.title }}</h2>
</article>
```

## Favorieten

Om favorieten toe te voegen heb ik gebruik gemaakt van localstorage. Dit zorgt ervoor dat de films die worden toegevoegd aan de favorieten ook daar blijven tot deze worden verwijderd. Om naar de favorieten te gaan heb ik een link naar de favorieten pagina gemaakt zodat je een lijst hebt van je favorieten lijst.

```js
// Pad naar de favorieten pagina
app.get('/favorites', async (req, res) => {
  const ids = req.query.ids ? req.query.ids.split(',') : [];

  // Check of er geen favorieten zijn
  if (!ids.length) {
    return res.send(renderTemplate('server/views/favorites.liquid', {
      title: 'Favorites',
      items: []
    }));
  }

  const items = [];

  // Haal de de details op van de films met de opgegeven ids
  for (const id of ids) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
    const response = await fetch(url);
    const movie = await response.json();

    // voeg de films toe aan de items array
    items.push(movie);  
  }

  // Render de template met de opgehaalde films
  return res.send(renderTemplate('server/views/favorites.liquid', {
    title: 'Favorites',
    items
  }));
});
```

## Zoeken

Om te kunnen zoeken wordt er getest of **search** in de URL zit. Als dit zo is wordt de API url veranderd zodat alle films worden opgehaald relevant zijn voor de zoekterm.

```js
  const searchQuery = req.query.search;

  let apiUrl;

  // Als search in de URL zit
  if (searchQuery) {
    // Gebruik de zoekendpoint van de API
    apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${page}&query=${encodeURIComponent(searchQuery)}`;
  } else {
    // Standaard ontdekking API
    const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
    apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${page}&sort_by=${sort}${genreQuery}`;
  }
```

## CSS

Alle `liquid` bestanden hebben een los CSS bestand zodat het compact en los van elkaar staat. De kaarten worden via een render template.

Om de css die ik wil aanroepen voor elk bestand zet ik een algemene class die alleen voorkomt bij die pagina. Dit zorgt ervoor dat de css alleen wordt aangeroepen als dit nodig is.

```css
/* Detail pagina */
.movieDetails {}
```

## Link

[Link naar project](tymonl.github.io/API-2425/)

[Link naar website](https://api-2425-rpyo.onrender.com/)
