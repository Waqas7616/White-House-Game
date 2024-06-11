import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import CustomSpinner from '../../components/spinner';
import theme from '@material-tailwind/react/theme';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1); // Example amount, you can change this as needed
  const [cardBrand,setCardBrand]=useState(null)
const token=localStorage.getItem('token');



  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe has not loaded correctly.");
      setLoading(false);
      return;
    }

    try {
      await handleCardPayment();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleCardPayment = async () => {
    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: { name },
    });

    if (error) {
      throw new Error(error.message);
    }

    try {
      const response = await axios.post('https://thewhitehousegame.com/public/api/processPayment',
        {
          payment_method_id: paymentMethod.id,
          amount: amount,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        const clientSecret = response.data.client_secret;
        console.log('Client Secret:', clientSecret); // Log the client secret

        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

        if (paymentIntent.status === 'succeeded') {
          console.log('Payment already succeeded!');
          return; // Payment already succeeded, no need to confirm again
        }

        const { error: confirmError } = await stripe.confirmCardPayment(clientSecret);

        if (confirmError) {
          console.error('Error confirming payment:', confirmError); // Log full error details
          throw new Error(confirmError.message);
        } else {
          console.log('Payment successful!');
        }
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error); // Log full error details
      throw new Error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };
  const OPTIONS = {
    showIcon: true,
    appearance:{
        theme:'flat',
        variables:{
            colorText:'#fff',
            colorPrimary:'#ffc101'
        }
    }
  };
  return (
    <div className='m-auto w-10/12'>
<h1></h1>
    <div className="bg-[#131a41] w-[30rem] m-auto">
      <form className="checkout-form px-5 py-12  m-auto flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* <div className="form-group">
          <label className="text-white poppins5 block mb-3">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div> */}
         <div className="form-group ">
          <label className="text-white poppins5 block mb-3">Card Number:</label>
          <CardNumberElement options={OPTIONS} style={{ color: '#fff' }} className="form-control bg-[#1c2452] w-full py-4 px-2 !text-white rounded-lg border-[1px] border-[rgba(255,255,255,0.6)]" />
        </div>
        <div className="form-group">
          <label className="text-white poppins5 block mb-3">Amount (in cents):</label>
          <input
          
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="form-control bg-[#1c2452] w-full py-3 px-2 !text-white rounded-lg border-[1px] border-[rgba(255,255,255,0.6)]"
            disabled
          />
        </div>
       {cardBrand&&(
        <img src={`https://js.stripe.com/v3/fingerprintjs/assets/powered_by_stripe_${cardBrand}.svg`} alt="" />
       )}
        <div className="form-group">
          <label className="text-white poppins5 block mb-3">Expiry Date:</label>
          <CardExpiryElement  className="form-control bg-[#1c2452] w-full py-4 px-2 !text-white rounded-lg border-[1px] border-[rgba(255,255,255,0.6)]" />
        </div>
        <div className="form-group">
          <label className="text-white poppins5 block mb-3">CVV:</label>
          <CardCvcElement className="form-control bg-[#1c2452] w-full py-4 px-2 text-white rounded-lg border-[1px] border-[rgba(255,255,255,0.6)]" />
        </div>
        {error && <div className="text-redish poppins4">{error}</div>}
        {loading?
        <div className='w-fit m-auto'><CustomSpinner/></div>
        :
        <button type="submit" disabled={!stripe || loading} className="bg-redish py-3 rounded-md text-white poppins5">
        Pay
      </button>}
        
      </form>
    </div>
    </div>
  );
};

export default CheckoutForm;