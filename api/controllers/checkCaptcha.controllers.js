import "dotenv/config";

const { RECAPTCHA_SECRET_KEY } = process.env;

export default async function checkCaptcha(req, res, next) {
  const response_key = req.body["g-recaptcha-response"];
  if (!response_key) {
    res.status(401).json({ ok: false, error: "Debes completar el captcha" });
    return;
  }
  const secret_key = RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;
  try {
    const response = await fetch(url, {
      method: "post",
    });
    const google_response = await response.json();

    if (google_response.success == true) {
      next();
    } else {
      res.status(401).json({ ok: false, error: "Recaptcha no valido" });
      return;
    }
  } catch (error) {
    res.json({ error });
    console.log(error);
  }
}
