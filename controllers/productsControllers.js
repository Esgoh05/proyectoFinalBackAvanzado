
const asyncHandler = require('express-async-handler')
const Product = require('../models/productsModel')

const getProducts = asyncHandler( async(request, response) => {
    const user = request.user; // Suponiendo que request.user contiene la información del usuario actual
    if (user && user.esAdmin) {
        console.log('El usuario es un administrador');
        const productos = await Product.find({user: request.user.id})

        response.status(200).json(productos)

    } else{
        console.log('El usuario no es un administrador');
        response.status(400)
        throw new Error('El usuario no es un administrador')
    }

})

const crearProduct = asyncHandler( async(request, response) => {
    let product

    const  {nameProduct, description, price, category, stock, sku} = request.body

    //verificamos que nos pasen todos los datos necesarios para crear un usuario
     if(!nameProduct || !price || !sku){
        response.status(400)
        throw new Error('Faltan datos')
    }

    // Verificar si el usuario es un administrador
    const user = request.user; // Suponiendo que request.user contiene la información del usuario actual
    if (user && user.esAdmin) {
        console.log('El usuario es un administrador');

        product = await Product.create({
            nameProduct,
            description,
            price,
            category,
            stock,
            sku,
            user: request.user.id
        })

        if(product){
            response.status(201).json({
                _id: product._id,
                nameProduct: product.nameProduct,
                price: product.price,
                category: product.category
            })
            
        } else{
            response.status(400)
            throw new Error('No se ha podido guardar los datos')
        }
    

    } else {
        console.log('El usuario no es un administrador');
        response.status(400)
        throw new Error('El usuario no es un administrador')
    }


})

const updateProductos = asyncHandler( async(request, response) => {
    const producto = await Product.findById(request.params.id)

    if(!Product){
        response.status(404)
        throw new Error('El producto no existe')
    }

    const user = request.user; // Suponiendo que request.user contiene la información del usuario actual
    if (user && user.esAdmin) {
        const productoUpdated = await Product.findByIdAndUpdate(request.params.id, request.body, {new: true})

        //response.status(200).json(productoUpdated)
        if(productoUpdated){
            response.status(200).json(productoUpdated)
        } else{
            response.status(400)
            throw new Error('No se ha podido mostrar la informacion')
        }
    }else{
        console.log('El usuario no es un administrador');
        response.status(400)
        throw new Error('El usuario no es un administrador')
    }

})


const deleteProducto = asyncHandler(async (request, response) => {
    const productId = request.params.id;

    // Buscar el producto por ID
    const product = await Product.findById(productId);

    if (!product) {
        response.status(404);
        throw new Error('Ese producto no existe');
    }

    // Verificar si el usuario es un administrador
    const user = request.user; // Suponiendo que request.user contiene la información del usuario actual
    if (user && user.esAdmin) {
        // Actualizar el producto para marcarlo como eliminado
        const updatedProduct = await Product.findByIdAndUpdate(productId, { deleted: true }, { new: true });
        if (!updatedProduct) {
            throw new Error('Producto no encontrado');
        }
        response.status(200).json({ message: 'Producto eliminado correctamente' });
    } else {
        console.log('El usuario no es un administrador');
        response.status(403);
        throw new Error('El usuario no es un administrador');
    }
});

module.exports = {
    getProducts,
    crearProduct,
    updateProductos,
    deleteProducto
}