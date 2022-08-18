VANTA.NET({
  el: "#hero--div",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0xf7af0a,
  backgroundColor: 0x1e283e,
  points: 8.00,
  maxDistance: 19.00
})

// Remove the page loader
loader = document.getElementById("loader");
FADEOUT_TIMER = 500; //500
LOAD_TIMER = 1500; //1500

window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.remove("preload");
    removeFadeOut(document.getElementById('loader'), FADEOUT_TIMER);
  }, LOAD_TIMER);
});

function removeFadeOut( el, speed ) {
  var seconds = speed/1000;
  el.style.transition = "opacity "+seconds+"s ease";

  el.style.opacity = 0;
  setTimeout(function() {
      el.parentNode.removeChild(el);
  }, speed);
}

// handle animations that react to scrolling

function reveal() {
    let reveals = document.querySelectorAll('.reveal');
   
    for (let i = 0; i < reveals.length; i++) {

        let windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = -200;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

reveal();
window.addEventListener('scroll', reveal);

function forceAboutToShow() {
  const aboutSection = document.getElementById("about-section");
  aboutSection.classList.add('active');
}

forceAboutToShow();

function applySlideLeft() {
  const copiedTooltip = document.getElementById("copied-tooltip");
  copiedTooltip.classList.add("slide-left");
  setTimeout(() => {
    copiedTooltip.classList.remove("slide-left");
  }, 1000)
}

let clipboard = new ClipboardJS('#email-text');

clipboard.on('success', function (e) {
  applySlideLeft();
});

// Project button styling

let webSelected = false;
let businessSelected = false;
let mobileSelected = false;

function styleButtons(buttonName) {
  const webButton = document.getElementById("web-projects");
  webButton.classList.remove("button-selected");
  const businessButton = document.getElementById("business-projects");
  businessButton.classList.remove("button-selected");
  const mobileButton = document.getElementById("mobile-projects");
  mobileButton.classList.remove("button-selected");
  if (buttonName == "web") {
    if (!webSelected) {
      webButton.classList.add("button-selected");
      webSelected = true;
      mobileSelected = false;
      businessSelected = false;
    } else {
      webSelected = false;
      mobileSelected = false;
      businessSelected = false;
    }
  }
  if (buttonName == "mobile") {
    if (!mobileSelected) {
      mobileButton.classList.add("button-selected");
      webSelected = false;
      mobileSelected = true;
      businessSelected = false;
    } else {
      webSelected = false;
      mobileSelected = false;
      businessSelected = false;
    }
  }
  if (buttonName == "business") {
    if (!businessSelected) {
      businessButton.classList.add("button-selected");
      webSelected = false;
      mobileSelected = false;
      businessSelected = true;
    } else {
      webSelected = false;
      mobileSelected = false;
      businessSelected = false;
    }
  }
  if (webSelected || mobileSelected || businessSelected) {
    stickyButton.style.display = "block";
  } else {
    stickyButton.style.display = "none";
  }
}

// handle the sticky button to close projects

const bodyElement = document.getElementById("body");
const stickyButton = document.createElement("button");
stickyButton.innerHTML = "return to top";
stickyButton.classList.add("--sticky-button");
stickyButton.addEventListener("click", () => {
  document.getElementById("projects-section").scrollIntoView()
}); 
bodyElement.append(stickyButton);

// Show navbar on scroll
nav = document.getElementById("nav");
limitYNav = 250;
limitYProjects = 950;

function detectScroll() {
  //console.log(window.pageYOffset);
  if (window.pageYOffset < limitYNav) {
    nav.classList.add("navbar-hidden"); 
    nav.classList.remove("navbar-show");
    //console.log("show navbar");
  } else {
    nav.classList.remove("navbar-hidden");
    nav.classList.add("navbar-show");
    //console.log("hide navbar");
  }

  if (window.pageYOffset < limitYProjects) {
    stickyButton.style.display = "none";
  } 

  let projectsActive = false;
  if (webSelected || mobileSelected || businessSelected) {
    projectsActive = true;
  } else {
    projectsActive = false;
  }

  if (window.pageYOffset >= limitYProjects && projectsActive) {
    stickyButton.style.display = "block";
  } 
}

detectScroll();
window.addEventListener("scroll", detectScroll)
