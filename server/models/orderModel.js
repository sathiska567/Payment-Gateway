const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
        products :[{
          type:mongoose.ObjectId,
          ref:'Product'
        }],

        payment:{},

        buyer:{
          type:mongoose.ObjectId,
          ref:'User'
        },

        status:{
           type:String,
           default:"Not processed",
           enum:["Not processed","Processing","shipped","delivered","cancel"]      
        }
},{timestamps:true})


const Order = mongoose.model('Order',orderSchema);
module.exports = Order;