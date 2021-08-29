import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAuth } from '../utils.js';

const userRouter = express.Router()

userRouter.get('/seed', 
    expressAsyncHandler(async (req, res) => {
    await User.remove({})
    const createdUsers = await User.insertMany(data.users)
    res.send({ createdUsers })
}))

userRouter.post('/signin', expressAsyncHandler(async (req, res) =>{
    const user = await User.findOne({ email: req.body.email })
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user.id,
                name: user.name,
                surname: user.surname,
                isAdmin: user.isAdmin,
                address: user.address,
                phone: user.phone,
                token: generateToken(user)
            })
            return
        }
    }
    res.status(401).send({ message: 'Niste ispravno uneli email ili lozinku! Molimo pokusajte ponovo'})
}))

userRouter.post('/register', expressAsyncHandler(async(req, res) => {
    const user = new User({
        name: req.body.name, 
        surname: req.body.surname,
        email: req.body.email, 
        password: bcrypt.hashSync(req.body.password, 8),
        address: req.body.address,
        phone: req.body.phone
    })
    const createdUser = await user.save()
    res.send({
        _id: createdUser.id,
        name: createdUser.name,
        surname: createdUser.surname,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        address: createdUser.address,
        phone: createdUser.phone,
        token: generateToken(createdUser)
    })
}))

userRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        res.send(user)
    }else{
        res.status(404).send({message: 'Korisnik nije pronadjen'})
    }
}))

userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.surname = req.body.surname || user.surname
        user.email = req.body.email || user.email
        user.address = req.body.address || user.address
        user.phone = req.body.phone || user.phone
        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
        const updatedUser = await user.save()
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            surname: updatedUser.surname,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            address: updatedUser.address,
            phone: updatedUser.phone,
            token: generateToken(updatedUser)
        })
    }
}))

export default userRouter