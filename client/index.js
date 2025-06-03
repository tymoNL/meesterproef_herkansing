import './index.css';

/* Mobile header logica */
const mobileMenuLink = document.querySelector('.mobileMenuLink');

if (mobileMenuLink) {
  mobileMenuLink.addEventListener("click", function () {
    document.querySelector('.mobileMenu').classList.toggle('active');

    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });
}

/* Homepage mensen animatie */
const peopleList = document.querySelector('.people');
const peopleCount = 933;

if (peopleList) {
  for (let i = 0; i < peopleCount; i++) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<i class="fa-solid fa-users"></i>`;
    listItem.style.animationDelay = `${i / 4}s`;
    peopleList.appendChild(listItem);
  }
}

/* Bloemen functionaliteit */
const bloemList = document.querySelector('.bloemenLijst');
const bloemButton = document.querySelector('#bloemButton');
const totalFlowerImages = 5; // aantal verschillende bloem-afbeeldingen

// Voeg 1 bloem toe met willekeurige positie en afbeelding
function addOneBloem() {
  if (bloemList) {
    const randomLeft = Math.floor(Math.random() * 90) + 1;
    const randomImage = Math.floor(Math.random() * totalFlowerImages) + 1;

    const bloemHTML = `
      <li style="position: absolute; left: ${randomLeft}%;">
        <img src="/images/gedenkmuur/bloemen/${randomImage}.png" alt="bloem ${randomImage}" />
      </li>`;

    bloemList.insertAdjacentHTML('beforeend', bloemHTML);
  }
}

// POST-verzoek om bloem toe te voegen op de server en in de UI
async function postBloem() {
  const url = "/legbloem";

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const json = await response.json();

    // Voeg bloem toe in UI
    addOneBloem();

  } catch (error) {
    console.error(error.message);
  }
}

// Klik op de knop voegt een bloem toe
if (bloemButton) {
  bloemButton.addEventListener('click', () => {
    postBloem();
  });
}

// Bij laden van de pagina: toon bestaande bloemen
if (bloemList) {
  // Deze variabele moet door de server worden meegegeven via een script tag
  const aantalBloemen = window.numberOfRoses || 0;

  for (let i = 0; i < aantalBloemen; i++) {
    addOneBloem();
  }
}

// Timeline Scroll Section
// --------------------------------------------------------------
const items = document.querySelectorAll(".timeline li");
const timeline = document.querySelector(".timeline ul");
const greyLine = document.querySelector(".default-line");
const lineToDraw = document.querySelector(".draw-line");

if (lineToDraw) {
  window.addEventListener("scroll", () => {
    const redLineHeight = lineToDraw.offsetHeight;
    const greyLineHeight = greyLine.offsetHeight;
    const windowDistance = window.scrollY;
    const windowHeight = window.innerHeight / 2;
    const timelineDistance = document.querySelector(".timeline").offsetTop;

    if (windowDistance >= timelineDistance - windowHeight) {
      let line = windowDistance - timelineDistance + windowHeight;

      if (line <= greyLineHeight) {
        lineToDraw.style.height = `${line + 20}px`;
      }
    }

    const bottom = lineToDraw.getBoundingClientRect().top + window.scrollY + lineToDraw.offsetHeight;

    items.forEach((item) => {
      const circleTop = item.getBoundingClientRect().top + window.scrollY;

      if (bottom > circleTop) {
        item.classList.add("in-view");
      } else {
        item.classList.remove("in-view");
      }
    });
  });
}


// vanaf hier is de code voor de gedenkmuur

document.addEventListener('DOMContentLoaded', () => {
  const addressURL = 'https://fdnd-agency.directus.app/items/atlas_address?';
  const familieURL = 'https://fdnd-agency.directus.app/items/atlas_family?';

  const straatSelect = document.getElementById('straatSelect');
  const muur = document.getElementById('muur');
  const familieContainer = document.getElementById('familieLijst');

  let alleAdressen = [];

  // 🌐 Algemene fetch helper
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Fout bij ophalen data:', error);
      return [];
    }
  }

  // 🏠 Adressen ophalen en dropdown vullen
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

  // 👨‍👩‍👧‍👦 Families ophalen en tonen
  fetchData(familieURL).then(families => {
    if (families.length === 0) {
      familieContainer.innerHTML = '<p>Geen families gevonden.</p>';
      const maxAantal = 4;
      const familiesToon = data.data.slice(0, maxAantal);
      return;
    }

    familieContainer.innerHTML = '';
    
    families.forEach(fam => {
      const naam = fam.family_name || 'Onbekende familie';
      const beschrijving = fam.description || '';

      const div = document.createElement('div');
      div.classList.add('familie-info');
      div.innerHTML = `
        <h4>Fam. ${naam}</h4>
        <p>${beschrijving}</p>
        <a href="familie-detail.html?id=${fam.id}">Meer informatie</a>
      `;
      familieContainer.appendChild(div);
    });
  });

  // 🧭 Straatselectie → toon bijbehorende adressen
  straatSelect.addEventListener('change', (event) => {
    const gekozenStraat = event.target.value;
    const adressenInStraat = alleAdressen.filter(addr =>
      addr.street && addr.street.trim().toLowerCase() === gekozenStraat.trim().toLowerCase()
    );

    if (adressenInStraat.length === 0) {
      muur.innerHTML = '<p>Geen adressen gevonden voor deze straat.</p>';
      return;
    }

    muur.innerHTML = '';
    adressenInStraat.forEach(addr => {
      const huisnummer = ('house_number' in addr && addr.house_number !== null)
        ? addr.house_number
        : '(geen nummer)';

      const div = document.createElement('div');
      div.classList.add('adres-kaart');
      div.innerHTML = `
        <h4>${addr.street} ${huisnummer}</h4>
        <p>Adres-ID: ${addr.id}</p>
        <a href="detail.html?id=${addr.id}" class="detail-link">Bekijk meer</a>
      `;
      muur.appendChild(div);
    });
  });

  // 🔁 Unieke straten verzamelen
  function getUniekeStraten(adressen) {
    const stratenSet = new Set();
    adressen.forEach(addr => {
      if (addr.street) {
        stratenSet.add(addr.street.trim());
      }
    });
    return Array.from(stratenSet).sort();
  }
});



fetch('https://fdnd-agency.directus.app/items/atlas_family?fields=id,family_name,description')
  .then(res => res.json())
  .then(data => {
    console.log('DEBUG: ruwe data', data);

    const container = document.getElementById('familieLijst');
    if (!container) {
      console.error('⚠️ container #familieLijst niet gevonden');
      return;
    }

    if (data && data.data && data.data.length > 0) {
      container.innerHTML = '';
      data.data.forEach(fam => {
        const naam = fam.family_name || 'Naam onbekend';
        const beschrijving = fam.description || '';

        const div = document.createElement('div');
        div.classList.add('familie-info');
        div.innerHTML = `
          <h4>Fam. ${naam}</h4>
          <p>${beschrijving}</p>
          <a href="familie-detail.html?id=${fam.id}">Meer informatie</a>
        `;
        container.appendChild(div);
      });
    } else {
      container.innerHTML = '<p>Geen families gevonden.</p>';
    }
  })
  .catch(error => {
    console.error('❌ Fout bij ophalen families:', error);
  });

