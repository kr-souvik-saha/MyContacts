const mongoose = require("mongoose");

// Func to connect with the db
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Successfully connected with the database ", connect.connection.host, connect.connection.name);
    } catch (err) {
        console.log("We have encountered an error ", err);
        process.exit(1);
    }
}

module.exports = connectDb;