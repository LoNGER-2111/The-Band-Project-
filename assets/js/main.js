const buyBtns = document.querySelectorAll(".js-buy-btn");
const modal = document.querySelector(".js-modal");
const modalContainer = document.querySelector(".js-modal-container");
const modalClose = document.querySelector(".js-modal-close");
const header = document.getElementById("header");
const mobileMenu = document.getElementById("mobile-menu");
const menuItems = document.querySelectorAll('#nav li a[href*="#"]');
const slides = document.querySelectorAll("#slider .slider-inner .item");
const sliderDots = document.querySelectorAll("#slider .slider-indicators .dot");
const prevSlide = document.querySelector("#slider .prev-slide");
const nextSlide = document.querySelector("#slider .next-slide");

// Hàm hiển thị modal mua vé (thêm class open vào modal)
function showBuyTickets() {
  modal.classList.add("open");
}

// Hàm ẩn modal mua vé (gỡ bỏ class open của modal)
function hideBuyTickets() {
  modal.classList.remove("open");
}

// Lặp qua từng thẻ button và nghe hành vi click
for (const buyBtn of buyBtns) {
  buyBtn.addEventListener("click", showBuyTickets);
}

// Nghe hành vi click vào button close
modalClose.addEventListener("click", hideBuyTickets);

// Ẩn modal mua vé khi click ra bên ngoài modal container
modal.addEventListener("click", hideBuyTickets);

modalContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});

// Hiển thị Menu Bars
const headerHeight = header.clientHeight;
// Đóng/mở mobile menu
mobileMenu.onclick = function () {
  const isClosed = header.clientHeight === headerHeight;
  if (isClosed) {
    header.style.height = "auto";
  } else {
    header.style.height = null;
  }
};

// Tự động đóng khi chọn menu items
for (let i = 0; i < menuItems.length; i++) {
  const menuItem = menuItems[i];
  menuItem.onclick = function (event) {
    const isParentMenu =
      this.nextElementSibling &&
      this.nextElementSibling.classList.contains("subnav");
    if (isParentMenu) {
      event.preventDefault();
    } else {
      header.style.height = null;
    }
  };
}
