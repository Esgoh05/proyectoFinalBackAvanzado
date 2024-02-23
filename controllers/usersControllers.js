const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const crearUser = asyncHandler(async(request, response) => {

    const  {name, email, password, phone, esAdmin} = request.body

    //verificamos que nos pasen todos los datos necesarios para crear un usuario
    if(!name || !email || !password || !phone){
        response.status(400)
        throw new Error('Faltan datos')
    }

    //verificar usuario no exista a traves de su email
    const userExiste = await User.findOne({email: email}) 
    if(userExiste){
        response.status(400)
        throw new Error('Ese usuario ya existe en la base de datos')
    }

    //hacemos el HASH al password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    //crear el usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        esAdmin
    })


    if(user){
        response.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            esAdmin: user.esAdmin
        })
        
    } else{
        response.status(400)
        throw new Error('No se ha podido guardar los datos')
    }



})

const loginUser = asyncHandler(async(request, response) => {
    const {email, password} = request.body

    //verificar que un usuario exista con ese email
    const user = await User.findOne({email})

    //si el usuario existe, verificamos tambien el password
    if (user && (await bcrypt.compare(password, user.password))){
        response.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id) 
        })
    }else{
        response.status(400)
        throw new Error('Credenciales invalidas')
    }

})

const datosUser = asyncHandler(async(request, response) => {
    response.status(201).json(request.user)
})

//funcion para generar token
const generarToken = (id_usuario) => {
    return jwt.sign({id_usuario}, process.env.JWT_SECRET, {
        expiresIn: '15min'
    })
}

module.exports = {
    crearUser,
    loginUser,
    datosUser
}
