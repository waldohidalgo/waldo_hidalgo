import nodemailer from "nodemailer";
import "dotenv/config";

const {
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  EMAIL_REFRESH_TOKEN,
} = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
    clientId: EMAIL_CLIENT_ID,
    clientSecret: EMAIL_CLIENT_SECRET,
    refreshToken: EMAIL_REFRESH_TOKEN,
  },
});
export default transporter;
// transporter.sendMail(
//   {
//     from: EMAIL_USERNAME,
//     cc: ["whidalgohp@gmail.com"],
//     to: "catig54869@shanreto.com",
//     subject: "Confirmación de Mensaje Enviado",
//     text: "El correo se envió correctamente",
//     html: "<b>El correo ha sido enviado correctamente</b>",
//   },
//   (err, info) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("El correo se envió correctamente");
//     }
//   }
// );
