import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true,'Subscription Name is Required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required : [true,'Subscription Price is Required'],
        minLength: [0, 'Price must be greater than 0'],
    },

    currency: {
        type: String,
        enum: ['INR','USD',"EUR", "GBP"],
        default:'USD'
    },

    frequency : {
        type: String,
        enum: ['daily','weekly', 'monthly', 'yearly'],
    },

    category: {
        type: String,
        enum: ['sports','news','entertainment','lifestyle','technology','finance','politics','other'],
        required: true,
    },

    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },

    status : {
        type: String,
        enum: ['active','cancelled','expired'],
        default: 'active',
    },

    startDate : {
        type: Date,
        required: true,
        validate : {
            validator : (value) => value <= new Date(),
            message: 'Start date must be in the past'

        }
    },

    renewalDate: {
        type: Date,
        required: true,
        validate : {
            validator : function (value) { 
                return value > this.startDate; 
            },
            message : "Renewal Date must be after the start date",
        }
        
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,      //to get the id from user model
        ref : 'User',
        required : true,
        index: true,
    }
}, {timestamps: true});


const Subscription = mongoose.model('Subscription',subscriptionSchema);

export default Subscription;