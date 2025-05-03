import {Router} from 'express'
import { getUser, getUsers } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', (req,res) => res.send({title: 'Create a new User'}));

userRouter.put('/:id', (req,res) => res.send({title: 'Update a user'}));

userRouter.delete('/:id', (req,res) => res.send({title: 'Delete a user'}));

export default userRouter;