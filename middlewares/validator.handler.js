const boom = require('@hapi/boom');

// Objetivo: Validar los datos que se envian en las peticiones
// esta funcion recibe un schema para validar los datos y el nombre de la propiedad
function validatorHandler(schema, property) {

  // creamos un middleware que recibe los datos de la peticion, los valida con el schema
  // los closures sirven para que la funcion que retorna el middleware pueda acceder a los datos
  return (req, res, next) => {
    // obtenemos los datos de la propiedad que queremos validar
    const data = req[property];
    // validamos los datos con el schema
    const { error } = schema.validate(
      data,
      // esta configuracion es para que joi nos devuelva todos los errores sin parar uno por uno
      { abortEarly: false }
    );
    // si hay un error, lo pasamos al siguiente middleware
    if(error){
      next(boom.badRequest(error));
    }else{
      // si no hay error, pasamos al siguiente middleware
      next();
    }
  };
}

module.exports = validatorHandler;
