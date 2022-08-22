const express = require('express');
const dns = require('dns');

const app = express()
const port = 8000

app.use(express.json())

app.post('/getmeip', (req, res) => {
    console.log(req.body.website)
    // fetch(`https://www.${req.body.website}/`).then(r => r.text()).then(data => {
    dns.lookup(req.body.website, (err, add) => {
        console.log(add)
        res.send(add)
    })

    // console.log(data)
    // })
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})