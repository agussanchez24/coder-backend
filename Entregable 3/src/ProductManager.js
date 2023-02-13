import fs from 'fs'

export class ProductManager {
    
    productos
    path

    constructor(path){
        this.productos = []
        this.path = path
    }

    addProduct({ titulo, descripcion, precio, thumbnail, codigo, stock}){
        if (this.productos.find(product => product.code === codigo)){
            return console.log("El código no puede repetirse")
        } else{
            const producto = new Product({ titulo, descripcion, precio, thumbnail, codigo, stock})
            producto.id = this.productos.length+1
            this.productos.push(producto)
            console.log("Producto creado exitosamente")
            const comoJson = JSON.stringify(this.productos)
            fs.promises.writeFile('productos.json', comoJson)
        }
    }

    async getProducts() {
        try{
            const comoJson = await fs.promises.readFile(this.path, 'utf-8')
            console.log(JSON.parse(comoJson))
            return comoJson
        } catch (error) {
            throw new Error('Error al obtener los productos')
        }
 
    }

    async getProductById(id){
        if (this.productos.find(product => product.id === id)){
            const producto = this.productos.find(product => product.id === id)
            const comoJson = JSON.parse(producto)
            return comoJson
        } else{
            return console.log("No existe el producto")
        }
    }

    updateProduct(array, id, camposYValores){
        const obj = array.find(p => p.id === id)
        for (const key in camposYValores){
            if (Object.hasOwnProperty.call(camposYValores, key)) {
                obj[key] = camposYValores[key]
            }
        }
    }


    deleteProduct(id){
        if (this.productos.find(product => product.id === id)){
            this.productos.splice((this.productos.findIndex(product => product.id === id)),1)
            console.log("Producto eliminado")
        } else {
            console.log("No fue posible eliminar el producto")
        }
    }


}

class Product {

    id
    titulo
    descripcion
    precio
    thumbnail
    codigo
    stock

    constructor({titulo, descripcion, precio, thumbnail, codigo, stock}) {

        if (titulo == undefined) {
            throw new Error('El titulo es un campo obligatorio')
        }
        if (descripcion == undefined) {
            throw new Error('La descripcion es un campo obligatorio')
        }
        if (precio == undefined) {
            throw new Error('El precio es un campo obligatorio')
        }
        if (thumbnail == undefined) {
            throw new Error('El thumbnail es un campo obligatorio')
        }
        if (codigo == undefined) {
            throw new Error('El codigo es un campo obligatorio')
        }
        if (stock == undefined) {
            throw new Error('El stock es un campo obligatorio')
        }

        this.titulo = titulo
        this.descripcion = descripcion
        this.precio = precio
        this.thumbnail = thumbnail
        this.codigo = codigo
        this.stock = stock
    }


}


// ----------------------- T E S T I N G ----------------------- 
/*const productManager = new ProductManager('./productos.json')
productManager.getProducts()
productManager.addProduct({titulo: 'producto prueba', descripcion: "este es un producto prueba", precio: 200, thumbnail: "sin imagen", codigo: "abc123", stock: 25 })
productManager.addProduct({titulo: 'producto prueba 2', descripcion: "este es un producto prueba", precio: 200, thumbnail: "sin imagen", codigo: "abc123", stock: 25 })

productManager.getProducts()
productManager.getProductById(2)
productManager.deleteProduct(1)
productManager.getProducts()*/
