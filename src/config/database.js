const mongoose = require("mongoose")

const db = mongoose.connect(process.env.MONGO_URI)
    .then((success) => {
        console.log('DB Connected')
    })
    .catch((err) => {
        console.log('DB Error')
    })

module.exports = db;