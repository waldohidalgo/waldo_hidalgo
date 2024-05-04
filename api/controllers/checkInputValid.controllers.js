export default async function checkInputValid(req, res, next) {
  const { nombre, apellido, email, asunto, mensaje } = req.body;

  if (nombre.length > 15) {
    return res
      .status(400)
      .json({ ok: false, error: "El nombre supera el largo permitido" });
  }
  if (apellido.length > 15) {
    return res
      .status(400)
      .json({ ok: false, error: "El apellido supera el largo permitido" });
  }
  if (email.length > 50) {
    return res
      .status(400)
      .json({ ok: false, error: "El email supera el largo permitido" });
  }
  if (asunto.length > 50) {
    return res
      .status(400)
      .json({ ok: false, error: "El asunto supera el largo permitido" });
  }
  if (mensaje.length > 500) {
    return res
      .status(400)
      .json({ ok: false, error: "El mensaje supera el largo permitido" });
  }

  next();
}
