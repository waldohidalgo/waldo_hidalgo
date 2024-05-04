import { Router } from "express";
import getHome from "../controllers/getHome.controllers.js";
import postContacto from "../controllers/postContacto.controllers.js";
import checkInputValid from "../controllers/checkInputValid.controllers.js";
import checkCaptcha from "../controllers/checkCaptcha.controllers.js";
const router = Router();

router.get("/", getHome);

router.post("/contacto", checkInputValid, checkCaptcha, postContacto);

//router.get("/*", get404);

export default router;
