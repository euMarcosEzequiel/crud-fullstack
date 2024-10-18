import React from 'react';
import Box from '@mui/material/Box';
import { Sidebar } from "../components/Sidebar";
import { TableUser } from '../components/TableUser';
import { Form } from '../components/Form';



export default function Users(){
    return(
        <Box sx={{ display: "flex", background: "#dfece6" }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh", }}>
                <Form />
                <TableUser />
            </Box>
        </Box>
    );
}