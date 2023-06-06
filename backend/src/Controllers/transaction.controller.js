const Transaction = require("../Model/transaction.model");
const User = require("../Model/user.model");

// Controller function to get transaction
exports.getTransaction = async (req, res) => {
  let clientId = req.user && req.user.userId;
  if (!clientId)
    return res.status(404).json({ message: `You are not authorized` });
  try {
    const data = await Transaction.find().lean().exec();
    // console.log(data)
    res.json({ transactions: data });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.amountSpent = async (req, res) => {
  let clientId = req.user && req.user.userId;
  if (!clientId)
    return res.status(404).json({ message: `You are not authorized` });
  try {
    const data = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    // console.log(data[0].totalAmount);
    res.json({ transactions: data[0].totalAmount });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

// Controller function to create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const clientId = req.user && req.user.userId;
    if (!clientId) {
      return res.json({ message: "You are not authorized" });
    }

    let { description, amount, to } = req.body;

    if (!description || !amount || !to) {
      return res.status(400).json({ msg: "Required fields are missing" });
    }

    let transaction;
    if (to.length >= 2) {
      amount = amount / to.length;

      for (let i = 0; i < to.length; i++) {
        let userDetails = await User.findOne({ _id: to[i] }).lean().exec();
        transaction = new Transaction({
          name: userDetails.username,
          description,
          amount: amount,
          to: [to[i]],
          from: clientId,
        });
      }
    } else {
      let userDetails = await User.findOne({ _id: to[0] }).lean().exec();

      transaction = new Transaction({
        name: userDetails.username,
        description,
        amount,
        to,
        from: clientId,
      });
    }

    const user = await User.findOne({ _id: clientId });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    if (user.balance < amount) {
      return res.status(400).json({ msg: "Low balance." });
    } else {
      user.balance -= amount;
      await user.save();
      await transaction.save();
    }

    res.json({ message: "Transaction created successfully" });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const clientId = req.user && req.user.userId;
    if (!clientId) {
      return res.status(401).json({ message: "You are not authorized." });
    }

    const { id } = req.params;
    const { description, amount, to } = req.body;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    // Update the transaction only if the fields are provided
    if (description) {
      transaction.description = description;
    }
    if (amount) {
      transaction.amount = amount;
    }
    if (to) {
      transaction.to = to;
    }

    const updatedTransaction = await transaction.save();

    res.json({
      message: "Transaction updated successfully",
      transaction: updatedTransaction,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }

    console.error("Error updating transaction:", error);
    res.status(500).json({ error: "An internal server error occurred." });
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
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully", transaction });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

exports.addBalance = async (req, res) => {
  try {
    const { amount } = req.body;

    const balance = parseFloat(amount.balance);
    if (isNaN(balance)) {
      return res.status(400).json({ message: "Please enter a valid amount." });
    }

    if (!balance) {
      return res.status(400).json({ message: "Please enter a valid amount." });
    }

    const clientId = req.user && req.user.userId;
    if (!clientId) {
      return res.status(401).json({ message: "You are not authorized." });
    }

    const user = await User.findOne({ _id: clientId });

    if (user.balance) {
      user.balance += balance;
    } else {
      user.balance = balance;
    }

    await user.save();

    return res
      .status(201)
      .json({ message: "Amount added successfully.", balance: user.balance });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.getBalance = async (req, res) => {
  const clientId = req.user && req.user.userId;
  if (!clientId) {
    return res.status(401).json({ message: "You are not authorized." });
  }
  try {
    const user = await User.findOne({ _id: clientId });
    console.log(user);
    res.json({ balance: user.balance });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};
