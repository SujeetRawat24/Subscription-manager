import express from 'express';

import { PORT } from './config/env.js'

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();


//Built in middlewares :

app.use(express.json());                                //allows your app to handle json data sent in requests

app.use(express.urlencoded({extended: false}))          //to process the form data sent via html forms in a simple format

app.use(cookieParser());                                //reads cookies from incoming requests to store user data


//Using routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);


//Error handling middleware

app.use(errorMiddleware);


app.get('/',(req,res) => {
    res.send("Welcome to the Subscription tracker API");
} );

app.listen( PORT, async () => {
    console.log(`Subscription Tracker api is running on http://localhost:${PORT}`);

    await connectToDatabase();
})


export default app;



