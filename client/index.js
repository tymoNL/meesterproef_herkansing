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

const bloemList = document.querySelector('.bloem-lijst');
const bloemen = document.querySelectorAll('.bloem');
const totalFlowerImages = 5;  // Zet dit bovenaan in je bestand

// Voeg een bloem toe op willekeurige positie gebaseerd op geklikte afbeelding
function addSpecificBloem(imageSrc, altText) {
console.log('test');

  if (bloemList) {
    const randomLeft = Math.floor(Math.random() * 85) + 1;
    const randomWidth = Math.floor(Math.random() * 26) + 50;
    
    const bloemHTML = `
      <li style="position: absolute; left: ${randomLeft}%; width: ${randomWidth}px;">
        <img src="${imageSrc}" alt="${altText}" style="width: 100%" />
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

bloemen.forEach(bloem => {
  bloem.addEventListener('click', async () => {
    const imageSrc = bloem.getAttribute('src');
    const altText = bloem.getAttribute('alt');

    // Voeg bloem direct toe aan UI
    addSpecificBloem(imageSrc, altText);

    // Stuur ook POST-verzoek naar server
    try {
      const response = await fetch('/legbloem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageSrc }) // eventueel andere data meesturen
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const json = await response.json();
      console.log('Bloem succesvol gepost:', json);

    } catch (error) {
      console.error('Fout bij POST bloem:', error.message);
    }
  });
});

if (bloemList) {
  const aantalBloemen = window.numberOfRoses || 0;

  for (let i = 0; i < aantalBloemen; i++) {
    const bloem = getRandomBloem();
    addSpecificBloem(bloem.src, bloem.alt);
  }
}

function getRandomBloem() {
  const randomImageNum = Math.floor(Math.random() * totalFlowerImages) + 1;
  return {
    src: `/images/bloemen/${randomImageNum}.png`,
    alt: `bloem ${randomImageNum}`
  };
}


// familie slider

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".familySlider ul");
  const leftButton = document.querySelector(".familySlider__button--left");
  const rightButton = document.querySelector(".familySlider__button--right");

  const scrollAmount = 300; // Hoeveel pixels de slider moet scrollen per klik

  leftButton.addEventListener("click", () => {
    slider.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });

  rightButton.addEventListener("click", () => {
    slider.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });
});


  
// huisjes bewegeen bij scrollen

document.addEventListener("DOMContentLoaded", () => {
  const housjes = document.querySelectorAll(".housjesContainer img");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    housjes.forEach((huisje) => {
      const speed = huisje.getAttribute("data-speed");
      const translateY = -scrollPosition * speed * 0.1; // Gebruik een negatieve waarde voor naar boven bewegen
      huisje.style.transform = `translateY(${translateY}px)`;
      huisje.style.opacity = 1 - scrollPosition / 500; // Laat de huisjes uitfaden
    });
  });
});


// Timeline Scroll Section

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

  const straatSelect = document.getElementById('straatSelect');
  const muur = document.getElementById('muur');

  straatSelect.addEventListener('change', () => {
    const geselecteerdeStraat = straatSelect.value;
    muur.innerHTML = ''; // Leegmaken

    console.log('Geselecteerde straat:', geselecteerdeStraat);

    const gefilterdeVerhalen = allVerhalen.filter(item => item.verhaal.straat === geselecteerdeStraat);

    gefilterdeVerhalen.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h4>${item.verhaal.naam}</h4>
        <a href="/verhalen/${item.verhaal.id}">Bekijk verhaal</a>
      `;
      muur.appendChild(div);
    });

    if (gefilterdeVerhalen.length === 0) {
      muur.innerHTML = '<p>Geen verhalen gevonden voor deze straat.</p>';
    }
  });
