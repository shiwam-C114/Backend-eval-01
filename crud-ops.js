const express = require('express')
const fs = require('fs');

const app = express()
const port = 8001

app.use(express.json())


let rawdata = fs.readFileSync('products.json');
let products = JSON.parse(rawdata);


//get req
app.get('/products', (req, res) => {
    let rawdata = fs.readFileSync('products.json');
    let products = JSON.parse(rawdata);
    console.log(products)
    res.send(products)
})

//post
app.post('/products/create', (req, res) => {

    let rawdata = fs.readFileSync('products.json');
    let products = JSON.parse(rawdata);
    console.log(...products.products)

    let obj = {
        products: [...products.products]
    }
    console.log(req.body)
    obj.products.push(req.body)
    // let data = JSON.stringify(student);
    fs.writeFileSync('products.json', JSON.stringify(obj));
    res.send("posted")
})

//put
app.put('/products/:id', (req, res) => {
    let rawdata = fs.readFileSync('products.json');
    let products = JSON.parse(rawdata);
    products = products.products
    console.log(req.body)
    let tempI = null
    let changeproducts = products.find((e, ind) => {
        if (e.id == req.params.id) {
            tempI = ind
            return e.id == req.params.id
        }
    })
    console.log(changeproducts, "44")
    changeproducts = { ...changeproducts, ...req.body }
    console.log(changeproducts, "46")
    products[tempI] = changeproducts

    let obj = {
        products: [...products]
    }
    // console.log(req.body)
    // obj.products.push(req.body)
    // let data = JSON.stringify(student);
    fs.writeFileSync('products.json', JSON.stringify(obj));
    res.send("posted")

    res.send(`put:${JSON.stringify(products)}`)
})


//del
app.delete('/products/:id', (req, res) => {
    let rawdata = fs.readFileSync('products.json');
    let products = JSON.parse(rawdata);
    products = products.products
    
    products = products.filter(e => e.id != req.params.id)
    let obj = {
        products: [...products]
    }
    // console.log(req.body)
    // obj.products.push(req.body)
    // let data = JSON.stringify(student);
    fs.writeFileSync('products.json', JSON.stringify(obj));
    res.send("posted")
    res.send('Got a DELETE request at /user')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})