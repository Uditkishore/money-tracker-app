const Product = require('../Model/product.model');

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.find().lean().exec();
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.createProduct =  async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send(error);
    }
}
