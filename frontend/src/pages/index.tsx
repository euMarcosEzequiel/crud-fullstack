import Box from '@mui/material/Box';
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <Box sx={{ display: "flex", }}>
      <Sidebar />
      <Box sx={{ display: "block", flex: 1, background: "red", }}>
        <h1>Home</h1>
      </Box>
    </Box>
  );
}
