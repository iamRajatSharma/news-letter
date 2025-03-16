const express = require("express");
const cron = require("node-cron");
require("dotenv").config();
const db = require("./database");
const app = express();
const router = require("./routes/Subscribe")
db

app.use(express.json());
app.use("/api", router)


// Cron job to send newsletter every hour
cron.schedule("0 * * * *", () => {
    console.log("Running scheduled newsletter job");
    sendNewsletter();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
