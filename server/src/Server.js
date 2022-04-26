const colors = require('colors');
const express = require('express')
const morgan = require('morgan')
const usersRouter = require('./router/usersRouter');
const barangRouter = require('./router/barangRouter');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
require('dotenv').config()


const app = express()
const PORT = process.env.PORT || 5000

//cors
app.use(cors());

//read json
app.use(express.json())

// log req information
if (process.env.NODE_ENV === 'development') {
        app.use(morgan(`dev`))
}

//router
app.use('/users', usersRouter)
app.use('/barang', barangRouter)
app.use(errorHandler)


//main run server
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
