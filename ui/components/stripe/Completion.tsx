"use client"
import { loadStripe } from '@stripe/stripe-js';
import {useEffect, useState} from 'react';
const stripePromise = loadStripe('pk_test_51Q9IkQFZBlDhUBAdoiAWPP7TRTcGitFSwt4b1eag3CjfflTE1HWTudNu9hnjhtHMcqlOTrLjhqjipZ0r3dp29BLY00P0n4F0cT');

function Completion() {
  const [ messageBody, setMessageBody ] = useState('');

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe: any) => {
      const url = new URL(window.location.toString());
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      setMessageBody(error ? `> ${error.message}` : (
        <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
      ) as any);
    });
  }, [stripePromise]);

  return (
    <>
      <h1>Thank you!</h1>
      <a href="/">home</a>
      <div id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div>
    </>
  );
}

export default Completion;