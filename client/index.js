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


