$(function () {
  new Typewriter($("#typewriter_especializaciones")[0], {
    strings: [
      "Ingeniero Civil Industrial",
      "Data Analyst",
      "Fullstack JavaScript Developer",
    ],
    loop: true,
    autoStart: true,
    delay: 40,
    deleteSpeed: 20,
  });

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  const allCategories = $("[data-categoria]");
  const fullStackCategory = $("[data-categoria='fullstack']");
  const frontEndCategory = $("[data-categoria='front end']");

  $("#btn_todos").on("click", function () {
    allCategories.show();
  });

  $("#btn_fullstack").on("click", function () {
    allCategories.show();
    frontEndCategory.hide();
  });
  $("#btn_front_end").on("click", function () {
    allCategories.show();
    fullStackCategory.hide();
  });
  $("#btn_ocultar").on("click", function () {
    allCategories.hide();
  });

  const swiperCertificaciones = new Swiper(".swiperCertificaciones", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,

    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });
});
