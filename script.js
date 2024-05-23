// Your JavaScript code goes here
'use strict';

function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add('stagger-active');
      } else {
        entry.target.classList.remove('stagger-active');
      }
    });
  }
  
  // Create an IntersectionObserver instance
  const observer_stagger = new IntersectionObserver(handleIntersection);
  
  // Select all elements with class 'stagger'
  const staggerElements = document.querySelectorAll('.stagger');
  
  // Observe each stagger element
  staggerElements.forEach((el) => {
    observer_stagger.observe(el);
  });

// Decade Buttons
document.addEventListener('DOMContentLoaded', function() {
  function activateDecade(decade) {
      var buttons = document.querySelectorAll('.button-decade');
      buttons.forEach(function(button) {
          button.classList.remove('active');
      });

      decade.classList.add('active');

      var teamContents = document.querySelectorAll('.team-content > div');
      teamContents.forEach(function(content) {
          content.style.display = 'none';
      });

      // Active the target decade
      var targetContent = document.querySelector('.teams-' + decade.textContent);
      targetContent.style.display = 'block';

      // Set height of Team Section
      var activeSlide = targetContent.querySelector("[data-active]")
      var carouselContainerHeight = activeSlide.querySelector('.row').offsetHeight;
      var parentCarousel = activeSlide.closest('.big-carousel');
      parentCarousel.style = `height: ${carouselContainerHeight}px !important`;

      // Activate the SVGs of the decade, so that different svgs dont interfere with each other
      var activeContainer = targetContent.querySelectorAll('.team-nav-container');

      activeContainer.forEach((navbar) => {
          var activeSVG = navbar.querySelector('svg');
          activeSVG.classList.add('show-nav');

          // Get Index of the year in current decade
          var slides = targetContent
          .querySelector("[data-carousel]")
          .querySelector("[data-slides]");

          var activeSlide = slides.querySelector("[data-active]")
          let currentIndex = [...slides.children].indexOf(activeSlide);
          
          var activeId = 'active' + currentIndex;
          var activeIdMobile = 'mobile' + currentIndex;

          // Delete all active classes form navbar and only add for the active Index
          var activeYearsMobile = activeSVG.querySelectorAll('.active-mobile');
          if (activeYearsMobile !== null) {
            activeYearsMobile.forEach((year) => {
                year.classList.remove('active-mobile');
                navbar.querySelector('#' + activeIdMobile).classList.add('active-mobile');
            });
          }

          var activeYears = activeSVG.querySelectorAll('.active');
          if (activeYears !== null) {
            activeYears.forEach((year) => {
                year.classList.remove('active');
                navbar.querySelector('#' + activeId).classList.add('active');
            });
          }
      });
  }

  function handleClick(button) {
      button.addEventListener('click', function() {
          activateDecade(button);
      });
  }

  var buttons = document.querySelectorAll('.button-decade');
  buttons.forEach(function(button) {
      handleClick(button);
  });

  // Activate 2020s initially
  const buttonsContainer = document.querySelector('.buttons')
  activateDecade(buttonsContainer.querySelector('.active'));
});


// Team Carousel
const buttons = document.querySelectorAll("[data-carousel-button]")
const activeArray = Array.from({ length: 7 }, (_, index) => `active${index}`);
const activeArrayMobile = Array.from({ length: 7 }, (_, index) => `mobile${index}`);
const arrowGroups = document.querySelectorAll(`.arrow-group`);

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0
    // Ensure newIndex stays within the bounds of the activeArray
    newIndex = Math.max(0, Math.min(newIndex, activeArray.length - 1));

    // Add the 'active' class to the respective id based on the newIndex
    const activateSVG = document.querySelectorAll('.show-nav');
    const activeId = activeArray[newIndex];
    const activeIdMobile = activeArrayMobile[newIndex];

    activateSVG.forEach((svg) => {
      var possibleActiveId = svg.getElementById(activeId)
      if (possibleActiveId !== null) {
        possibleActiveId.classList.add('active');
      }
      var possibleActiveIdMobile = svg.getElementById(activeIdMobile)
      if (possibleActiveIdMobile !== null) {
        possibleActiveIdMobile.classList.add('active-mobile');
      }
    });
    
    // Remove 'active' class from the previously active slide
    if (activeSlide) {
      const previouslyActiveId = activeArray[[...slides.children].indexOf(activeSlide)];
      const previouslyActiveIdMobile = activeArrayMobile[[...slides.children].indexOf(activeSlide)];

      activateSVG.forEach((svg) => {
        
        var prevActiveID = svg.getElementById(previouslyActiveId)
        if (prevActiveID !== null) {
          prevActiveID.classList.remove('active');
        }
        var prevActiveIDMobile = svg.getElementById(previouslyActiveIdMobile)
        if (prevActiveIDMobile !== null) {
          prevActiveIDMobile.classList.remove('active-mobile');
        }
      });
    }

    // Adapt the height of the Carousel to the height of the active slide
    const currSlide = slides.children[newIndex];
    const carouselContainerHeight = currSlide.querySelector('.row').offsetHeight;
    const parentCarousel = currSlide.closest('.big-carousel');
    parentCarousel.style = `height: ${carouselContainerHeight}px`;

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})

