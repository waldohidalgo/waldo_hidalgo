$(function () {
  let categoria = "all";
  addEventListenersProjects();

  function showCategory(categoria) {
    const spanCategoria = $("#categoria_seleccionada");
    spanCategoria.text(categoria == "" ? "-" : categoria);
  }
  function addEventListenersProjects() {
    const allCategories = $("[data-categoria]");
    const fullStackCategory = $("[data-categoria='fullstack']");
    const frontEndCategory = $("[data-categoria='front end']");

    showCategory(categoria);
    function showAllprojects() {
      categoria = "all";
      showCategory(categoria);
      //console.log("mostrando todos los proyectos");
      allCategories.show();
      loadMoreBtn.show().off("click").on("click", loadMoreProjects);
    }
    function showFullStackProjects() {
      categoria = "fullstack";
      showCategory(categoria);
      allCategories.show();
      frontEndCategory.hide();
      loadMoreBtn.show().off("click").on("click", loadMoreProjects);
    }

    function showFrontEndProjects() {
      categoria = "front end";
      showCategory(categoria);
      allCategories.show();
      fullStackCategory.hide();
      loadMoreBtn.show().off("click").on("click", loadMoreProjects);
      displayProjects;
    }

    function hideAllProjects() {
      categoria = "";
      showCategory(categoria);
      allCategories.hide();
    }
    //remover el event listener

    $("#btn_todos").off("click").on("click", showAllprojects);

    $("#btn_fullstack").off("click").on("click", showFullStackProjects);

    $("#btn_front_end").off("click").on("click", showFrontEndProjects);

    $("#btn_ocultar").off("click").on("click", hideAllProjects);
  }

  let currentPage = 2;
  const proyectosContainer = $("#proyectos_contenedor");

  const loadMoreBtn = $("#btn_cargar_mas_proyectos");
  async function fetchProyectos(page) {
    try {
      const response = await fetch(
        `https://api-portfolio-beige.vercel.app/api/proyectos?page=${page}`
      );
      const data = await response.json();
      const projects = data.results;
      const isNextPage = data.next;
      return [projects, isNextPage];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  function displayProjects(projects) {
    projects.forEach((project) => {
      proyectosContainer.append(`<div class="proyectos_item" data-categoria="${project.categoria}">
          <div class="proyectos_contenedor_image">
            <div class="efecto_contenedor_image">
              <div class="efecto_contenedor_image_contenido">
                <a
                  class="text-center"
                  href="${project.link_proyecto}"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Link al Proyecto ${project.nombre_proyecto}"
                  ><i class="bi bi-image-fill"></i> Link al Proyecto</a
                >
              </div>
            </div>
            <img
              src="/images/proyectos/${project.nombre_proyecto}.webp"
              alt="${project.nombre_proyecto}"
            />
          </div>
          <div class="proyectos_contenedor_contenido">
            <h3 class="proyectos_titulo noto_style">
              ${project.nombre_proyecto}
            </h3>
            <h4
              class="proyectos_categoria noto_style"
              title="Categoria: ${project.categoria}"
            >
              ${project.categoria}
            </h4>
            <p class="proyectos_descripcion">${project.descripcion}</p>
            <p>
              <a
                class="proyectos_link_repositorio"
                href="${project.link_repositorio}"
                target="_blank"
                rel="noopener noreferrer"
                title="Repositorio del Proyecto ${project.nombre_proyecto}"
                ><i class="bi bi-github"></i> Repositorio</a
              >
            </p>
          </div>
        </div>
      `);
    });
    if (categoria == "fullstack") {
      const frontEndCategory = $("[data-categoria='front end']");
      frontEndCategory.hide();
    }
    if (categoria == "front end") {
      const fullStackCategory = $("[data-categoria='fullstack']");
      fullStackCategory.hide();
    }
    if (categoria === "") {
      const allCategories = $("[data-categoria]");
      allCategories.hide();
    }
  }

  async function loadMoreProjects() {
    //console.log(categoria);
    try {
      const [proyectos, isNextPage] = await fetchProyectos(currentPage);

      if (proyectos && proyectos.length > 0) {
        displayProjects(proyectos);
        currentPage++;
        addEventListenersProjects();
      }
      if (!isNextPage) {
        loadMoreBtn.hide();
      }
    } catch (error) {
      console.log(error);
    }
  }
  loadMoreBtn.on("click", loadMoreProjects);
});
/*
{{#each data.proyectos }}
          <div class="proyectos_item" data-categoria="{{ this.categoria }}">
            <div class="proyectos_contenedor_image">
              <div class="efecto_contenedor_image">
                <div class="efecto_contenedor_image_contenido">
                  <a
                    class="text-center"
                    href="{{ this.link_proyecto }}"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Link al Proyecto {{ this.nombre_proyecto }}"
                    ><i class="bi bi-image-fill"></i> Link al Proyecto</a
                  >
                </div>
              </div>
              <img
                src="/images/proyectos/{{{ this.nombre_proyecto }}}.webp"
                alt="{{ this.nombre_proyecto }}"
              />
            </div>
            <div class="proyectos_contenedor_contenido">
              <h3 class="proyectos_titulo noto_style">
                {{ this.nombre_proyecto }}
              </h3>
              <h4
                class="proyectos_categoria noto_style"
                title="Categoria: {{ this.categoria }}"
              >
                {{ this.categoria }}
              </h4>
              <p class="proyectos_descripcion">{{ this.descripcion }}</p>
              <p>
                <a
                  class="proyectos_link_repositorio"
                  href="{{ this.link_repositorio }}"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Repositorio del Proyecto {{ this.nombre_proyecto }}"
                  ><i class="bi bi-github"></i> Repositorio</a
                >
              </p>
            </div>
          </div>
          {{/each}}
*/
