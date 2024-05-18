// REST: Representational State Transfer
// API: Application Programming Interface
// CRUD: Create, Read, Update, Delete
// HTTP: Hypertext Transfer Protocol
const express = require("express");
// importamos la libreria de cors
const cors = require("cors");
// importamos el archivo de las rutas
const routerApi = require("./routes");
// importamos los middlewares
const { errorLogger, errorHandler, boomErrorHandler } = require("./middlewares/error.handler");


const app = express();
const port = 3000;

// para que podamos recibir datos en formato json
// tenemos que usar un middleware nativo de express
// con esta linea de codigo, express va a entender que los datos que recibe
// van a estar en formato json
app.use(express.json());

// creamos un listado de todos los dominios que tendran acceso a nuestra API
const whiteList = ["http://localhost:8080", "https://myapp.co"];
// creamos un objeto con las opciones de configuracion
const options = {
  // origin: "*" // Esto sirve para aceptar peticiones de cualquier origen
  origin: (origin, callback) => {
    // si el dominio que hace la peticion esta en la lista blanca
    if(whiteList.includes(origin) || !origin){
      // permitimos la peticion
      callback(null, true);
    }else{
      // no permitimos la peticion
      callback(new Error("No permitido"));
    }
  }
};

// Esto sirve para aceptar peticiones de cualquier origen
app.use(cors(options));

app.get("/", (req, res) =>{
  res.send("Hola mi server en Express");
});

app.get("/hola", (req, res) =>{
  res.send("Hola UwU");
});

// usamos la funcion que definimos en el archivo de las rutas
routerApi(app);

// Los middlewares de error siempre van al final, después de generar el routing
app.use(errorLogger);
app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(port, () =>{
  console.log("My port: " + port);
});
