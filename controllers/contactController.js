const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get contacts from db
const getContacts = asyncHandler(async (req, res) => {
    // We will show only the data which the logged in user has entered 
    const contact = await Contact.find({
        user_id: req.user.id
    })
    res.status(200).json(contact);
});

// Get contacts by id from db
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    // If data not found for the id entered by the user we will throw error
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found, Please check the id and try again");
    }
    // If found we will give the response
    res.status(200).json(contact);
});

// Create contact
const createContact = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        phone
    } = req.body;
    // Firstwe will check if we are getting all the fields 
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mendatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id //user_id will be the id from which the user is logged in
    });
    res.status(201).json(contact);
});

// Update contact by id
const updateContact = asyncHandler(async (req, res) => {

    // First we will check if the data for the entered id exists or not if not we will throw error
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found, Please check the id and try again");
    }

    // We will check if the user is allowed to update the data or not
    // Because only that person can delete or update the data who has entered it
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Invalid request");
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.status(200).json(updatedContact);
});

// Delete contact by id
const deleteContact = asyncHandler(async (req, res) => {

    // First we will check if the data for the entered id exists or not if not we will throw error
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found, Please check the id and try again");
    }

    // We will check if the user is allowed to delete the data or not
    // Because only that person can delete or update the data who has entered it
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Invalid request");
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.status(201).json(contact);
});


module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};