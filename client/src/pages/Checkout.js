import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from "react-redux";

const Checkout = () => {
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const state = useLocation();
  const payment = async (token) => {
    let data = await axios.post("http://localhost:8000/pay", {
      amount: state.state * 100,
      token: token,
    });
    console.log(data);
  };
  return (
    <div className="py-20 flex justify-center items-center">
      <StripeCheckout
        stripeKey="pk_test_51LXpmzBcfNkwYgIPXd3qq3e2m5JY0pvhaNZG7KSCklYpVyTCVGQATRH8tTWxDSYOnRTT5gxOjRVpUZmOWUEHnTxD00uxobBHkc"
        name="Bazar Online Shopping"
        amount={state.state * 100}
        label="Pay to bazar"
        description={`Your Payment amount is $${state.state}`}
        token={payment}
        email={userInfo.email}
      />
    </div>
  );
};

export default Checkout;
