const braintree = require('braintree');
const orderModel = require('../models/orderModel');

const gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId:process.env.BRAINTREE_MERCHANT_ID,
        publicKey:process.env.BRAINTREE_PUBLIC_KEY,
        privateKey:process.env.BRAINTREE_PRIVATE_KEY
})


// PAYMENT GATEWAY API
const braintreeTokenController = async(req,res)=>{

        try {
          gateway.clientToken.generate({},function(err,response){
                if(err){
                  return res.status(500).send({
                        success:false,
                        message:"Some error occured",
                        err
                   })
                }
                else{
                  return res.status(200).send({
                  success:true,
                  message:"successfull",
                  response

                    })    
                }
          })
                
        } catch (error) {
                
        }
}



const braintreePaymentController = async(req,res)=>{
     try {
        const {cart,nonce} = req.body;
        let total = 0;
        cart.map((i)=>{
                total += i.price;
        })

        let newTransaction = gateway.transaction.sale({
                amount:total,
                paymentMethodNonce:nonce,
                options:{
                    submitForSettlement:true    
                }
        },
        
        function(err,result){
            if(result){
               const order = new orderModel({
                  products:cart,
                  payment:result,
                  buyer:req.user._id
               }).save();

               res.status(200).send({
                 success:true,
                 message:"Payment Successfull",
                 order
               })
            }

            else{
                res.status(400).send({
                  success:false,
                  message:"Payment Unsuccessfull",                  
               })  
            }
        }
        
        )
        
     } catch (error) {
        console.log(error);
     }
}

module.exports = {braintreeTokenController,braintreePaymentController};