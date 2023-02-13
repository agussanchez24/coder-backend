import express from 'express'
import { ProductManager } from "./ProductManager.js";

const productManager = new ProductManager('productos.json');
productManager.addProduct({titulo: 'producto prueba', descripcion: "este es un producto prueba", precio: 200, thumbnail: "sin imagen", codigo: "abc123", stock: 25 })
productManager.addProduct({titulo: 'producto prueba 2', descripcion: "este es un producto prueba", precio: 200, thumbnail: "sin imagen", codigo: "abc123", stock: 25 })


async function controladorProductos(req, res){
    if (req.query.limit === undefined){
        const productos = await productManager.getProducts()
        res.send(productos)
    } else {
        console.log('el limite es: ' + req.query.limit)
        res.send('el limite es: ' + req.query.limit)
        res.send(productManager.getProducts())
    }

    /* NO SÉ CÓMO LIMITAR LA CANTIDAD DE PRODUCTOS A DEVOLVER, PREGUNTAR!! */
}

async function controladorProductosPid(req, res) {
    let id = `${req.params.pid}`
    console.log('Buscando el producto con id: ' + id)
    const producto = await productManager.getProductById(id)
    res.send(producto)
}

const app = express()

app.get('/products', controladorProductos)
app.get('/products/:pid', controladorProductosPid)

const puerto = 8080

app.listen(puerto, () => { console.log('conectado')})


