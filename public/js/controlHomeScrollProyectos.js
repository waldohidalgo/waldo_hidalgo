$(function () {
  function addEventListenersProjects() {
    const allCategories = $("[data-categoria]");
    const fullStackCategory = $("[data-categoria='fullstack']");
    const frontEndCategory = $("[data-categoria='front end']");

    function showAllprojects() {
      allCategories.show();
    }
    function showFullStackProjects() {
      allCategories.show();
      frontEndCategory.hide();
    }

    function showFrontEndProjects() {
      allCategories.show();
      fullStackCategory.hide();
    }

    function hideAllProjects() {
      allCategories.hide();
    }
    //remover el event listener
    $("#btn_todos").off("click", showAllprojects);
    $("#btn_todos").on("click", showAllprojects);

    $("#btn_fullstack").off("click", showFullStackProjects);
    $("#btn_fullstack").on("click", showFullStackProjects);

    $("#btn_front_end").off("click", showFrontEndProjects);
    $("#btn_front_end").on("click", showFrontEndProjects);

    $("#btn_ocultar").off("click", hideAllProjects);
    $("#btn_ocultar").on("click", hideAllProjects);
  }

  let currentPage = 1;
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
  }

  async function loadMoreProjects() {
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
  loadMoreProjects(); // initial load
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
