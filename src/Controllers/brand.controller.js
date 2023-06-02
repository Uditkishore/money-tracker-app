const Brand = require('../Model/brand.model');

exports.getBrand = async (req, res) => {
    try {
        const brand = await Brand.find().lean().exec();
        return res.status(201).send(brand);
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.createBrand =  async (req, res) => {
    try {
        const brand = await Brand.create(req.body);
        return res.status(201).send(brand);
    } catch (error) {
        return res.status(500).send(error);
    }
}
