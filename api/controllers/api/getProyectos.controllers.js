import getProyectosQuery from "../../queries/getProyectos.query.js";

export default async function getAPIProyectos(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  try {
    const proyectos = await getProyectosQuery();
    if (endIndex < proyectos.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.results = proyectos.slice(startIndex, endIndex);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los proyectos" });
  }
}
