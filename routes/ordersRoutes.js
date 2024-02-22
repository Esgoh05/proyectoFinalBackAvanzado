const express = require('express')
const router = express.Router()
const {crearOrder, getOrder} = require('../controllers/ordersControllers')
const {protect} = require('../middleware/authMiddleware')


router.post('/registerOrder', protect, crearOrder)
router.get('/obtenerOrdenes',  protect, getOrder)


module.exports = router