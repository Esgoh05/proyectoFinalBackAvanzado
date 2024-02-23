const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())

connectDB()

const app = express()
app.use(express.urlencoded({extended:false}));

app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/products', require('./routes/productsRoutes'))
app.use('/api/orders', require('./routes/ordersRoutes'))

app.use(errorHandler)
app.listen(port, () => console.log(`Servidor inicializado en el puerto ${port}`))

