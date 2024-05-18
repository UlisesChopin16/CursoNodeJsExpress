// aquí vamos a poner todas las rutas que tengan que ver con productos
const express = require("express");
// faker es una libreria que nos permite generar datos falsos
const { faker } = require("@faker-js/faker");

// generamos un router especifico para los productos
const router = express.Router();

// El metodo get no solo puede recibir un parametro sino varios y pueden estar separados
router.get("/:idCategory/products/:idProduct", (req, res) =>{
  // {param} es una forma de desestructurar un objeto y obtener el valor del parametro
  // con esta notacion no hace falta escribir req.params.id sino que solo sea [const {id} = req.params]
  const {idCategory, idProduct} = req.params;
  res.json({
    idCategory,
    idProduct,
    price: 100
  });
});
