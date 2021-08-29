import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import { isAdmin, isAuth } from '../utils.js'

const orderRouter = express.Router()

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const orders = await Order.find({}).populate('user', 'name surname')
    res.send(orders)
}))

orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req, res) =>{
    const orders = await Order.find({user: req.user._id})
    res.send(orders)
}))
orderRouter.post('/', isAuth,  expressAsyncHandler(async(req, res) => {
    if(req.body.orderItems.length === 0){
        res.status(400).send({ message: 'Korpa je prazna!'})
    } else{
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        })
        const createdOrder = await order.save()
        res.status(201).send({message: 'Nova porudzbina je kreirana', order: createdOrder})
    }
}))

orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        res.send(order)
    }else{
        res.status(404).send({message: 'Porudzbina nije pronadjena!'})
    }
}) )

orderRouter.put('/:id/pay', expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now()
        const updatedOrder = await order.save()
        res.send({ message: 'Porudzbina je placena!', order: updatedOrder})
    }else{
        res.status(404).send({message: 'Porudzbina nije pronadjena!'})
    }    
}))

orderRouter.put('/:id/deliver', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        order.status = "dostavljena"
        const updatedOrder = await order.save()
        res.send({message: 'Porudzbina je dostavljena', order: updatedOrder})
    }else {
        res.status(404).send({message: 'Porudzbina nije pronadjena!'})
    }
}))

orderRouter.put('/:id/cancel', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.status = "otkazana"
        const updatedOrder = await order.save()
        res.send({message: 'Porudzbina je otkazana', order: updatedOrder})
    }else {
        res.status(404).send({message: 'Porudzbina nije pronadjena!'})
    }
}))

export default orderRouter