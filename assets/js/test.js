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

  show() {
    this.modal.classList.add("open");
  }

  hide() {
    this.modal.classList.remove("open");
  }

  listenForBuyBtnClicks() {
    for (const buyBtn of this.buyBtns) {
      buyBtn.addEventListener("click", this.show.bind(this));
    }
  }

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

  toggle() {
    const isClosed = this.header.clientHeight === this.headerHeight;
    if (isClosed) {
      this.header.style.height = "auto";
    } else {
      this.header.style.height = null;
    }
  }

  listenForMobileMenuClicks() {
    this.mobileMenu.addEventListener("click", this.toggle.bind(this));
  }

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

  toggle() {
    if (this.subNav.classList.contains("block")) {
      this.subNav.classList.remove("block");
      this.moreBtn.classList.remove("active");
    } else {
      this.subNav.classList.add("block");
      this.moreBtn.classList.add("active");
    }
  }

  listenForMoreBtnClicks() {
    this.moreBtn.addEventListener("click", this.toggle.bind(this));
  }

  listenForOutsideClicks() {
    window.addEventListener("click", (e) => {
      if (!e.target.matches("#nav .more-btn")) {
        this.subNav.classList.remove("block");
        this.moreBtn.classList.remove("active");
      }
    });
  }
}

class Slides {
  constructor() {
    this.slides = $$("#slider .slider-inner .item");
    this.dots = $$("#slider .slider-indicators .dot");
    this.prevSlide = $("#slider .prev-slide");
    this.nextSlide = $("#slider .next-slide");

    this.slideIndex = 0;
    this.handleEvents();
  }

  handleEvents() {
    this.showSlide();
    this.listenForMoveSlideClicks();
    this.listenForDotsClicks();
  }

  moveSlide(n) {
    this.showSlide((this.slideIndex += n));
  }

  showSlide(index) {
    if (index < 0) this.slideIndex = this.slides.length - 1;
    if (index > this.slides.length - 1) this.slideIndex = 0;
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].classList.remove("block");
    }
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].classList.remove("active");
    }
    this.slides[this.slideIndex].classList.add("block");
    this.dots[this.slideIndex].classList.add("active");
  }

  listenForMoveSlideClicks() {
    this.prevSlide.addEventListener("click", () => {
      this.moveSlide(-1);
    });
    this.nextSlide.addEventListener("click", () => {
      this.moveSlide(1);
    });
  }

  listenForDotsClicks() {
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].addEventListener("click", () => {
        this.showSlide((this.slideIndex = i));
      });
    }
  }
}

const modal = new Modal();
const mobileMenu = new MobileMenu();
const subNav = new SubNav();
const slides = new Slides();
