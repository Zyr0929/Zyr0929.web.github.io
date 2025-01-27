const burgerMenu = document.getElementById('burger-menu');
const mobileNav = document.getElementById('mobile-nav');
const navbar = document.getElementById('navbar');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

// burger ka sakin
burgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    burgerMenu.classList.toggle('active'); 
});


// hide the mobile menu if clicked outside
document.addEventListener('click', (event) => {
    if (!mobileNav.contains(event.target) && !burgerMenu.contains(event.target)) {
        mobileNav.classList.remove('active');
    }
});

// close the mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});


// onscroll change opact and round bottom corners
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { 
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});



// smooth scrolling for clicking the ano nav bar links
const links = document.querySelectorAll('.nav-links a, .mobile-nav a');
links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//carousel func start
const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.getElementById('carousel-prev');
const nextButton = document.getElementById('carousel-next');

let currentIndex = 0; 
const numItems = items.length;


function positionItems() {
    items.forEach((item, index) => {
        const angle = ((index - currentIndex + numItems) % numItems) * (360 / numItems);
        item.style.transform = `rotateY(${angle}deg) translateZ(300px)`;
        item.classList.remove('active');
    });

    items[currentIndex].classList.add('active');
}

function rotateCarousel(direction) {
    currentIndex = (currentIndex + (direction === 'next' ? 1 : -1) + numItems) % numItems;
    positionItems();
}


function startAutoScroll() {
    return setInterval(() => {
        rotateCarousel('next');
    }, 3000); // Change product every 3 seconds
}


prevButton.addEventListener('click', () => {
    rotateCarousel('prev');
    clearInterval(autoScroll); 
    autoScroll = startAutoScroll();
});

nextButton.addEventListener('click', () => {
    rotateCarousel('next');
    clearInterval(autoScroll);
    autoScroll = startAutoScroll();
});

positionItems();
let autoScroll = startAutoScroll(); 

//for the search functionality to chat
var TRange = null;

function findString(str) {
    if (parseInt(navigator.appVersion) < 4) return;
    var strFound;

    if (window.find) {
        strFound = self.find(str);
        if (strFound && self.getSelection && !self.getSelection().anchorNode) {
            strFound = self.find(str);
        }
        if (!strFound) {
            strFound = self.find(str, 0, 1);
            while (self.find(str, 0, 1)) continue;
        }
    } else if (navigator.appName.indexOf("Microsoft") != -1) {
        if (TRange != null) {
            TRange.collapse(false);
            strFound = TRange.findText(str);
            if (strFound) TRange.select();
        }
        if (TRange == null || strFound == 0) {
            TRange = self.document.body.createTextRange();
            strFound = TRange.findText(str);
            if (strFound) TRange.select();
        }
    } else if (navigator.appName == "Opera") {
        alert("Opera browsers are not supported.");
        return;
    }
    if (!strFound) alert("String '" + str + "' not found!");
    return;
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-btn");

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            findString(query); 
        } else {
            alert("Please enter a search term.");
        }
    });

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            searchButton.click(); 
        }
    });
});
