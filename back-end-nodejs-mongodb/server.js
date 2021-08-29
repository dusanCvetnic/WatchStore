import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import dialogflowRouter from './routers/dialogflowRouter.js';

dotenv.config()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const connection_url = 'mongodb+srv://admin:z35NUBxK4LTaMJUV@icrcluster.s31h0.mongodb.net/satovidb?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

//Koriscenje ruta
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/chatbot', dialogflowRouter)

app.get('/', (req, res) =>{
    res.send('Server radi!')
})

app.use((err, req, res, next) =>{
  res.status(500).send({message: err.message})
})

const port = process.env.PORT || 5000

app.listen(port, ( ) =>{
    console.log(`Server radi na http://localhost:${port}`)
})