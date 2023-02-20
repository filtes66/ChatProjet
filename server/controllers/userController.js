const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({
        email,
    });

    if (userExists) throw "User with same email already exists;";

    const user = new User({
        username,
        email,
        password: sha256(password + process.env.SALT),
    });

    await user.save();

    res.json({
        message: "User [" + username + "] registered successfully!",
    });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        username,
        password: sha256(password + process.env.SALT),
    });

    if (!user) throw "Email and Password did not match.";

    const token = await jwt.sign({ id: user.id }, process.env.SECRET);

    res.json({
        message: "User logged in successfully!",
        token,
    });
};