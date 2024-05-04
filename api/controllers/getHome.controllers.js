import path from "path";
import getProyectosQuery from "../queries/getProyectos.query.js";
import getCertifications from "../queries/getCertifications.query.js";
export default async function getHome(req, res) {
  try {
    const proyectos = await getProyectosQuery();
    const certificaciones = await getCertifications();

    res.render(path.resolve("api", "views", "index.hbs"), {
      data: {
        proyectos,
        certificaciones: certificaciones.sort(
          (a, b) => a.fecha_obtencion - b.fecha_obtencion
        ),
        frontend: ["react", "next.js", "redux", "SASS", "bootstrap", "jquery"],
        backend: ["node.js", "express", "python"],
        database: ["postgreSQL", "mySQL"],
        data_analysis: ["power bi", "pandas", "numpy", "matplotlib", "seaborn"],
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
