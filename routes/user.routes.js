import {Router} from 'express'

const userRouter = Router();

userRouter.get('/', (req,res) => res.send({title: 'Get all users'}));

userRouter.get('/:id', (req,res) => res.send({title: 'Get User Details'}));

userRouter.post('/', (req,res) => res.send({title: 'Create a new User'}));

userRouter.put('/:id', (req,res) => res.send({title: 'Update a user'}));

userRouter.delete('/:id', (req,res) => res.send({title: 'Delete a user'}));

export default userRouter;