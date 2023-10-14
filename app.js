require('dotenv').config()
require('express-async-errors')

const express = require('express');
const app = express();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const productsRouter = require('./routes/products');
const connectDB = require('./db/connect');



//Middleware
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.port || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening to ${port}...`))
    } catch (error) {
        console.log(error)
    }
}


start();