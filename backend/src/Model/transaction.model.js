const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);