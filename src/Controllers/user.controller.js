const User = require('../Model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUser = async(req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.register = async(req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            username,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();

        return res.json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Check if the password is correct
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'secret-key');

        // Send the token in the response
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
};
