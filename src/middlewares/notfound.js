const notFound = (req, res)=>{
    res.status(404).json({
        status: "page not found"
    })
}

module.exports = notFound