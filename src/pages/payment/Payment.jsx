import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckOutForm';
import ReactGA from 'react-ga4'


const stripePromise = loadStripe('pk_test_51OFsq5Khg8ihd9dngFdDzkv0LjvCgxXY5NzL9eJSVeQoP24OUGwB2EAeXG6mmsaDqCgaR6oIrshXjRSH1hNXYCaE00zJQUAgbv');

const PaymentPage = () => {
  useEffect(()=>{
    ReactGA.send({
      hitType:'pageview',
      path:window.location.pathname
    });
      },[])
  
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentPage;