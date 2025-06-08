const Subscriber = require("../models/Subscribe.schema");
const { sendConfirmationMail } = require("../utils/helper");

const subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) return res.status(400).json({ message: "Already subscribed" });

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        const subject = "Thanks for subscribe us"
        const body = "This is body"
        await sendConfirmationMail(subject, body, email);  // send confirmation mail
        //for now sending mail directly, later we use rabbitmq for sending mail through queue

        res.status(201).json({ message: "Subscription successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const unsubscribe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const deletedSubscriber = await Subscriber.findOneAndDelete({ email });
        if (!deletedSubscriber) return res.status(400).json({ message: "Email not found" });

        res.status(200).json({ message: "Unsubscribed successfully" });

        const subject = "Thanks for unsubscribe us"
        const body = "This is body"
        await sendConfirmationMail(subject, body, email);  // send confirmation mail

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    subscribe,
    unsubscribe
}