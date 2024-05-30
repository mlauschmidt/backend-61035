const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const productRouterFn = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const viewsRouter = require('./routes/viewsRouter');
const errorHandler = require('./middlewares/errorHandler');
const socketServer = require('./utils/io');
const initMongoDB = require('./dao/mongo/connection');

//CONFIGURACION EXPRESS
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//CONFIGURACION MORGAN
app.use(morgan('dev'));

//CONFIGURACION HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//CONEXION A LA BASE DE DATOS
initMongoDB();

//CONFIGURACION WEBSOCKETS
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Server escuchando en puerto ${PORT}`)); 

const io =  socketServer(httpServer);

//CONFIGURACION ROUTES
app.use('/', viewsRouter);
const productRouter = productRouterFn(io);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use(errorHandler);
