import './index.css';

/* Mobile header logica */
var mobileMenuLink = document.querySelector('.mobileMenuLink');

if (mobileMenuLink) {
    mobileMenuLink.addEventListener("click", function () {
        document.querySelector('.mobileMenu').classList.toggle('active');

        var icon = this.querySelector('i');
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
var peopleList = document.querySelector('.people');
var peopleCount = 933;

if (peopleList) {
    for (let index = 0; index < peopleCount; index++) {
        // Create a new list item
        var listItem = document.createElement('li');
        listItem.innerHTML = `<i class="fa-solid fa-users"></i>`;

        var delay = index / 4;

        // Set the animation delay for each item
        listItem.style.animationDelay = `${delay}s`;

        // Append the item to the list
        peopleList.appendChild(listItem);
    }
}


let bloemButton = document.querySelector('#bloemButton');

if (bloemButton) {
    bloemButton.addEventListener('click', async function () {
        console.log("addBloem");

        postBloem();
    });
}

async function postBloem() {
    const url = "/legbloem";
    try {
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        let numberOfRoses = document.querySelector('#numberOfRoses');
        if (numberOfRoses) {
            numberOfRoses.innerHTML = json.numberOfRoses;
        }
    } catch (error) {
        console.error(error.message);
    }
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



