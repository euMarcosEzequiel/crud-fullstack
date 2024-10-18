import React from 'react';
import Box from '@mui/material/Box';
import { Sidebar } from "../components/Sidebar";

export default function Home() {
  return (
    <Box sx={{ display: "flex", background: "#dfece6",}}>
      <Sidebar />
      <Box sx={{ display: "block", flex: 1, minHeight: "100vh" }}>
        <h1>Home</h1>
      </Box>
    </Box>
  );
}
