const express = require('express')
const router = express.Router()

const {getAllProduct, createSingleProduct} = require('../controllers/product_controllers')

router.route('/').get(getAllProduct).post(createSingleProduct)

module.exports = router