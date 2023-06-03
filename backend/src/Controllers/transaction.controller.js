const Transaction = require('../Model/transaction.model');

// Controller function to create a new transaction
exports.createTransaction = async (req, res) => {
    let clientId = req.user && req.user.userId;
    if(!clientId) return res.json({message : `You are not authorized`})
    try {
        const { description, amount, to } = req.body;

        // Create a new transaction
        const transaction = new Transaction({
            description,
            amount,
            to,
            from: clientId
        });

        // Save the transaction to the database
        await transaction.save();

        res.json({ message: 'Transaction created successfully' });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
};

// Controller function to update a transaction
exports.updateTransaction = async (req, res) => {
    let clientId = req.user && req.user.userId;
    if (!clientId) return res.json({ message: `You are not authorized` })
    try {
        const { id } = req.params;
        const { description, amount, to } = req.body;

        // Find the transaction in the database
        const transaction = await Transaction.findById(id);

        // Check if the transaction exists
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        // Update the transaction fields
        transaction.description = description;
        transaction.amount = amount;
        transaction.to = to;

        // Save the updated transaction
        await transaction.save();

        res.json({ message: 'Transaction updated successfully', transaction });
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
};

// Controller function to delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the transaction in the database and remove it
        const transaction = await Transaction.findByIdAndRemove(id);

        // Check if the transaction exists
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.json({ message: 'Transaction deleted successfully', transaction });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
};
