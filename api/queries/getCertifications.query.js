import pool from "../config/db.js";

export default async function getCertifications() {
  try {
    const client = await pool.connect();
    try {
      const res = await client.query(
        "select * from portafolio_certificaciones order by fecha_obtencion desc;"
      );
      return res.rows;
    } finally {
      client.release();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
