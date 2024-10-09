import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLoggedIn } from '../UserContext';
import { CircularProgress } from '@chakra-ui/react';
import { useSelectedSeats } from '../SeatsContext';


function Payment() {
    const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const {accessToken} = useLoggedIn();
  const {selectedSeats} = useSelectedSeats();

  useEffect(() => {console.log("Selected Seats from Payment: ", selectedSeats)}, [selectedSeats]);
  console.log(accessToken);
  localStorage.setItem('accessToken', accessToken);

  

  useEffect(() => {
    fetch("http://localhost:9002/movies/payments/config", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:9002/movies/payments/create-payment-intent", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <h1>Payment Informations</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {loading ? ( 
          <CircularProgress isIndeterminate color='green.300'/>
        ) : (
          clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )
        )}
      </div>
    </div>
  );
}

export default Payment
