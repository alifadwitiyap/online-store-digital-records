require('dotenv').config()
const colors = require('colors');
const express = require('express')
const morgan = require('morgan')

const app= express()
const PORT = process.env.PORT || 5000





app.use(express.json())

if (process.env.NODE_ENV === 'development'){
    app.use(morgan(`dev`))
}

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgBrightYellow.bold))
