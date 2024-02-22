const express = require('express')
const router = express.Router()
const {crearProduct, getProducts, updateProductos, deleteProducto} = require('../controllers/productsControllers')
const {protect} = require('../middleware/authMiddleware')


router.post('/registerProduct', protect, crearProduct)
router.get('/datosProductos',  protect, getProducts)
router.route('/:id').put(protect, updateProductos).delete(protect, deleteProducto)


module.exports = router