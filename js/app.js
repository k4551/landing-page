/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
*/


/**
 * Define Global Variables
 * 
*/
const navbar = document.querySelector('#navbar__list');
const toggler = document.querySelector('.navbar__menu-icon');
const sections= document.querySelectorAll('.landing__section');


/**
 * End Global Variables
 * Begin Help function
 * 
*/

// heighlight a link as active 
function heighlight(link){
    // deactiavte previous heihlighted link if existed
    const prev = document.querySelector('.menu__link--active');
    if(prev)
        prev.classList.remove('menu__link--active');
    // activate the current 
    link.classList.add('menu__link--active');
}

/**
 * End Help function
 * Begin Main Functions
 * 
*/

// build the nav
sections.forEach(section => {
    // create html element for a menu item
    const newItem = document.createElement('li');
    // grab menu item title and link from the section attributes
    newItem.textContent = section.dataset.nav;
    // add link style for new link
    newItem.classList.add('menu__link');
    // append to DOM new elements
    navbar.appendChild(newItem);
});


// get section near to top of viewport
function getNearTop(){
    const near= Object.values(sections).filter(section => {
        return section.getBoundingClientRect().y +  section.getBoundingClientRect().height/2 > 0;
    });
    return near[0];
}


// collapse the navbar when clicked and toggle when clicked again
toggler.addEventListener('click', function(){
    if(navbar.classList.contains('navbar__list--collapsed'))
        navbar.classList.remove('navbar__list--collapsed');
    else 
        navbar.classList.add('navbar__list--collapsed');
});


// add event for each link when clicked to be heighlighted and scroll to a given section
const links = document.querySelectorAll('.menu__link');
links.forEach(link => link.addEventListener('click', function(event){
    const targetSection = Object.values(sections).filter(section => section.dataset.nav == this.textContent)[0];
    targetSection.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    heighlight(this);
    event.preventDefault();
}));


// Add class 'active' to section when near top of viewport
function updateActiveSection(){
    const previous = document.querySelector('.landing__section--active');
    previous.classList.remove('landing__section--active');
    const current  = getNearTop();
    current.classList.add('landing__section--active');
    // while scrolling activate the correspending link in the navbar 
    const targetLink = Object.values(links).filter(link => current.dataset.nav == link.textContent)[0];
    heighlight(targetLink);

}


// Set sections as active
document.addEventListener('scroll', updateActiveSection);