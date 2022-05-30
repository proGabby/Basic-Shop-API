require('dotenv').config()

const connectDB = require('./src/db/db_connection')
const ProductModel = require('./src/models/products_model')

const jsonProducts = require('./product.json')

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await ProductModel.deleteMany()
        await ProductModel.create(jsonProducts)
        console.log('process successful')
        process.exit(0)  //the process.exit() method instructs Node.js to terminate the process synchronously with an exit status of code
        
    } catch (error) {
        console.log(error)
        // process.exit(1)  // the process
    }
}

start()