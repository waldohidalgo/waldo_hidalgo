import path from "path";
import getProyectosQuery from "../queries/getProyectos.query.js";
import getCertifications from "../queries/getCertifications.query.js";

// ruta API para mostrar la primera pagina de proyectos

const projectsAPI =
  "https://api-portfolio-beige.vercel.app/api/proyectos?page=1";
export default async function getHome(req, res) {
  try {
    const certificaciones = await getCertifications();

    const responseProjectsAPI = await fetch(projectsAPI);
    const projectsPageData = await responseProjectsAPI.json();
    const projectsFirstPage = projectsPageData.results;

    res.render(path.resolve("api", "views", "index.hbs"), {
      data: {
        proyectos: projectsFirstPage,
        certificaciones: certificaciones.sort(
          (a, b) => a.fecha_obtencion - b.fecha_obtencion
        ),
        frontend: [
          "react",
          "vue",
          "next.js",
          "redux",
          "SASS",
          "bootstrap",
          "jquery",
          "tailwindCSS",
        ],
        backend: [
          "node.js",
          "express",
          "python",
          "PostgreSQL",
          "MongoDB",
          "MySQL",
          "chai",
        ],
        data_analysis: ["Power BI", "pandas", "numpy", "matplotlib", "seaborn"],
      },
      runtimeOptions: { home: true },
      helpers: {
        createPathImage: (image) => {
          return `/images/estudios/${image}.webp`;
        },
        formatDate: (date) => {
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const year = date.getFullYear();

          return `${day}-${month}-${year}`;
        },
      },
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
