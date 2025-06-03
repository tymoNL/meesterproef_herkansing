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
