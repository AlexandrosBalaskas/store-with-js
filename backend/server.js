const express = require('express');
const cors = require('cors')

const data = require('./data.js');
const app = express();



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

app.get('/api/products', (req,res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req,res) => {
    res.send(data.products[req.params.id]);
});

app.listen(port);