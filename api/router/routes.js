import { Router } from "express";
import getHome from "../controllers/getHome.controllers.js";
import postContacto from "../controllers/postContacto.controllers.js";
import checkInputValid from "../controllers/checkInputValid.controllers.js";
import checkCaptcha from "../controllers/checkCaptcha.controllers.js";
import get404 from "../controllers/get404.controllers.js";
import getAPIProyectos from "../controllers/api/getProyectos.controllers.js";
const router = Router();

router.get("/", getHome);

/*
API routes
*/
router.get("/api/proyectos", getAPIProyectos);

router.post("/contacto", checkInputValid, checkCaptcha, postContacto);

router.get("/*", get404);

export default router;
