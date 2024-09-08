const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')


const PORT = process.env.PORT || 8000
connectDB()
const app = express()

//Enable
var cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req,res) => {
    res.status(200).json({message: 'Hi there'})
})

app.use(errorHandler)

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/listName', require('./routes/listNameRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    // FIX: below code fixes app crashing on refresh in deployment
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
  
  }

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))