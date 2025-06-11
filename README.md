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

Na gesprek met Vasilis is duidelijker geworden hoe opdrachtgevers niet altijd zelf precies weten wat ze willen en waar je naar moet luisteren en kijken wat er realistisch is.

De data heb ik op kunnen halen via meerdere endpoints zodat we toegang hebben tot deze data in onze website. De website is opgezet met [Liquid](https://shopify.github.io/liquid/), voornamelijk omdat deze templating taal al gebruikt is met het vak API dus dit is een bekende template voor iedereen in de groep.

### Donna

In week 1 kregen wij uitleg over de opdracht en hoe dit in elkaar zou gaan zitten. We zijn begonnen met het proberen te uitpluizen van de opdracht. We hebben geprobeerd contact op t enemen met de opdrachtgever, wat vervolgens bleek dat wij een verkeerd email adres hadden dus hier in vast zaten. Gelukkig hadden we later deze week een afspraak met onze coach voor het project en gaf hij ook wat input. Ondertussen hebben we natuurlijk nagedacht over de vorm van het project, hoe we dit op willen zetten en wat belangrijke punten zijn voor ons. In principe hebben we nu nog de vrijheid omdat we vrij weinig informatie hebben en dus zelf kunnen invullen hoe we hier gebruik van maken. We doen onderzoek naar hoe de huidige situatie is voor de website en wat we hieruit kunnen halen. Ondertussen hebben we contact gekregen met Joost die ook betrokken is in het project en ons dus wel meer informatie geeft over wat de grote lijnen van het project zullen zijn.

We komen erachter dat het belangrijk is dat we de verhalen over de mensen op een mooie manier verteld gaan worden. We leven namelijk in een tijd waar veel mensen die de oorlog bewust hebben meegemaakt en overleefd beginnen uit te dunnen. Dus is het aan ons om de herinnering levend te houden. We komen op wat ideeën voor een design, we houden een soort gedenkmuur waar afbeeldingen of informatie wordt getoond van de overledene personen uit een bepaalde straat gaan komen. je kan als het ware door deze straten heen wandelen en als je dan op een adres klikt komt er meer informatie te zien.

### Lilian

In week 1 zijn we begonnen met ons verdiepen in de opdracht, we hebben gekeken naar welke data er beschikbaar was en hoe we deze woude gaan vormgeven. Het eerste idee was om een digitale gedenkmuur te maken waar slachtoffers het hele jaar door herdacht kunnen worden. 
We willen de gedenkmuur per straat maken en dan de posters erop laten zien van de gedeporteerde uit die straat. Daaronder komt ook nog een overzicht van die posters waar je op kan klikken en dan op een detail pagina komt. 
Ik heb afgelopen week gewerkt aan het design en hoe de website gaat werken. Op vrijdag hadden we een gesprek met Ineke, haar feedback over de gedenkmuur was enthousiast dus die houden we erin.

## Week 2

### Tymo

Nadat Lilian het ontwerp van de website concreet had, ben ik begonnen met het namaken van het ontwerp in **liquid**. De eerst gemaakte onderdelen waren de Header, footer. De gemaakte pagina's waren de homepage en over ons pagina.

Op de gedenkmuur pagina heb ik na het voortgangsgesprek met **Victor** een oplossing gevonden voor het opslaan van de bloemen op een gedenkmuur. Dit heb ik kunnen doen door een post request te maken naar een pagina en daar de *rozenaantal* aan te passen. Deze oplossing is niet 100% goed want als je de server opnieuw op zou starten (Wat vaak gebeurd) wordt dit getal weer naar 0 gezet. Dit is gedaan want we hebben geen toegang tot een database waar je deze data normaal op zou slaan.

Het meeste hiervan staat op een andere repository, deze is [hier](https://github.com/tymoNL/Meesterproef_liquid) gelinkt.

Ook heb ik na het 2e gesprek met **Declan** via `Npm` een **QR code generator** geimporteerd. Dit is omdat na het gesprek met de opdrachtgever duidelijk was dat dit een belangerijk onderdeel is zodat mensen makkelijk naar de website en detailpagina van een adress kunnen.

### Donna

In week 2 hebben we de eerste meeting gehad met de opdrachtgever die ons ook weer benadrukte dat het vooral om het vertellen van de verhalen gaat. We gaan dus beginnen met het opzetten van taken en beginnen met code schrijven. Ik neem de taak op mij om de gedenkmuur te gaan maken. Zo heb ik genoeg uitdaging op elk vlak, ik kan wat gebruik maken van html,css maar ook van javasccript. Dus hier ga ik beginnen met een opzet voor de pagina en bedenken welke techniek ik ga gebruiken om tot mijn doel te komen. Ik begin dus met heel grof secties te gaan maken voor de pagina als indeling.

Ik zet dus alle elementen neer die nodig zijn maar verder doe ik er nog niet veel aan omdat deze later gevuld gaan worden met elementen uit de database.

### Lilian



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

Vanaf hier ben ik begonnnen om vorm te geven aan de elementen die ik op de pagina had. Deze moesten gevuld worden met data die we hadden uit de database. Het idee is om per straat personen weer te geven op de gedenkmuur en vanuit hier kan je dan naar de detailpagina. Op de gedenkmuur kan je uitkiezen van welke straat je gegevens wil zien. Deze straatnamen ga ik inladen vanuit de json die wij hebben. Ik vraag om elke id van straatnamen in te laden in de select. Vervolgens komen er dan allemaal straatnamen. Hierna heb ik dan nog aangegeven dat ik geen dubbele straatnamen wil om het makkelijiker te maken. Zo kan je nu dus de id zien van de personen die op deze straat hebben gewoond vroeger.

```js
  fetchData(addressURL).then(adressen => {
    alleAdressen = adressen;
    const uniekeStraten = getUniekeStraten(adressen);
    straatSelect.innerHTML = '<option value="">Kies een straat...</option>';

    uniekeStraten.forEach(straat => {
      const option = document.createElement('option');
      option.value = straat;
      option.textContent = straat;
      straatSelect.appendChild(option);
    });
  });
```


Vervolgens willen we onderaan de pagina ook een aantal families weergeven zodat je meteen naar een familie kan vanuit hun naam zonder de straat aan te geven. Dit heb ik op een zelfde soort manier gedaan.

### Lilian

Hier docs over week 3

## Week 4

### Tymo

De select voor de straten heb ik aangepast zodat de data via liquid wordt ingeladen. Dit zorgt ervoor dat alle straten die in de verhalen zitten ook worden ingeladen.

De straten worden meegestuurd naar de pagina via de server om te zorgen dat door alle straten heen geloopt kan worden.

```js
return res.send(renderTemplate('server/views/gedenk-posters.liquid', {
    title: 'Gedenk-posters',
    items: testData,
    straten,
    families,
    filteredItems,
    selectedStraat,
    numberOfRoses
  }));
```

```html
<select id="straatSelect">
    <option value="">Kies een straat:</option>
    {% for straat in straten %}
    <option value="{{ straat }}">{{ straat }}</option>
    {% endfor %}
  </select>
```

De straten kunnen worden geselecteerd en dan verschijnen alle verhalen op deze straten. Via deze manier kan je door op een digitale manier door de straat heen lopen.

Na gesprek met Syd was duidelijk geworden dat we nog aan de styling vooral moesten werken en dat de funcionaliteiten van de website klopten. De punten die boven kwamen waren de huisstyle, kiezen welke scrollrichting we kiezen en vormgeving van de gedenkmuur zelf.

Deze week was ook CSS day waar ik aan heb deelgenomen. Hierom kon ik wat minder werkzaamheden verrichten deze week.

### Donna

Hier docs over week 4

### Lilian

Hier docs over week 4
