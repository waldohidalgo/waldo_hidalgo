import path from "path";
export default function get404(req, res) {
  res.render(path.resolve("api", "views", "pages", "404.hbs"), {
    runtimeOptions: { 404: true },
  });
}
