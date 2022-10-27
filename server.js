//contenedor
const Contenedor = require("./contenedor");
const fs = require("fs");

//express
const express = require('express')
const app = express()


const PORT = 8080;

const contenedor = new Contenedor('productos.txt');


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
 server.on("error", error => console.log(`Error en servidor ${error}`))


//Contenedor
app.get('/', (req, res) => {
   res.send("Hola!¿Qué tal?")
 });

//Productos todos
app.get('/productos', async(req, res) => {
   const productos = await contenedor.getAll();

   res.send(productos);
});

//Producto Random
app.get('/productoRandom', async(req, res) => {
   const maxId = 3; //tengo solo 4 productos con id de 1 a 4
   const idRandom = Math.floor(Math.random() * maxId);
   const producto = await contenedor.getById(idRandom);

   res.send(producto);
 });



