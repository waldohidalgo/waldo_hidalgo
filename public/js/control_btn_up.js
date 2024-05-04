/*
Código para el botón scroll top
*/

$(function () {
  $(window).scroll(function () {
    mostrarOcultarBoton();
  });

  function mostrarOcultarBoton() {
    const botonScroll = $("#scrollBtn");
    if ($(document).scrollTop() > 20) {
      botonScroll.css("opacity", "1");
    } else {
      botonScroll.css("opacity", "0");
    }
  }
  $("#scrollBtn").click(function () {
    scrollToTop();
  });

  function scrollToTop() {
    $("html,body").scrollTop(0);
  }
});

/*
  function mostrarOcultarBoton() {
    var botonScroll = document.getElementById("scrollBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      botonScroll.style.opacity = "1";
    } else {
      botonScroll.style.opacity = "0";
    }
  }
  
  function scrollToTop() {
    document.body.scrollTop = 0; // Para navegadores Safari
    document.documentElement.scrollTop = 0; // Para navegadores Chrome, Firefox, IE y Opera
  }
  
  */
