require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.URI_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
    console.log("Mongoose Connection Error: " + err.message);
});

mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
});

module.exports.mongoose = mongoose;