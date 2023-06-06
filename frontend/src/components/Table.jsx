import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import baseUrl from "../../config";
import axios from "axios";

import {
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

export default function StickyHeadTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const columns = [
    { id: "name", label: "Name" },
    { id: "amount", label: "Amount" },
    { id: "description", label: "Description" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
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
    try {
      const res = await axios.get(`${baseUrl}/getTransaction`, config);
      let response = res.data.transactions;
      // setRows();
      response.map((e)=>{
        e.amount = `paid ₹${e.amount}`;
      })

      setRows(response);
      
    } catch (error) {
      console.log(error);
    }
  };

const handleEdit = async (transactionId) => {
  navigate(`/updateTransaction/${transactionId}`);
};
  const handleDelete = async (id) => {

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
    try {
      const res = await axios.delete(
        `${baseUrl}/deleteTransaction/${id}`,
        config
      );
      alert(res.data.message);
      const filteredRows = rows.filter((row) => {
        // Add your filter condition here
        return row._id !== id;
      });
      setRows(filteredRows);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center">Actions</TableCell>
              {/* Add Actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <React.Fragment key={row._id}>
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell
                      sx={{ display: "flex", justifyContent: "space-around" }}
                      align="center"
                    >
                      <Button
                        onClick={() => handleEdit(row._id)}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(row._id)}
                        variant="outlined"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
