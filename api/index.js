import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import router from "./router/routes.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", path.resolve("api", "views"));
app.use(express.static(path.resolve("public")));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${PORT}`);
});

export default app;
