const asyncHandler = require('express-async-handler')
const Order = require('../models/ordersModel')
const Product = require('../models/productsModel')



const crearOrder = asyncHandler( async(request, response) => {
    let precioTotal

    const  {sku, quantity} = request.body

    //verificamos que nos pasen todos los datos necesarios para crear un usuario
     if(!sku || !quantity){
        response.status(400)
        throw new Error('Faltan datos')
    }

    const producto = await Product.findOne({ sku });
    console.log(producto)
    console.log(sku)

    // Verifica si se encontró el producto y si tiene el campo price
    if (producto && producto.price) {
        // Devuelve el precio del producto y calcula la cantidad a pagar
        //console.log(producto.price)
        precioTotal = quantity * producto.price
        //console.log(precioTotal)
    } else {
        return response.status(404).json({ message: 'Producto no encontrado' }); // Devuelve un mensaje si el producto no se encontró
    }


    const order = await Order.create({
        nameProduct: producto.nameProduct,
        quantity,
        totalAmount: precioTotal,
        customer: request.user.id,
        orderNumber: generateOrderNumber()
    })

    if(order){
        response.status(201).json({
            _id: order._id,
            orderNumber: order.orderNumber,
            nameProduct: order.nameProduct,
            quantity: order.quantity,
            totalAmount: order.totalAmount,
            statusOrder: order.statusOrder,
            createdAt: order.createdAt
        })
        
    } else{
        response.status(400)
        throw new Error('No se ha podido guardar los datos')
    }

})

const getOrder = asyncHandler( async(request, response) => {
    const ordenes = await Order.find({customer: request.user.id})

    response.status(200).json(ordenes)
})

const generateOrderNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0'); 
    const hour = String(now.getHours()).padStart(2, '0'); 
    const minute = String(now.getMinutes()).padStart(2, '0'); 
    const second = String(now.getSeconds()).padStart(2, '0'); 
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0'); 
    const randomNumber = Math.floor(Math.random() * 1000); 

    return `${year}${month}${day}${hour}${minute}${second}${milliseconds}${randomNumber}`;
}


module.exports = {
    crearOrder,
    getOrder 
};