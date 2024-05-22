// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51MqGZlHTmGj5Wyovfhm6boql6vfTCiLs0m9LpCKgZ6mvltOoMS9ybEcdbeFvVROLI2JC38Db9kMS0tz3JIuhQK5Z001Ma9dAH0"
);
const express = require("express");
const app = express();
app.use(express.static("public"));
const bodyParser = require("body-parser");
const User = require("../models/user.model");
const Tester = require("../models/tester.model");
const { sendEmail } = require("../middlewares/mail.middleware");

// Add middleware to parse incoming request bodies

const YOUR_DOMAIN = "http://localhost:3000";

const stripePayment = async (req, res) => {
  const userId = req.userId;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1MqGiJHTmGj5WyovLbfQtIrp",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    metadata: {
      userId: userId,
    },
    payment_intent_data: {
      metadata: {
        userId: userId,
      },
    },
  });
  console.log("1", session);

  res.redirect(303, session.url);
};

const endpointSecret =
  "whsec_aa6e74acff9d46da6694fb845f98b64f3df5642b944b9fb4552ca419177afce9";

const stripeUpdate = async (request, response) => {
  const event = request.body;
  const session = event.data.object;
  console.log(session);
  try {
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const metadata = session.metadata;
        console.log("checkout", metadata);
        break;
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        const paymentIntentMetadata = paymentIntent.metadata;
        console.log("payment_intent", paymentIntentMetadata);
        const user = await User.findById(paymentIntentMetadata.userId);
        if (user) {
          user.balance = user.balance + paymentIntent.amount / 100;
          user.notifications.push({
            message: `You Added ${paymentIntent.amount / 100}$ to your balance`,
          });
          sendEmail(
            user.email,
            `You Added ${paymentIntent.amount / 100}$ to your balance`
          );
          const newUser = await user.save();
          console.log(newUser);
        } else {
          const tester = await Tester.findById(paymentIntentMetadata.userId);
          tester.balance = tester.balance + paymentIntent.amount / 100;
          const newCompany = await tester.save();
          console.log(newCompany);
        }
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );
        console.log("sub", subscriptionId);
        await stripe.subscriptions.del(subscriptionId);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("PaymentMethod was attached to a Customer!");
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {}

  // Return a 200 response to acknowledge receipt of the event
  response.json({ received: true });
};

module.exports = { stripePayment, stripeUpdate };
