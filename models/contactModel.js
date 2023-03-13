const mongoose = require("mongoose");

// Which and what fields will be in the collection will defined in this func
const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // User id from which the user is logged in
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email address"]
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"]
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("Contact", contactSchema);