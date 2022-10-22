const fs = require("fs");

class Contenedor {
    constructor(archivo){
        this.filename = archivo;
    }
    async save(product){
        try {
            if(fs.existsSync(this.filename)){
                const productos = await this.getAll();
                if(productos.length>0){
                    //agregar producto
                    const newId =productos[productos.length-1].id+1;
                    product.id = newId;
                    productos.push(product);
                    await fs.promises.writeFile(this.filename,JSON.stringify(productos,null,2));
                } else{
                    //agregamos un primer producto
                    product.id = 1;
                    await fs.promises.writeFile(this.filename,JSON.stringify([product],null,2));
                }
            } else {
                product.id = 1;
                await fs.promises.writeFile(this.filename,JSON.stringify([product],null,2));
            }
        } catch (error) {
            return "El producto no pudo ser guardado";
        }
    }

    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.filename,"utf-8");
            if(contenido.length>0){
                const productos = JSON.parse(contenido);
                return productos;
            } else{
                return [];
            }
        } catch (error) {
            return "El archivo no se puede leer";
        }
    }

    async getById(id){
        try {
            //obtener todos los productos.
            const productos = await this.getAll();
            //buscar nuestro producto por el id
            const producto = productos.find(elemento=>elemento.id === id);
            return producto;
        } catch (error) {
            return "El producto no se encuentra";
        }
    }

    async deleteById(id){
        try {
            const productos = await this.getAll();
            const nuevosProductos = productos.filter(elemento=>elemento.id !== id);
            await fs.promises.writeFile(this.filename,JSON.stringify(nuevosProductos,null,2));
            return `El producto con el id ${id} fue elimnado`;
        } catch (error) {
            return "El elemento no puede ser eliminado"
        }
    }

    getName(){
        return this.filename;
    }

    async deleteAll() {
        try {
          const productos = await this.getAll();
          let largo = productos.length;
          productos.splice(0, largo);
          fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, 2));
        } catch (error) {
          return "imposible eliminar todos los objetos.";
        }
      }
}

const producto1={
    title: "lapiz negro",
    price: 80,
    thumbnail: "https://falabella.scene7.com/is/image/FalabellaCO/8263644_1?wid=800&hei=800&qlt=70"
}
const producto2={
    title: "Gom de borrar",
    price: 50,
    thumbnail: "https://offcorss.vteximg.com.br/arquivos/ids/744125-460-540/51048651-Azul-13-4404_1.jpg?v=637844236663900000"
}

const misProductos = new Contenedor("productos.txt");
console.log(misProductos);

const Data = async()=>{
    //guardar un producto
    await misProductos.save(producto1);
    await misProductos.save(producto2);
    const productos = await misProductos.getAll();
    console.log("productos",productos);
    const productoEncontrado = await misProductos.getById(1);
    console.log("producto encontrado>", productoEncontrado);
    await misProductos.deleteById(1);
    //borrar todos los objetos
  console.log("Eliminando todos los productos...");
  await productos.deleteAll();
}
Data();