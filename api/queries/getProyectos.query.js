import pool from "../config/db.js";

export default async function getProyectos() {
  try {
    const client = await pool.connect();

    try {
      const res = await client.query(`
      select  pp.nombre as nombre_proyecto,
  pp.fecha_creacion as fecha_creacion,
  pp.descripcion as descripcion,
  pp.link_repositorio as link_repositorio,
  pp.link_proyecto as link_proyecto,
  pc.nombre as categoria
  from 
  portafolio_proyectos pp 
  inner join
  portafolio_categorias pc
  on pp.categoria=pc.id
  order by pp.fecha_creacion desc;
      `);
      return res.rows;
    } finally {
      client.release();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//getProyectos().then((res) => console.log(res));
