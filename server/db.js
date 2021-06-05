require("dotenv").config();
const mongoose = require("mongoose");
mongoose
    .connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((e) => {
        console.error("Connection error", e.message);
    });

const db = mongoose.connection;
console.log(process.env.MONGODB);

module.exports = db;