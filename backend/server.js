const express = require('express');
const cors = require('cors')

const data = require('./data.js');
const app = express();
const port = 4000;
app.use(cors());

app.get('/api/products', (req,res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req,res) => {
    res.send(data.products[req.params.id]);
});

app.listen(process.env.PORT || port);