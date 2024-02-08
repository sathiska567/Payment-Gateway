const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');


require("./db/db")


const paymentGatewayRoute = require("./router/paymentGatewayRoute")


// CREATE A EXPRESS APP
const app = express();


app.use(bodyParser.json());
app.use(cors())


app.use("/api/v1/payment-gateway",paymentGatewayRoute)

// SET PORT
const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})