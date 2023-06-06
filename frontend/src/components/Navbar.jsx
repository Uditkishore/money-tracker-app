import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios"
import baseUrl from '../../config';

function Navbar() {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();


      const handleCheck = async () => {
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
          
          if (response.data && response.data.balance === undefined) {
            alert("Please add amount first.");
          } else {
            navigate("/transaction");
          }
        } catch (error) {
            console.log(error)
          if (error.response && error.response.data) {
            alert(error.response.data.message);
          } else {
            alert("An error occurred");
          }
        }
      };

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Money Tracker
            </Typography>
            <Typography
              variant="p"
              component="div"
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              <Link style={{ color: "white" }} to={"/home"}>
                Home
              </Link>
              <p
                style={{ color: "white" }}
                onClick={handleCheck}
              >
                Payment
              </p>
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
}

export default Navbar;