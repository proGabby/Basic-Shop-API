const mongoose = require('mongoose')

const connectDB = (dbUri)=>{
    return mongoose.connect(dbUri).then(()=>{
        console.log('db connected')
    })
}

module.exports = connectDB