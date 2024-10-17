import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppSelector } from '@/hooks/hooks';
import { dispatch } from '@/store';
import { UserServices } from '@/services/UserServices';
import { getAllUsers, deleteUser } from '@/slices/User/user-slice';

const userServices = new UserServices();

export function TableUser() {
  const users = useAppSelector((state) => state.user.users);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  async function getUsers() {
    const response = await userServices.getUsers();
    dispatch(getAllUsers(response));
  }
  
  useEffect(() => {
    getUsers();
  }, []);

  
  async function handleDeleteUser(id: string){
    await userServices.delete(id);
    dispatch(deleteUser(id));
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "20px" }}
      >
        Users List
      </Typography>
      <Divider />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ fontWeight: "600", minWidth: "100px" }}>
                {"Name"}
              </TableCell>
              <TableCell align="left" style={{ fontWeight: "600", minWidth: "100px" }}>
                {"Email"}
              </TableCell>
              <TableCell align="left" style={{ fontWeight: "600", minWidth: "100px" }}>
                {"Status"}
              </TableCell>
              <TableCell align="left" style={{ fontWeight: "600", }}>
                {"Action"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    <TableCell>
                      { user.name }
                    </TableCell>
                    <TableCell>
                      { user.email }
                    </TableCell>
                    <TableCell>
                      { user.status ? "Ativo" : "Inativo" }
                    </TableCell>
                    <TableCell style={{ display: "flex", gap: "0.8rem"}}>
                      <button>
                        <EditIcon />
                      </button>
                      <button onClick={ () => handleDeleteUser(user.id) }>
                        <DeleteForeverIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}