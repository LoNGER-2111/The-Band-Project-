const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

class Modal {
  constructor() {
    this.modal = $(".js-modal");
    this.modalContainer = $(".js-modal-container");
    this.modalClose = $(".js-modal-close");
    this.buyBtns = $$(".js-buy-btn");

    this.handleEventListeners();
  }

  handleEventListeners() {
    this.listenForBuyBtnClicks();
    this.listenForModalCloseClicks();
  }

  // Show modal function
  show() {
    this.modal.classList.add("open");
  }

  // Hide modal function
  hide() {
    this.modal.classList.remove("open");
  }

  // Open modal when click buy buttons
  listenForBuyBtnClicks() {
    for (const buyBtn of this.buyBtns) {
      buyBtn.addEventListener("click", this.show.bind(this));
    }
  }

  // Handle modal closing
  listenForModalCloseClicks() {
    this.modalClose.addEventListener("click", this.hide.bind(this));
    this.modal.addEventListener("click", this.hide.bind(this));
    this.modalContainer.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}

class MobileMenu {
  constructor() {
    this.mobileMenu = $("#mobile-menu");
    this.header = $("#header");
    this.menuItems = $$('#nav li a[href*="#"]');

    this.headerHeight = this.header.clientHeight;
    this.handleEventListeners();
  }

  handleEventListeners() {
    this.listenForMobileMenuClicks();
    this.listenForMenuItemClicks();
    this.listenForOutsideClicks();
  }

  // Toggle mobile menu function
  toggle() {
    const isClosed = this.header.clientHeight === this.headerHeight;
    if (isClosed) {
      this.header.style.height = "auto";
    } else {
      this.header.style.height = null;
    }
  }

  // Toggle mobile menu when click menu button
  listenForMobileMenuClicks() {
    this.mobileMenu.addEventListener("click", this.toggle.bind(this));
  }

  // Close mobile menu when click menu items
  listenForMenuItemClicks() {
    for (let i = 0; i < this.menuItems.length; i++) {
      const menuItem = this.menuItems[i];
      menuItem.addEventListener("click", (event) => {
        const isParentMenu =
          menuItem.nextElementSibling &&
          menuItem.nextElementSibling.classList.contains("subnav");
        if (isParentMenu) {
          event.preventDefault();
        } else {
          this.header.style.height = null;
        }
      });
    }
  }

  // Close mobile menu when click outside
  listenForOutsideClicks() {
    window.addEventListener("click", (e) => {
      if (!e.target.closest("#header")) {
        this.header.style.height = null;
      }
    });
  }
}

class SubNav {
  constructor() {
    this.subNav = $("#nav li .subnav");
    this.moreBtn = $("#nav .more-btn");

    this.handleEventListeners();
  }

  handleEventListeners() {
    this.listenForMoreBtnClicks();
    this.listenForOutsideClicks();
  }

  // Toggle sub nav function
  toggle() {
    if (this.subNav.classList.contains("block")) {
      this.subNav.classList.remove("block");
      this.moreBtn.classList.remove("active");
    } else {
      this.subNav.classList.add("block");
      this.moreBtn.classList.add("active");
    }
  }

  // Toggle sub nav when click more button
  listenForMoreBtnClicks() {
    this.moreBtn.addEventListener("click", this.toggle.bind(this));
  }

  // Close sub nav when click outside
  listenForOutsideClicks() {
    window.addEventListener("click", (e) => {
      if (!e.target.matches("#nav .more-btn")) {
        this.subNav.classList.remove("block");
        this.moreBtn.classList.remove("active");
      }
    });
  }
}

class Slider {
  constructor() {
    this.sliderContainer = $("#slider .slider-container");
    this.slides = $$("#slider .slider-container .item");
    this.dots = $$("#slider .slider-indicators .dot");
    this.prevSlide = $("#slider .prev-slide");
    this.nextSlide = $("#slider .next-slide");

    this.slideIndex = 1;
    this.slideWidth = this.slides[0].clientWidth;
    this.intervalId = undefined;
    this.handleEvents();
  }

  handleEvents() {
    this.showSlide();
    this.listenForNextBtnClicks();
    this.listenForPrevBtnClicks();
    this.listenForTransitionEnd();
    this.listenForWindowResize();
    this.listenForDotsClicks();
    this.autoNextSlide();
  }

  // Show slide function
  showSlide() {
    // Transform slider container
    this.sliderContainer.style.transform =
      "translateX(" + -this.slideWidth * this.slideIndex + "px)";

    // Active dot when its corresponding slide is showed
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].classList.remove("active");
    }
    if (this.slideIndex === 0) {
      this.dots[this.dots.length - 1].classList.add("active");
    } else if (this.slideIndex === this.slides.length - 1) {
      this.dots[0].classList.add("active");
    } else {
      this.dots[this.slideIndex - 1].classList.add("active");
    }
  }

  // Show next slide when click next button
  listenForNextBtnClicks() {
    this.nextSlide.addEventListener("click", () => {
      if (this.slideIndex >= this.slides.length - 1) return;
      this.sliderContainer.style.transition = "transform 0.6s ease-in-out";
      this.slideIndex++;
      this.showSlide();
      this.resetInterval();
    });
  }

  // Show prev slide when click prev button
  listenForPrevBtnClicks() {
    this.prevSlide.addEventListener("click", () => {
      if (this.slideIndex <= 0) return;
      this.sliderContainer.style.transition = "transform 0.6s ease-in-out";
      this.slideIndex--;
      this.showSlide();
      this.resetInterval();
    });
  }

  // Create infinite slider
  listenForTransitionEnd() {
    this.sliderContainer.addEventListener("transitionend", () => {
      if (this.slides[this.slideIndex].id === "last-clone") {
        this.sliderContainer.style.transition = "none";
        this.slideIndex = this.slides.length - 2;
        this.showSlide();
      }
      if (this.slides[this.slideIndex].id === "first-clone") {
        this.sliderContainer.style.transition = "none";
        this.slideIndex = 1;
        this.showSlide();
      }
    });
  }

  // Recalculate slide width when resize or reload website
  listenForWindowResize() {
    window.addEventListener("resize", () => {
      this.sliderContainer.style.transition = "none";
      this.slideWidth = this.slides[0].clientWidth;
      this.showSlide();
    });
    window.addEventListener("load", () => {
      this.sliderContainer.style.transition = "none";
      this.slideWidth = this.slides[0].clientWidth;
      this.showSlide();
    });
  }

  // Show corresponding slide when click dot
  listenForDotsClicks() {
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].addEventListener("click", () => {
        this.slideIndex = i + 1;
        this.showSlide();
        this.sliderContainer.style.transition = "transform 0.6s ease-in-out";
        this.resetInterval();
      });
    }
  }

  // Next slide automatically
  autoNextSlide() {
    this.intervalId = setInterval(() => {
      this.slideIndex++;
      this.sliderContainer.style.transition = "transform 0.6s ease-in-out";
      this.showSlide();
    }, 5000);
  }

  // Reset slide interval
  resetInterval() {
    clearInterval(this.intervalId);
    this.autoNextSlide();
  }
}

const modal = new Modal();
const mobileMenu = new MobileMenu();
const subNav = new SubNav();
const slider = new Slider();
//comment
//test is feature
