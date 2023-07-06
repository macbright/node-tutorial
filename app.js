const express = require('express');

const app = express();
const {products} = require('./express-tutorial/data')

app.get('/', (req, res) => {
    res.send('<h2> home page </h2> <a href="/api/products"> products </a>')
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name , image} = product
        return {id, name, image}
    })
    res.json(newProducts)
})

app.get('/api/products/:productID', (req, res) => {
    const { productID } = req.params;
    const singleProduct = products.find((product) => product.id === Number(productID))

    if(!singleProduct) {
        return res.status(404).send('product doest not exist')
    }
        
    res.json(singleProduct)
})

app.get('/api/v1/query', (req,res) => {
    // console.log(req.query)
    const {search, limit} = req.query
    let sortedProducts = [...products]
    if(search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }

    if(limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }

    res.status(200).json(sortedProducts)
    // res.send('hellow world')
})

app.listen(5000, ()=> {
    console.log('server is listening on port 5000')
})