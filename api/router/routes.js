import { Router } from "express";
import getHome from "../controllers/getHome.controllers.js";
import postContacto from "../controllers/postContacto.controllers.js";
import checkInputValid from "../controllers/checkInputValid.controllers.js";
const router = Router();

router.get("/", getHome);

router.post("/contacto", checkInputValid, postContacto);

//router.get("/*", get404);

export default router;
