const {v4 :uuidv4 } = require('uuid');
const express = require ('express');
const { readSync } = require('fs');
const app = express();
const path = require('path')


app.use(express.json());
app.use(express.urlencoded({extended:true}));

const products = require('./model/product')
const PORT = 3000;



// app to read
 app.get('/', (req,res) => {
     res.json(products)
 })
// app to identify product by id

 app.get('/product/:id', (req,res) =>{
     const found = products.find(product =>product.id === parseInt(req.params.id))
     if(found){
         res.jsonp(products.find(product =>product.id === parseInt(req.params.id)))
     }
     else{ 
         res.status(404).send(`product not found with id :${parseInt(req.params.id)}`)
     }
    })
     // post data

app.post('/product', (req, res) =>{

    const newProduct = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price
    }
    products.push(newProduct);
    res.json(products)
});

app.put('/product/:id', (req,res) =>{
    const found = products.find(product =>product.id === parseInt(req.params.id))
    if (found) {
        const updProduct = req.body;
        products.forEach(product => {
            if (product.id === parseInt(req.params.id)) {
                product.name = updProduct.name ? updProduct.name:product.name;
                product.description = updProduct.description ? updProduct.description:product.description;
                product.image = updProduct.image ? updProduct.image:product.image;
                product.price = updProduct.price ? updProduct.price:product.price;

                res.json({msg:'product updated', product});
            }
        })
    }
    else{ 
        res.status(400).send(`product not found with id :${parseInt(req.params.id)}`)
    }
   });


   app.delete('/product/:id', (req,res) =>{
    const found = products.some(product =>product.id === parseInt(req.params.id))
    if(found){
        res.json({msg: 'product deleted',products:products.filter(product =>product.id !== parseInt(req.params.id))})
    }
    else{ 
        res.status(404).send(`product not found with id :${parseInt(req.params.id)}`)
    }
   })
   


app.listen(PORT, ()=>{
    console.log(`server starting on port http://127.0.0.1:${PORT}`);
})