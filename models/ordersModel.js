const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    customer: {  // Información del cliente que realizó el pedido
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Modelo de usuario al que hace referencia
        required: true
    },
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    nameProduct: {
        type: String,
        required: [true, 'Por favor, ingresa el nombre del producto'],
    },
    quantity: {
        type: Number,
        required: true
    },
    totalAmount: {  // Monto total del pedido
        type: Number,
        required: false
    },
    statusOrder: {  // Estado del pedido (por ejemplo, pendiente, enviado, entregado, etc.)
        type: String,
        enum: ['pending', 'shipped', 'delivered'],  // Valores permitidos
        default: 'pending'
    },
    createdAt: {  // Fecha de creación del pedido
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', orderSchema)
