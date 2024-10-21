import React from 'react';
import Box from '@mui/material/Box';
import { Sidebar } from "../components/Sidebar";
import { TableUser } from '../components/TableUser';
import { Form } from '../components/Form';
import { Stack } from '@mui/material';



export default function Users(){
    return(
        <Box sx={{ display: "flex", background: "#dfece6" }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh", }}>
                <Stack spacing={4}>
                    <Form />
                    <TableUser />
                </Stack>
            </Box>
        </Box>
    );
}