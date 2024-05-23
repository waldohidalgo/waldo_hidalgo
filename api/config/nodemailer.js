import nodemailer from "nodemailer";
import dotenv from "dotenv";

import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

dotenv.config();

const {
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  EMAIL_REFRESH_TOKEN,
} = process.env;

const oauth2Client = new OAuth2(
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({ refresh_token: EMAIL_REFRESH_TOKEN });

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: EMAIL_USERNAME,
    clientId: EMAIL_CLIENT_ID,
    clientSecret: EMAIL_CLIENT_SECRET,
    refreshToken: EMAIL_REFRESH_TOKEN,
    accessToken: accessToken.toString(),
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
