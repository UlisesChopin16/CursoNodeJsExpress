// importamos express
const express = require("express");
// importamos las rutas ya sean de los productos, usuarios, etc
const productsRouter = require("./products.router");
// const usersRouter = require("./users.router");
// const categoriesRouter = require("./categories.router");

// creamos una funcion que tiene como proposito definir las rutas de la API
function routerApi(app){

  // creamos un router especifico para la API
  const router = express.Router();

  // definimos la ruta padre de la API
  // así, todas las rutas que definamos en el router, van a tener como prefijo /api/v1
  // ejemplo: /api/v1/products, /api/v1/users, /api/v1/categories
  app.use("/api/v1", router);

  // definimos la ruta de los productos
  router.use("/products", productsRouter);

  // definimos la ruta de los usuarios
  // router.use("/users", usersRouter);

  // definimos la ruta de las categorias
  // router.use("/categories", categoriesRouter);

}

// si quisieramos manejar la version 2 entonces deberiamos crear otro index
// que ahora maneje esa version

// exportamos la funcion para poder usarla en otros archivos
module.exports = routerApi;
