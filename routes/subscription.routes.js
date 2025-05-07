import {Router} from 'express'
import authorize from "../middleware/auth.middleware.js"
import { cancelSubscription, createSubscription, deleteSubscription, getUpcomingRenewals, getUserSubscriptions, updateSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();;

subscriptionRouter.get('/', (req,res) => res.send ({title: 'GET all subscriptions'}));

subscriptionRouter.post('/', authorize, createSubscription );

subscriptionRouter.put('/:id', authorize, updateSubscription);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/user/:id/cancel', authorize, cancelSubscription);

subscriptionRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals);

export default subscriptionRouter;