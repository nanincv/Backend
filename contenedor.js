const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");

      return JSON.parse(contenido);
    } catch (err) {
      console.log(`Error ! ${err}`);
    }
  }
/*Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.getall: Devuelve un array con los objetos presentes en el archivo.
 */
  async save(obj) {
    try {
      const objetos = await this.getAll();

      let nuevoId;

      if (objetos.length == 0) {
        nuevoId = 1;
      } else {
        nuevoId = objetos[objetos.length - 1].id + 1;
      }

      const nuevoObjeto = { id: nuevoId, ...obj };
      objetos.push(nuevoObjeto);

      await fs.promises.writeFile(this.archivo, JSON.stringify(objetos, null, 2));

      return nuevoId;
    } catch (error) {
      console.log("Error al guardar.");
    }
  }
/*Recibe un id y devuelve el objeto con ese id, o null si no está. */
  async getById(id) {
    try {
      const objetos = await this.getAll();
      const indexObj = objetos.filter((i) => i.id == id);

      if (indexObj == -1) {
        return "No se encontro el elemento.";
      } else {
        return indexObj;
      }
    } catch (error) {
      return "imposible mostrar.";
    }
  }
/*Elimina del archivo el objeto con el id buscado.*/
  async deleteById(id) {
    try {
      const objetos = await this.getAll();
      const indexObj = objetos.findIndex((i) => i.id == id);

      if (indexObj == -1) {
        return "No se encontro el elemento.";
      } else {
        objetos.splice(indexObj, 1);
        fs.promises.writeFile(this.archivo, JSON.stringify(objetos, null, 2));
      }
    } catch (error) {
      return "imposible eliminar.";
    }
  }
/*Elimina todos los objetos presentes en el archivo. */
  async deleteAll() {
    try {
      const objetos = await this.getAll();
      let largo = objetos.length;
      objetos.splice(0, largo);
      fs.promises.writeFile(this.archivo, JSON.stringify(objetos, null, 2));
    } catch (error) {
      return "imposible eliminar todos los objetos.";
    }
  }
}

// Creo el objeto a partir de la clase
const productos = new Contenedor("productos.txt");

module.exports = Contenedor;

/* 
//Funcion que invoca los metodos
async function Data() {
  //Agrego una producto 1
  console.log("agregando producto...");
  console.log(
    await productos.save({
      title: "Escuadra",
      price: 123.45,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      id: 1,
    })
  );
  //Agrego producto 2
  console.log("agregando producto...");
  console.log(
    await productos.save({
      title: "Calculadora",
      price: 234.56,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
      id: 2,
    })
  );
  //Agrego producto 3
  console.log("agregando producto...");
  console.log(
    await productos.save({
      title: "Globo Terráqueo",
      price: 345.67,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
      id: 3,
    })
  );
  //lista
  console.log("Listado de productos: ");
  console.log(await productos.getAll());
  //buscar por ID
  console.log("El producto solicitado: ");
  console.log(await productos.getById(1));
  //eliminar por ID 
  console.log("Eliminando el producto solicitado...");
  await productos.deleteById(2);
  //mostrando lista update
  console.log("Lista de productos actualizada");
  console.log(await productos.getAll());
  //borrar todo
  console.log("Eliminando todos los productos...");
  await productos.deleteAll();
  console.log(await productos.getAll());
}

Data();

*/