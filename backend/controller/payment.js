const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Stripe = require("stripe")





router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const myPayment = await stripe.paymentIntents.create({
      currency: "inr",
      amount: req.body.amount,
      metadata: {
        company: "bDev",
      },
    });


    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);


router.post("/create", async (req, res) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "cad",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
      stripeApikey: process.env.STRIPE_API_KEY,
    });
  })
);

module.exports = router