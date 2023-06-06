import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router";

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

const Transaction = () => {
  return (
    <>
      <Navbar />
      <Transactions />
    </>
  );
};

export default Transaction;

function Transactions() {
  const [userId, setUserId] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
const navigate = useNavigate();

  const handleSubmit = () => {
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
    axios
      .post(`${baseUrl}/createTransaction`, transactionData, config)
      .then((res) => {
        alert(res.data.message);
        navigate('/home')
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };

  const handleUserIds = ({prop}) => {
   setUserId(prop);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Box className="containerTransaction">
      <h2 style={{ textAlign: "center" }}>Make Payment</h2>
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
      <MultipleSelectCheckmarks prop={handleUserIds} />
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
  );
}

function MultipleSelectCheckmarks({ prop }) {
  const [userId, setUserId] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);


  const getData = () => {
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

    axios
      .get(`${baseUrl}/users/getUser`, config)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        alert("An error occurred during login.");
      });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setUserId(Array.isArray(value) ? value : [value]);
    prop({ prop: value });
  };

  return (
    <div>
      <FormControl sx={{ m: 1, mt: 3, width: "45ch" }}>
        <InputLabel id="demo-multiple-checkbox-label">Select Users</InputLabel>
        <Select
          multiple
          value={userId}
          onChange={handleChange}
          input={<OutlinedInput label="Select Users" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              <Checkbox checked={userId.includes(user._id)} />
              <ListItemText primary={user.username} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

