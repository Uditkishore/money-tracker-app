import React, { useState, useEffect } from "react";
import { Box, TextField, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import baseUrl from "../../config";
import Navbar from "../components/Navbar";
import Table from "./table";

function Home() {
  const [amountRemaining, setAmountRemaining] = useState(0);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getRemainingAmount();
    getBalance();
  }, []);

  const getRemainingAmount = async () => {
    try {
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

      const response = await axios.get(`${baseUrl}/amountSpent`, config);
      setAmountRemaining(response.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAmount((prevState) => ({
      ...prevState,
      [id]: parseFloat(value),
    }));
  };

const handleSubmit = async () => {
  try {
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

    const response = await axios.put(
      `${baseUrl}/addBalance`,
      { amount },
      config
    );

    if (response && response.data) {
      alert(response.data.message);
      const balanceResponse = await axios.get(`${baseUrl}/getBalance`, config);
      setBalance(balanceResponse.data.balance);
    } else {
      alert("Invalid response from server");
    }
  } catch (error) {
    if (error.response && error.response.data) {
      alert(error.response.data.message);
    } else {
      alert("An error occurred");
    }
  }
};


  const getBalance = async () => {
    try {
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

      const response = await axios.get(`${baseUrl}/getBalance`, config);
      console.log(response.data.balance);
      if (response.data.balance != undefined) setBalance(response.data.balance);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <main className="homepage">
        <section>
          <Box sx={flexCont}>
            <Box
              sx={{
                width: "400px",
                backgroundColor: "#fff",
                padding: 2,
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Box>
                  <p>
                    <strong style={{ color: "green" }}>₹{balance}</strong>
                  </p>
                  <p>Balance</p>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    "& .MuiTextField-root": { m: 1, width: "15ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <input
                    id="balance"
                    style={{
                      width: "60%",
                      height: "80%",
                      paddingLeft: "10px",
                      border: "0 0 0 1px solid black",
                      outline: "none",
                    }}
                    type="number"
                    placeholder="Add Money"
                    onChange={handleChange}
                  />
                  <Button
                    sx={{
                      color: "green",
                      paddingLeft: "10px",
                    }}
                    variant="outlined"
                    size="small"
                    onClick={handleSubmit}
                  >
                    SAVE
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "400px",
                backgroundColor: "#fff",
                padding: 2,
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <p>
                <strong>₹{amountRemaining}</strong>
              </p>
              <p>Owed to you</p>
            </Box>
          </Box>
          <br />
          <Table />
        </section>
      </main>
    </>
  );
}

const flexCont = {
  marginTop: 3,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  alignItems: "center",
};

export default Home;
