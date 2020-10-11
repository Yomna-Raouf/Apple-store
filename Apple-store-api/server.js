const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HQASMBHIi407WTNSd5ac6l9yj1A3j4zWqAtKSxC5oKRJTVAZiB9DpUKZovMV48s5I5OXLFdM9uBeKQn9q6bZQF500zLytZ5dS"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
app.listen( process.env.PORT || 4000, console.log(`listening at port ${ process.env.PORT || 4000 }`))

// Example endpoint
// http://localhost:5001/apple-store-16be0/us-central1/api
