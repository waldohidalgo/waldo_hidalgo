$(function () {
  const formJQuery = $("#contacto_form");

  $("#btn_reset_form").on("click", function () {
    formJQuery[0].reset();
    formJQuery.removeClass("was-validated");
  });

  formJQuery.on("submit", async function (event) {
    event.preventDefault();
    formJQuery.addClass("was-validated");
    const contenedor_contacto_botones = $(".contenedor_contacto_botones");
    const enviandoMail = $(".enviando_mail");

    const formData = JSON.stringify(
      $(this)
        .serializeArray()
        .reduce((acc, el) => {
          acc[el.name] = el.value;
          return acc;
        }, {})
    );

    if (formJQuery[0].checkValidity()) {
      contenedor_contacto_botones.hide();
      enviandoMail.show();
      try {
        const response = await fetch("/contacto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        });

        if (response.status === 200) {
          Swal.fire({
            title: "Éxito!",
            text: "El mensaje se envió correctamente",
            icon: "success",
          }).then(() => {
            formJQuery[0].reset();
            formJQuery.removeClass("was-validated");
            contenedor_contacto_botones.show();
            enviandoMail.hide();
            grecaptcha.reset();
          });
          return;
        }
        if (response.status === 400) {
          const { error } = await response.json();
          Swal.fire({
            title: "Error!",
            text: error,
            icon: "error",
          }).then(() => {
            contenedor_contacto_botones.show();
            enviandoMail.hide();
            grecaptcha.reset();
          });
          return;
        }
        if (response.status === 401) {
          const { error } = await response.json();
          Swal.fire({
            title: "Error!",
            text: error,
            icon: "error",
          }).then(() => {
            contenedor_contacto_botones.show();
            enviandoMail.hide();
            grecaptcha.reset();
          });
          return;
        }
        throw new Error("Hubo un error al enviar el mensaje");
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Hubo un error al enviar el mensaje",
          icon: "error",
        }).then(() => {
          contenedor_contacto_botones.show();
          enviandoMail.hide();
          grecaptcha.reset();
        });
      }
    }
  });
});
