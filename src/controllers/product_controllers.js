const productModel = require('../models/products_model')

const getAllProduct = async (req, res)=>{
    //console.log(req.query)
    //decontructing the query
    const {name, featured, company, sort, field, numericFilters} = req.query

    let queryObject = {}

     //implementing a numeric filter mechanism
     if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        
        //A regular Expression search pattern
        const regEx = /\b(<|>|>=|=|<|<=)\b/g   //.../b find match at the beginning.... (a|b)find any alternative ......g is a modifier that performs global search
        
        //replace any char in numericfilters that matching our regEx with -${operatorMap[matchValue]
        let filters = numericFilters.replace(regEx,
            (matchValue)=> `-${operatorMap[matchValue]}-`
        )

        console.log(filters)

        const options = ['price','rating']; //only numeric value available to filter
        filters = filters.split(',').forEach((item) => {
            const [field,operator,value] = item.split("-")

            if(options.includes(field)){
                queryObject[field] = { [operator]: Number(value)}
               // console.log(queryObject)
            }

        });

    }


    //if name exist, assign name as property of queryobject 
    if(name){

        queryObject.name = {$regex: name, $options: "i"} //i options signifies case insentivity
    }

    //assign feature as property of queryobject 
    if(featured){
        queryObject.featured = featured==="true"?true:false
    }
    
    if(company){
        queryObject.company = company
    }
    
    //fetch the data base on the properties of queryObject... it will fetch all if queryObject is empty
            // const products = await productModel.find(queryObject)
    let result =  productModel.find(queryObject); 
    
    //implement sorting
    if(sort){
        //if user provide multiple sorting parameters, slit and put in a signle array without a , seperating
        const sortedList  = sort.split(",").join(' ')
        result = result.sort(sortedList) //to enable sorting, the sort method must to chain to the find method
    }else{
        //set a default sorting pattern
        result=result.sort('createdAt') //createdAt is a prop in our model 
    }

    //implement selecting
    if(field){
        const fieldList = field.split(",").join(' ')
        result = result.select(fieldList)
    }

   
    //number of
    const page = Number(req.query.page) || 1

    //number of data per page
    const limit = Number(req.query.limit) || 20

    const skip = (page-1)*limit //logic to determine how many item will be skipped to get the required page queried by the user

    result = result.skip(skip).limit(limit)

    
    const products = await result
    res.status(200).json({data: products, hbHits: products.length})
}

const createSingleProduct = async(req,res)=>{
    //create the  model on the db
    const product = await productModel.create(req.body)

    res.status(201).json({data: product})
}

module.exports = {
    getAllProduct,
    createSingleProduct
}