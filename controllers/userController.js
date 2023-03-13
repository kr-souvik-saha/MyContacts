const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Func to register user
const registerUser = asyncHandler(async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    // Will check if we are getting all the fields or not
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mendotory");
    }

    // Will check if the entered email already exists in the db or not
    const userAvailable = await User.findOne({
        email
    })

    // If the entered email already exists we will throw error
    if (userAvailable) {
        throw new Error("User already registered");
    }

    // Will hash and salt the password 
    const hashedPassword = await bcrypt.hash(password, 10);

    // And store it
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    // If sucessfully stored we will will respond with email and id else throw error
    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email
        });
    } else {
        res.status(400)
        throw new Error("Some problem occured");
    }
});

// Func for login user
const loginUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;

    // Check if we are getting email and password
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter both the username and password");
    };

    const user = await User.findOne({
        email
    });

    // Check the user exists and password matches if exists we will respond with a access tokne otherwise throw error
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "5m"
        });
        res.status(200).json({
            accessToken
        })
    } else {
        res.status(400);
        throw new Error("Wrong email or password");
    };
});

// Current user(will hit this endpoint with accesstoken)
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
};