// Add event listeners to each arrow group
arrowGroups.forEach((arrowGroup, arrowIndex) => {
    arrowGroup.addEventListener('click', () => {
      let parentContainer = arrowGroup.closest('.decade-wrapper');
      let slides = parentContainer
        .querySelector("[data-carousel]")
        .querySelector("[data-slides]")
      let activeSlide = slides.querySelector("[data-active]")

      // Convert Arrow index to Slide index
      if (arrowIndex > 8) {
        var slideIndex = arrowIndex - 9; // 9 is the number of Teams in the first two deacades
      } else if (arrowIndex > 1){
        var slideIndex = arrowIndex -2; // 2 is the number of Teams in the first decade
      } else {
        var slideIndex = arrowIndex
      }

      // Add the 'active' class to the respective id based on the newIndex
      const activateSVG = document.querySelectorAll('.show-nav');
      const activeId = activeArray[slideIndex];
      const activeIdMobile = activeArrayMobile[slideIndex];
      
      // Remove 'active' class from the previously active slide
      if (activeSlide) {
        const previouslyActiveId = activeArray[[...slides.children].indexOf(activeSlide)];
        const previouslyActiveIdMobile = activeArrayMobile[[...slides.children].indexOf(activeSlide)];

        activateSVG.forEach((svg) => {
          
          var prevActiveID = svg.getElementById(previouslyActiveId)
          if (prevActiveID !== null) {
            prevActiveID.classList.remove('active');
          }
          var prevActiveIDMobile = svg.getElementById(previouslyActiveIdMobile)
          if (prevActiveIDMobile !== null) {
            prevActiveIDMobile.classList.remove('active-mobile');
          }
        });
      }

      activateSVG.forEach((svg) => {
        var possibleActiveId = svg.getElementById(activeId)
        if (possibleActiveId !== null) {
          possibleActiveId.classList.add('active');
        }
        var possibleActiveIdMobile = svg.getElementById(activeIdMobile)
        if (possibleActiveIdMobile !== null) {
          possibleActiveIdMobile.classList.add('active-mobile');
        }
      });
      

      // Adapt the height of the Carousel to the height of the active slide
      const currSlide = slides.children[slideIndex];
      const carouselContainerHeight = currSlide.querySelector('.row').offsetHeight;
      const parentCarousel = currSlide.closest('.big-carousel');
      parentCarousel.style = `height: ${carouselContainerHeight}px`;

      delete activeSlide.dataset.active
      slides.children[slideIndex].dataset.active = true
    }); 
});

// Sponsor Carousel
for (const x of Array(12).keys()) {
  const wrapper = document.querySelector(".wrapper" + x);
  const carousel = document.querySelector(".carousel" + x);
  const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  const carouselChildrens = [...carousel.children];
  let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

  carouselChildrens.slice(0, cardPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");

  const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");

      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
  }
  const dragging = (e) => {
      if(!isDragging) return;

      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  }
  const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
  }
  const infiniteScroll = () => {

      if(carousel.scrollLeft === 0) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
          carousel.classList.remove("no-transition");
      }

      else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.offsetWidth;
          carousel.classList.remove("no-transition");
      }

      clearTimeout(timeoutId);
      if(!wrapper.matches(":hover")) autoPlay();
  }
  const autoPlay = () => {
      if(window.innerWidth < 800 || !isAutoPlay) return;
      
      timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
  }
  autoPlay();
  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);
}

// Road to success animation
// Function to check if SVG intersects with the screen
function isIntersecting(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top <= window.innerHeight &&
      rect.bottom >= 0 &&
      rect.left <= window.innerWidth &&
      rect.right >= 0
  );
}
// Function to remove active class from specified elements
function removeActiveClass() {
  const svg = document.querySelector('.innovation-section svg');
  const flag = svg.getElementById('flag');
  const igembrick = svg.getElementById('igembrick');
  const medalFlat = svg.getElementById('medal-flat');
  const specialPrize = svg.getElementById('special-prize');

  flag.classList.remove('active');
  igembrick.classList.remove('active');
  medalFlat.classList.remove('active');
  specialPrize.classList.remove('active');
}

// Function to add active class to specified elements with a delay
function addActiveClassWithDelay() {
  const svg = document.querySelector('.innovation-section svg');
  const flag = svg.getElementById('flag');
  const igembrick = svg.getElementById('igembrick');
  const medalFlat = svg.getElementById('medal-flat');
  const specialPrize = svg.getElementById('special-prize');

  if (isIntersecting(svg)) {
    setTimeout(() => {
      medalFlat.classList.add('active');
    }, 0);
    setTimeout(() => {
      specialPrize.classList.add('active');
    }, 1000);
    setTimeout(() => {
      igembrick.classList.add('active');
    }, 2000); 
    setTimeout(() => {
      flag.classList.add('active');
    }, 3000);
  } else {
      removeActiveClass();
  }
}

// Call the addActiveClassWithDelay function when the page loads and when it scrolls
document.addEventListener('DOMContentLoaded', addActiveClassWithDelay);
window.addEventListener('scroll', addActiveClassWithDelay);
