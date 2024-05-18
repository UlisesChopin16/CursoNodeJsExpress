// faker es una libreria que nos permite generar datos falsos
const { faker } = require("@faker-js/faker");
// importamos la libreria de boom
const boom = require("@hapi/boom");

// Aqui definimos toda la logica transaccional que tendran todos nuestros datos
class ProductsService{

  // los servicios no tienen que inferir sus datos en caso de que
  // ya tengamos una base de datos

  constructor(){
    this.products = [];
    this.generate();
  }

  generate() {
    // limitamos la cantidad de productos a 100
    const limit = 100;

    // generamos los productos
    for(let i = 0; i < limit; i++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    // creamos un nuevo producto
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    };

    // lo agregamos a la lista de productos
    this.products.push(newProduct);

    // retornamos el producto creado
    return newProduct;
  }

  async find() {
    // retornamos todos los productos
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }
      , 2000);
    });
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound("Product not found");
    }
    if(product.isBlock){
      throw boom.conflict("Product is blocked");
    }
    // retornamos un solo producto
    return product;
  }

  async update(id, changes) {
    // obtenemos el indice del producto
    const index = this.products.findIndex(item => item.id === id);

    // verificamos si el producto existe
    if(index === -1){
      throw boom.notFound("Product not found");
    }

    // obtenemos el producto
    const product = this.products[index];

    // actualizamos el producto
    this.products[index] = {
      // usamos el spread operator para obtener todos los datos del producto
      ...product,
      // y sobreescribimos los datos que queremos cambiar
      ...changes
    };

    // retornamos el producto actualizado
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound("Product not found");
    }
    this.products.splice(index, 1);
    return { message: "Product deleted" };
  }

}

module.exports = ProductsService
