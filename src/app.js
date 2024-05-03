const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server escuchando en puerto ${PORT}`)); 