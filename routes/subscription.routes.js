import {Router} from 'express'
import authorize from "../middleware/auth.middleware.js"
import { cancelSubscription, createSubscription, deleteSubscription, getSubscriptionDetails, getUpcomingRenewals, getUserSubscriptions, updateSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();;

subscriptionRouter.post('/', authorize, createSubscription );

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.get('/:id', authorize,getSubscriptionDetails);

subscriptionRouter.put('/:id', authorize, updateSubscription);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.put('/user/:id/cancel', authorize, cancelSubscription);

subscriptionRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals);

export default subscriptionRouter;