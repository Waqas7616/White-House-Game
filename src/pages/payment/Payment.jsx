import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckOutForm';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';


const stripePromise = loadStripe('pk_live_51POuskFVvAnlzktrIL05dogBXeZqSYXht17JwzTvojaV5PaRpDYYgGLloTKtlChSABFaIpcxvDKy0pYebaqA5lk200mnoJ1ViQ');

const PaymentPage = () => {
  const location=useLocation();
  const {data}=location.state || {};
  console.log('jjj3',data)
  useEffect(()=>{
    ReactGA.send({
      hitType:'pageview',
      path:window.location.pathname
    });
      },[])
  
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm path={data.message}/>
    </Elements>
  );
};

export default PaymentPage;