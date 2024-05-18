// aquí vamos a poner todas las rutas que tengan que ver con productos
const express = require("express");
// faker es una libreria que nos permite generar datos falsos
const { faker } = require("@faker-js/faker");

// generamos un router especifico para los productos
const router = express.Router();

// Metodo get con query params
// las rutas son endpoints, entonces creamos un nuevo endpoint para usuarios
router.get("/", (req, res) =>{
  // {param} es una forma de desestructurar un objeto y obtener el valor del parametro
  // para obtener los query params se usa req.query
  // obtenemos los query con los nombres limit y offset
  const {limit, offset} = req.query;
  // validamos que si limit y offset existen, se devuelven en un json
  if(limit && offset){
    res.json({
      limit,
      offset
    });
  }
  // si no existen los query params, se devuelve un mensaje
  else{
    res.send("No hay parametros");
  }
});
