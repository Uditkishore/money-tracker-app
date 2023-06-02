const User = require('../Model/user.model');

exports.getUser = async(req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.createUsers = async(req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
}
