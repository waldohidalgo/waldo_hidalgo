import pool from "../config/db.js";
export default async function postContactoQuery({
  nombre,
  apellido,
  email,
  asunto,
  mensaje,
}) {
  try {
    const client = await pool.connect();
    try {
      const values = [nombre, apellido, email, asunto, mensaje, new Date()];
      const res = await client.query(
        "INSERT INTO portafolio_mensajes (nombre, apellido, email, asunto, mensaje,fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        values
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
