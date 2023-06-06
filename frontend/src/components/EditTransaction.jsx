import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  ListItemText,
  Select,
  Checkbox,
  OutlinedInput,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import baseUrl from "../../config";
import Navbar from "../components/Navbar"

function EditTransaction({prop}) {
  const [userId, setUserId] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();


  const handleSubmit = async() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in");
      navigate("/");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const transactionData = {
      description: description,
      amount: amount,
      to: userId,
    };

  try {
    const response = await axios.put(
      `${baseUrl}/updateTransaction/${id}`,
      transactionData,
      config
    );
    
    alert("Edit Successful.")
    navigate("/home");
  } catch (err) {
    console.log(err);
  }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <>
      <Navbar />
      <Box className="containerTransaction">
        <h2 style={{ textAlign: "center" }}>Edit Payment</h2>
        <br />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "45ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            type="number"
            id="amount"
            label="Enter Amount"
            variant="standard"
            value={amount}
            onChange={handleAmountChange}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "45ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            type="text"
            id="description-input"
            label="Description"
            variant="standard"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Box>
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          size="medium"
          onClick={handleSubmit}
        >
          SAVE
        </Button>
      </Box>
    </>
  );
}

export default EditTransaction