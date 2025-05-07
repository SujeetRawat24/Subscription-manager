import Subscription from "../models/subscription.model.js"

export const createSubscription = async (req, res, next) => {
    try {
            const subscription = await Subscription.create({
                ...req.body,
                user: req.user._id,
            });       
        
        res.status(201).json({success: true, message: "Subscription created successfully", data: subscription});

    } catch (error) {
        next(error);
    }
}

 export const getUserSubscriptions = async (req, res, next) => {
    try {
            if(req.user.id !== req.params.id) {                                      //checks if the user is the same as the one in the token 
            const error = new Error('You are not the owner of this account');
            error.status =401;
            throw error;
        }      
        
        const subscriptions = await Subscription.find({user: req.params.id});

        res.status(200).json({success: true, data : subscriptions})

    } catch (error) {
        next(error);
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
      const subscription = await Subscription.findById(req.params.id);
  
      if (!subscription) {
        const error = new Error("Subscription not found");
        error.status = 404;
        throw error;
      }
  
      // Authorization check
      if (subscription.user.toString() !== req.user.id) {
        const error = new Error("Unauthorized to update subscription");
        error.status = 403;
        throw error;
      }
  
      // Update fields (exclude protected fields like user ID)
      const allowedUpdates = ["name", "price", "currency", "frequency", "category", "paymentMethod", "status", "startDate"];
      const updates = Object.keys(req.body);
      
      const isValidUpdate = updates.every(update => 
        allowedUpdates.includes(update)
      );
  
      if (!isValidUpdate) {
        const error = new Error("Invalid update fields");
        error.status = 400;
        throw error;
      }
  
      // Apply updates and save (triggers pre-save hook)
      updates.forEach(update => subscription[update] = req.body[update]);
      await subscription.save();
  
      res.status(200).json({ success: true, message: "Subscription updated", data: subscription });
    } catch (error) {
      next(error);
    }
  };

  export const deleteSubscription = async (req, res, next) => {
    try {
      const subscription = await Subscription.findById(req.params.id);
  
      if (!subscription) {
        const error = new Error("Subscription not found");
        error.status = 404;
        throw error;
      }
  
      // Authorization check
      if (subscription.user.toString() !== req.user.id) {
        const error = new Error("Unauthorized to delete subscription");
        error.status = 403;
        throw error;
      }
  
      await Subscription.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: "Subscription deleted" });
    } catch (error) {
      next(error);
    }
  };
  
  export const cancelSubscription = async (req, res, next) => {
    try {
      // Verify user owns the account
      if (req.user.id !== req.params.id) {
        const error = new Error("Unauthorized to cancel subscriptions");
        error.status = 403;
        throw error;
      }
  
      // Cancel all active subscriptions for this user
      const result = await Subscription.updateMany(
        { user: req.params.id, status: "active" },
        { $set: { status: "cancelled" } }
      );
  
      res.status(200).json({ 
        success: true, 
        message: "Subscriptions cancelled",
        data: result 
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getUpcomingRenewals = async (req, res, next) => {
    try {
      const today = new Date();
      const next30Days = new Date(today.setDate(today.getDate() + 30));
  
      // Get active subscriptions renewing in the next 30 days
      const subscriptions = await Subscription.find({
        user: req.user.id,
        status: "active",
        renewalDate: {
          $gte: new Date(),       // Renewal date >= today
          $lte: next30Days        // Renewal date <= next 30 days
        }
      }).sort({ renewalDate: 1 }); // Sort by nearest renewal
  
      res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
      next(error);
    }
  };


