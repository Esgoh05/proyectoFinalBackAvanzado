const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor teclea tu nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor teclea tu email'],
        unique: true
        
    },
    password: {
        type: String,
        required: [true, "Por favor teclea tu password"]
    },
    esAdmin: {
        type: Boolean,
        required: [false],  //en el caso de no colocarlo se asume que es falso
        default: false,
    }
}, {
    timestamps: true //crea campos createdAt y updatedAt
})

module.exports = mongoose.model('User', userSchema)