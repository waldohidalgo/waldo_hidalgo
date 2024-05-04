$(function () {
  const icono_hamburguesa = $("#hamburguer_icon");
  const menuLateral = $("#menuLateralOffcanvas");
  const objetoMenuLateral = new bootstrap.Offcanvas(menuLateral[0]);

  icono_hamburguesa.on("click", function () {
    $(this).toggleClass("open");
    objetoMenuLateral.toggle(); //método de la API de offcanvas de bootstrap
  });

  //evento de la API de offcanvas de bootstrap
  menuLateral.on("hide.bs.offcanvas", function () {
    icono_hamburguesa.removeClass("open");
  });
});
