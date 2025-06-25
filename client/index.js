import './index.css';

/* Mobile header toggle */
const mobileMenuLink = document.querySelector('.mobileMenuLink');
if (mobileMenuLink) {
  mobileMenuLink.addEventListener("click", () => {
    document.querySelector('.mobileMenu').classList.toggle('active');
    const icon = mobileMenuLink.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });
}

/* People animatie */
const peopleList = document.querySelector('.people');
if (peopleList) {
  for (let i = 0; i < 933; i++) {
    const li = document.createElement('li');
    li.innerHTML = `<i class="fa-solid fa-users"></i>`;
    li.style.animationDelay = `${i / 4}s`;
    peopleList.appendChild(li);
  }
}

/* Bloemen functionaliteit */
const bloemList = document.querySelector('.bloem-lijst');
const bloemen = document.querySelectorAll('.bloem');
const straatSelect = document.querySelector('#straatSelect');
const muur = document.getElementById('muur');
window.bloemenVoorStraat = {}; // Init global storage

function addSpecificBloem(imageSrc, altText, left = null, width = null) {
  if (!bloemList) return;

  const randomLeft = left ?? Math.floor(Math.random() * 85) + 1;
  const randomWidth = width ?? Math.floor(Math.random() * 31) + 90;

  const bloemHTML = `
    <li style="position: absolute; left: ${randomLeft}%; width: ${randomWidth}px;">
      <img src="${imageSrc}" alt="${altText}" style="width: 100%" />
    </li>`;
  bloemList.insertAdjacentHTML('beforeend', bloemHTML);

  return { left: randomLeft, width: randomWidth };
}

bloemen.forEach(bloem => {
  bloem.addEventListener('click', async () => {
    const img = bloem.querySelector('img');
    const imageSrc = img.getAttribute('src');
    const altText = img.getAttribute('alt');
    const selectedStraat = straatSelect ? straatSelect.value.trim().toLowerCase() : null;

    if (!selectedStraat) {
      alert('Kies eerst een straat voordat je een bloem legt.');
      return;
    }

    const { left, width } = addSpecificBloem(imageSrc, altText); // UI direct tonen

    try {
      const response = await fetch('/legbloem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ straat: selectedStraat, image: imageSrc, alt: altText, left, width })
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const json = await response.json();
      console.log('Bloem succesvol gepost:', json);

      // Voeg toe aan local storage voor deze straat
      if (!window.bloemenVoorStraat[selectedStraat]) {
        window.bloemenVoorStraat[selectedStraat] = [];
      }
      window.bloemenVoorStraat[selectedStraat].push({ src: imageSrc, alt: altText, left, width });

    } catch (error) {
      console.error('Fout bij POST bloem:', error.message);
    }
  });
});

straatSelect?.addEventListener('change', async () => {
  const geselecteerdeStraat = straatSelect.value.trim().toLowerCase();
  muur.innerHTML = '';

  if (!geselecteerdeStraat) {
    muur.innerHTML = '<p>Kies een straat om verhalen te bekijken.</p>';
    return;
  }

  console.log(`Geselecteerde straat: ${geselecteerdeStraat}`);

  const gefilterdeVerhalen = allVerhalen.filter(item => item.verhaal.straat.toLowerCase() === geselecteerdeStraat);

  if (gefilterdeVerhalen.length === 0) {
    muur.innerHTML = '<p>Geen verhalen gevonden voor deze straat.</p>';
  } else {
    gefilterdeVerhalen.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('verhaal-kaart');
      div.innerHTML = `
        <div class="huisnummer-bord">${item.verhaal.huisnummer || 'Onbekend'}</div>
        <p class="verhaal-naam">${item.verhaal.naam}</p>
        <a href="/verhalen/${item.verhaal.id}">Bekijk dit verhaal</a>`;
      muur.appendChild(div);
    });
  }

  // 🌼 Haal bloemen op via API
  try {
    const response = await fetch(`/api/bloemen/${encodeURIComponent(geselecteerdeStraat)}`);
    const bloemen = await response.json();

    console.log('Bloemen voor straat:', geselecteerdeStraat, bloemen);

    window.bloemenVoorStraat[geselecteerdeStraat] = bloemen;
    showBloemenVoorStraat(geselecteerdeStraat);
  } catch (error) {
    console.error('Fout bij ophalen bloemen:', error);
    bloemList.innerHTML = '<p>Fout bij laden bloemen.</p>';
  }
});

function showBloemenVoorStraat(straat) {
  if (!bloemList || !window.bloemenVoorStraat) return;
  bloemList.innerHTML = '';
  const bloemen = window.bloemenVoorStraat[straat] || [];

  bloemen.forEach(bloem => {
    const li = document.createElement('li');
    li.style.position = 'absolute';
    li.style.left = bloem.left + '%';
    li.style.width = bloem.width + 'px';

    const img = document.createElement('img');
    img.src = bloem.src;
    img.alt = bloem.alt;
    img.style.width = '100%';

    li.appendChild(img);
    bloemList.appendChild(li);
  });
}

/* Familie slider */
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".familySlider ul");
  const leftButton = document.querySelector(".familySlider__button--left");
  const rightButton = document.querySelector(".familySlider__button--right");
  const scrollAmount = 300;

  if (leftButton) {
    leftButton.addEventListener("click", () => {
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  if (rightButton) {
    rightButton.addEventListener("click", () => {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
});

/* Huisjes scroll animatie */
document.addEventListener("DOMContentLoaded", () => {
  const housjes = document.querySelectorAll(".housjesContainer img");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    housjes.forEach((huisje) => {
      const speed = huisje.getAttribute("data-speed");
      const translateY = -scrollPosition * speed * 0.1;
      huisje.style.transform = `translateY(${translateY}px)`;
      huisje.style.opacity = 1 - scrollPosition / 500;
    });
  });
});

/* Timeline scroll */
const items = document.querySelectorAll(".timeline li");
const greyLine = document.querySelector(".default-line");
const lineToDraw = document.querySelector(".draw-line");

if (lineToDraw) {
  window.addEventListener("scroll", () => {
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
