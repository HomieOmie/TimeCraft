require('dotenv').config()

const express = require('express') 
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// Create and store express app
const app = express()

// Logging requests in Console
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/workouts', workoutRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DB. \nListening on Port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.error(`Error connecting to DB: ${error}`)
    })

process.env