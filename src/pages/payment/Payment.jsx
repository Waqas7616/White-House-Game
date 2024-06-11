import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckOutForm';


const stripePromise = loadStripe('pk_test_51OFsq5Khg8ihd9dngFdDzkv0LjvCgxXY5NzL9eJSVeQoP24OUGwB2EAeXG6mmsaDqCgaR6oIrshXjRSH1hNXYCaE00zJQUAgbv');

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentPage;