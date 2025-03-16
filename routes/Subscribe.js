const express = require("express");
const { subscribe, unsubscribe } = require("../controllers/Subscription");
const SubscribeRoute = express();

SubscribeRoute.post("/subscribe", subscribe)
SubscribeRoute.post("/unsubscribe", unsubscribe)

module.exports = SubscribeRoute