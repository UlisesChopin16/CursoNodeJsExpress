
// Los middlewares de tipo error siempre tienen 4 parametros,
// el error, el request, el response y la función next que sirve
// para pasar al siguiente middleware

// funcion para manejar el error y enviarlo al middleware
function errorLogger(err, req, res, next) {

  // mostramos el error en la consola
  console.error(err.stack);

  // pasamos el error al siguiente middleware
  next(err);
}


// funcion para manejar el error y enviarlo al cliente
function errorHandler(err, req, res, next) {

  // mandamos un mensaje de error al cliente
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next) {
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }else{
    next(err);
  }
}

module.exports = {
  errorLogger,
  errorHandler,
  boomErrorHandler
};
