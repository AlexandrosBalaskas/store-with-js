const express = require('express');
const cors = require('cors')

const data = require('./data.js');
const app = express();

const dresses = data.products.slice(0,4)
const skirts = data.products.slice(8,10)
const trousers = data.products.slice(6,8)
const tops = data.products.slice(4,6)

const port = process.env.PORT || 4000 
app.use(cors());

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))

app.set('view engine','ejs')

app.get("/",(req,res) => {
    res.render("index")
})

app.get('/api/dresses', (req,res) => {
    res.send(dresses);
});

app.get('/api/skirts', (req,res) => {
    res.send(skirts);
});

app.get('/api/trousers', (req,res) => {
    res.send(trousers);
});

app.get('/api/tops', (req,res) => {
    res.send(tops);
});

app.get('/api/products', (req,res) => {
    res.send(data.products);
});


app.get('/api/products/:id', (req,res) => {
    res.send(data.products[req.params.id]);
});

app.listen(port);