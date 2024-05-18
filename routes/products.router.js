// aquí vamos a poner todas las rutas que tengan que ver con productos
const express = require("express");

// importamos los servicios para los productos
const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');


// generamos un router especifico para los productos
const router = express.Router();

// creamos la instancia del servicio
const service = new ProductsService();

// La diferencia entre los query params y los parametros es que los query params se pasan despues de un '?'
// y se pueden pasar varios parametros separados por '&' y se pueden pasar en cualquier orden y no son obligatorios
// los parametros son obligatorios y se pasan en la ruta y en el orden que se definan en la ruta


// El metodo get sin parametros es el que se ejecuta por defecto
// además debe de devolver una lista, ya sean productos, usuarios, tareas, etc
// no hace falta poner products en el string ya que es definido por el index.js
router.get("/", async (req, res) =>{
  // obtenemos el listado de los productos
  const products = await service.find();

  // mandamos la respuesta en formato JSON
  res.json(products);
});

// si tenemos un endpoint parecido como este /products/:id
// y despues creamos un endpoint como este /products/filter
// express va a tomar el primer endpoint que coincida con la ruta
// por lo que si queremos que se ejecute el segundo endpoint, debemos de ponerlo antes del primero
// ya que express va a tomar el primero que coincida con la ruta
// como se ve a continuacion
// /products/filter
// /products/:id
// si se pone primero /products/:id, express va a tomar ese endpoint en lugar de /products/filter
router.get("/filter", async (req, res) =>{
  res.send("Nuevo producto");
});

// El metodo get con parametros es el que se ejecuta cuando se le pasa un id
// además debe de devolver un solo elemento, ya sea un producto, usuario, tarea, etc
// cuando se le ponen ':' a una palabra en la ruta, significa que es un parametro
router.get("/:id",
  // validamos el id con el schema
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) =>{
    try {
      // {param} es una forma de desestructurar un objeto y obtener el valor del parametro
      // con esta notacion no hace falta escribir req.params.id sino que solo sea [const {id} = req.params]
      const {id} = req.params;

      const product = await service.findOne(id);

      res.json(product);
    } catch (error) {
      // next es una funcion que se ejecuta cuando hay un error, diciendo que
      // pase el error al siguiente middleware
      next(error);
    }
  }
);

// El metodo post es el que se ejecuta cuando se quiere crear un nuevo elemento
// en este caso un nuevo producto
router.post("/",
  // validamos el body con el schema
  validatorHandler(createProductSchema, "body"),
  async (req, res) =>{
    // no hace falta desestructurar el objeto ya que quiero todo el cuerpo, no solo una partesita
    const body = req.body;

    // creamos un nuevo producto
    const newProduct = await service.create(body);

    // mandamos como respuesta un mensaje y el mismo json que se mando
    res.status(201).json(newProduct);
  }
);

// El metodo patch es el que se ejecuta cuando se quiere actualizar un producto
// pero no completamente si no solo una parte de el
router.patch("/:id",
  // validamos el id con el schema
  validatorHandler(getProductSchema, "params"),
  // validamos el body con el schema
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) =>{
    try {
      // obtenemos el id de los parametros con la desestructuración
      const {id} = req.params;

      // obtenemos el body
      const body = req.body;

      // actualizamos el producto
      const product = await service.update(id, body);

      // mandamos la respuesta en formato json
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// El metodo delete es el que se ejecuta cuando se quiere eliminar un producto
router.delete("/:id", async (req, res) =>{
  // obtenemos el id de los parametros con la desestructuración
  const {id} = req.params;

  // no requiere de un body
  const rta = await service.delete(id);

  // mandamos la respuesta en formato json
  res.json(rta);
});

// exportamos todas las rutas para poder usarlo en otros archivos
module.exports = router;
