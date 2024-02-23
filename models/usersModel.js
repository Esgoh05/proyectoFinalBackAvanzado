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
    phone: {
        type: String,
        required: [true, "Por favor teclea tu telefono"],
        validate: {
            validator: function(v) {
                // Validar si el número de teléfono tiene exactamente 10 dígitos
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} no es un número de teléfono válido. Debe tener exactamente 10 dígitos.`
        }
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