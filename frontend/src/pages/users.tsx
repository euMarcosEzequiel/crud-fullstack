import Box from '@mui/material/Box';
import { Sidebar } from "@/components/Sidebar";
import { TableUser } from '@/components/TableUser';
import { Form } from '@/components/Form';



export default function Users(){
    return(
        <Box sx={{ display: "flex", }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, background: "red", minHeight: "100vh", }}>
                <Form />
                <TableUser />
            </Box>
        </Box>
    );
}