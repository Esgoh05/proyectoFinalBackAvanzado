const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }, 
    nameProduct: {
        type: String,
        required: [true, 'Por favor teclea el nombre del producto']
    },
    description: {
        type: String,
        required: [false, 'Por favor teclea una descripcion para el producto'],
    },
    price: {
        type: String,
        required: [true, "Por favor teclea el precio del producto"]
    },
    category: {
        type: String,
        required: false
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    sku: {
        type: String,
        required: [true, 'Por favor, ingresa el SKU del producto'],
        unique: true
    },
    deleted: { type: Boolean, default: false } // Campo para el borrado lógico
}, {
    timestamps: true //crea campos createdAt y updatedAt
})

module.exports = mongoose.model('Product', productSchema)