//REQUIRES
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const rememberUserMdw = require("./middlewares/rememberUserMdw");
const cors = require("cors")

//EXPRESS
const app = express();

//DEFINICION DE PUERTO
const puerto = process.env.PORT || 3000;

//TEMPLATE ENGINE
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(cors())
app.use("/static", express.static(path.join(__dirname, "../public")));
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(rememberUserMdw);

//USO DE RUTAS
const mainRouter = require("./routes/mainRouter");
app.use("/", mainRouter);
const userRouter = require("./routes/userRouter");
app.use("/user", userRouter);
const productsRouter = require("./routes/productsRouter");
app.use("/products", productsRouter);

//APIS
const productsAPI = require("./routes/api/products");
app.use("/api/products", productsAPI);
const usersAPI = require("./routes/api/users");
app.use("/api/users", usersAPI);

//Ruta para el error 404
app.all("*", (req, res) => {
  res.render("notFound");
});

//LISTEN SERVIDOR
app.listen(puerto, () => {
  console.log(
    `Server corriendo en puerto ${puerto}\nhttp://localhost:${puerto}`
  );
});
