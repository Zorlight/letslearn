"use client"
import {useEffect, useState} from 'react';

import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js';
import { METHODS } from 'http';
import GLOBAL from '@/global';

const stripePromise = loadStripe('pk_test_51Q9IkQFZBlDhUBAdoiAWPP7TRTcGitFSwt4b1eag3CjfflTE1HWTudNu9hnjhtHMcqlOTrLjhqjipZ0r3dp29BLY00P0n4F0cT');

function Payment() {
  const [ clientSecret, setClientSecret ] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(GLOBAL.API_URL + "/v1/stripe/payment", {
        method: "POST",
    })
      .then((res) => res.json())
      .then(({clientSecret}) => setClientSecret(clientSecret));
  }, []);


  return (
    <>
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;