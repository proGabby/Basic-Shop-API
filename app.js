require('dotenv').config()
require('express-async-errors')


const express = require('express')
const app = express()

const connectDB = require('./src/db/db_connection')
const productsRouter = require('./src/routes/products_route')
const notFound = require('./src/middlewares/notfound')
const errorMiddleware = require('./src/middlewares/error-handler')



//middleware
app.use(express.json())


app.get("/",(req, res)=>{
    res.send("welcome here") 
})


app.use('/api/v1/products', productsRouter)

app.use(notFound)
app.use(errorMiddleware)

const PORT = process.env.PORT || 3001



const start = async()=>{
    try {
        
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,()=>{
            console.log(`server starting at port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()