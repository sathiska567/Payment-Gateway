import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import DropIn from 'braintree-web-drop-in-react';
// import {DropIn} from 'braintree-web-drop-in-react';

export default function App() {
  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState('');

  const getToken = async () => {
    try {
      const token = await axios.get('http://localhost:8080/api/v1/payment-gateway/braintree/token');
      console.log(token);
      setClientToken(token.data.response.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      console.log('Payment nonce:', nonce);
      // Add logic to send the nonce to your server for payment processing
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      {/* <DropIn
        options={{
          authorization: clientToken,
          paypal: {
            flow: 'vault',
          },
        }}
        onInstance={(instance) => setInstance(instance)}
      /> */}

      <button onClick={handlePayment}>Make Payment</button>
    </>
  );
}
