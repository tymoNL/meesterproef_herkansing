# Meesterproef

[Link naar DLO](https://dlo.mijnhva.nl/d2l/le/content/609470/Home)

Leden:

- **Donna**
- **Lilian**
- **Tymo**

Datum: *2025/05/12 - 2025/06-16*

## Uitleg

Een project voor het digitaal ontsluiten van gedenkposters met verhalen over slachtoffers van de Tweede Wereldoorlog.

Het gaat over het vertellen van de verhalen. Hoe doe je dat met de webtechnieken die jullie kennen?

### Bronnen

- De website nu: [https://atlas4045.agency.fdnd.nl/](https://atlas4045.agency.fdnd.nl/)
- De repo: [https://github.com/fdnd-agency/atlas4045](https://github.com/fdnd-agency/atlas4045)

### Contactgegevens

- [jaap.van.woudenberg@gmail.com](mailto:jaap.van.woudenberg@gmail.com])
- [m.j.gunsing@hva.nl](mailto:m.j.gunsing@hva.nl)
- [j.faber@hva.nl](mailto:j.faber@hva.nl)

## De meeting met de opdrachtgever

Locatie: Nader in te vullen

Datum: *2025/05/13*

Aanwezigen:

- **Donna**
- **Tymo**
- **Lilian**

### Gestelde vragen

- Waarom willen jullie dat wij deze opdracht gaan uitvoeren?
- Wat is de gedachte erachter, wat willen we hiermee bereiken? Welke boodschap moet er overgebracht worden naar bezoekers?
- Wat moet de inhoud zijn?
- Is er een huisstijl?
- Is er een moodboard voor hoe het eruit moet komen te zien?
- Wat zijn de belangrijkste functies die er in moeten komen? Wat zijn onderdelen die er nu inzitten, die het goed doen en erin moeten - blijven?
- Wat zijn precies de wensen, wat moeten we gaan ontwerpen?
- Wat is de primaire doelgroep van de website?
- Wat willen jullie dat bezoekers doen/bereiken op de website?
- Zijn er specifieke problemen met de huidige website?
- Hoe wordt de website nu beheerd?
- Moet de site ook op mobiel goed werken? Responsive?
- Wat is voor jullie een fijne manier om te communiceren ?
- Hoe vaak willen jullie verder updates ontvangen over het proces, naast de feedbackmomenten? Of juist niet?

## De opdracht

### Iteratie 1

### Iteratie 2

### Iteratie 3

### Iteratie 4

## Product biografie

## Week 1

Om duidelijk te krijgen wat de opdracht is zijn we als groep eerst naar Declan gegaan om uitleg te krijgen over hoe we het best de opdracht die we krijgen, aan te pakken.
Hier hebben we duidelijkheden en voorbeelden gekregen over hoe hij de data en verwerking hiervan zou aanpakken.

We hebben als groep onze sterke en zwakke punten opgeschreven en de leerdoelen zodat we hier aan kunnen werken terwijl we met de opdracht bezig zijn.

### Tymo

In deze week heb ik gekeken wat voor data er is in [Directus](https://directus.io/) (hier is de data opgeslagen). En ik heb gekeken wat we als groep hiermee konden om de website te vullen met content.

De data heb ik op kunnen halen via meerdere endpoints zodat we toegang hebben tot deze data in onze website. De website is opgezet met [Liquid](https://shopify.github.io/liquid/), voornamelijk omdat deze templating taal al gebruikt is met het vak API dus dit is een bekende template voor iedereen in de groep.

### Donna

Hier docs over week 1

### Lilian

Hier docs over week 1

## Week 2

### Tymo

Nadat Lilian het ontwerp van de website concreet had, ben ik begonnen met het namaken van het ontwerp in **liquid**. De eerst gemaakte onderdelen waren de Header, footer. De gemaakte pagina's waren de homepage en over ons pagina.

Op de gedenkmuur pagina heb ik na het voortgangsgesprek met **Victor** een oplossing gevonden voor het opslaan van de bloemen op een gedenkmuur. Dit heb ik kunnen doen door een post request te maken naar een pagina en daar de *rozenaantal* aan te passen. Deze oplossing is niet 100% goed want als je de server opnieuw op zou starten (Wat vaak gebeurd) wordt dit getal weer naar 0 gezet. Dit is gedaan want we hebben geen toegang tot een database waar je deze data normaal op zou slaan.

Het meeste hiervan staat op een andere repository, deze is [hier](https://github.com/tymoNL/Meesterproef_liquid) gelinkt.

Ook heb ik na het 2e gesprek met **Declan** via `Npm` een **QR code generator** geimporteerd. Dit is omdat na het gesprek met de opdrachtgever duidelijk was dat dit een belangerijk onderdeel is zodat mensen makkelijk naar de website en detailpagina van een adress kunnen.

### Donna

Hier docs over week 2

### Lilian

Hier docs over week 2

## Week 3

### Tymo

In deze week heb ik na gesprek met **Victor** een `Json` bestand gemaakt met de data uit een verhaal van het boek die is aangeleverd.
Dit is gedaan zodat als de data uit het boek in een volledig Json bestand is gezet, kan de data er direct uitgehaald worden. Ook raadde Victor af om hardcoded content te maken.

#### Een stuk van het Json bestand

```json
"verhalen": [
            {
                "titel": "Jacob Philips",
                "datum": "8 april 1911 - 4 september 1941",
                "locatie": "Amsterdam",
                "afbeelding": "/images/details/foto_man.png",
                "tekst": "Jacob Philips (foto rechts en trouwfoto hieronder), los werkman, spiegelmaker, marktkoopman en expeditieknecht, Amsterdam, 8 april 1911, Hartheim, 4 september 1941. Jacob was een zoon van los arbeider Nathan Philips en Heintje Philips-Krant, die beiden door de nationaalsocialisten om het leven werden gebracht. Jacob, die uit een groot gezin kwam, groeide op in de oude Jodenbuurt en werd in 1930 goedgekeurd voor militaire dienst. Hij kwam bij de infanterie terecht. In 1939 trouwde Jacob met kantinebeheerster Elisabeth (Bep) van der Haas, van niet-Joodse afkomst. Het stel ging direct na hun huwelijk op dit adres wonen."
            }
            ]
```

De content uit dit verhaal heb ik verwerkt in liquid om meerdere objecten uit Json dynamisch in te laden.

```html
    <div>
        {% for tekst in item.verhalen %}
        <article class="stop" tabindex="0">
            <div class="text">
                <header>
                    <h2>{{ tekst.titel }}</h2>
                    <time>{{ tekst.date }}</time>
                </header>
                <p>{{ tekst.tekst }}</p>
                <img src="{{ tekst.afbeelding }}" alt="{{ tekst.titel }}" />
            </div>
        </article>
        {% endfor %}
    </div>
```

### Donna

Hier docs over week 3

### Lilian

Hier docs over week 3

## Week 4

### Tymo

Hier docs over week 4

### Donna

Hier docs over week 4

### Lilian

Hier docs over week 4