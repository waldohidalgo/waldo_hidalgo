import postContactoQuery from "../queries/postContacto.query.js";
import transporter from "../config/nodemailer.js";
export default async function postContacto(req, res) {
  const { nombre, apellido, email, asunto, mensaje } = req.body;

  try {
    const response = await postContactoQuery({
      nombre,
      apellido,
      email,
      asunto,
      mensaje,
    });

    const info = await transporter.sendMail({
      from: "whidalgohp@gmail.com",
      cc: ["whidalgohp@gmail.com"],
      to: email,
      subject: "Confirmación de Mensaje Enviado",
      text: "El correo se envió correctamente 🎉",
      html: `<h2>El correo ha sido enviado correctamente 🎉</h2>
          <p>Mensaje: ${mensaje}</p>`,
    });
    if (response.length > 0 && info) {
      console.log("El correo se envió correctamente");
      res.status(200).json({ ok: true });
    } else {
      throw new Error("El correo no se envió correctamente");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false });
  }
}
