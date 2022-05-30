const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name field is required']
    },
    price: {
        type: Number,
        required: [true, 'product price is required']
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.0
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company:{
        type: String,
        // required:[true, 'provide company field'],
        enum: {
           values:  ['Nokia', 'Sony', 'Samsung', 'LG'],
           message: "{VALUE} is not supported",
        }
        //enum: ['Nokia', 'Sony', 'Samsung', 'LG']
    }
})

module.exports= mongoose.model('products', ProductSchema)
