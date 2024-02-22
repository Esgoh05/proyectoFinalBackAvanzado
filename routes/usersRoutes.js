const express = require('express')
const router = express.Router()
const {crearUser, loginUser, datosUser} = require('../controllers/usersControllers')
const {protect} = require('../middleware/authMiddleware')


router.post('/registerUser', crearUser)
router.post('/login', loginUser)
router.get('/datosUsuarios',  protect, datosUser)

module.exports = router