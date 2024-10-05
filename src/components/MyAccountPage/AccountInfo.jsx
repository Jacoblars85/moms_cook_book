import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
  } from '@mui/material';
  import { useSelector } from 'react-redux';
  
  export function AccountInfo({ children }) {
    const currentUser = useSelector((store) => store.user.currentUser);
    const profileUser = useSelector((store) => store.user.profileUserReducer);
  
    return (
      <>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name:</TableCell>
                {/* <TableCell>{currentUser.name}</TableCell> */}
              </TableRow>
  
              <TableRow>
                <TableCell>Email:</TableCell>
                {/* <TableCell>{profileUser.email}</TableCell> */}
              </TableRow>
  
              <TableRow>
                <TableCell>Company:</TableCell>
                {/* <TableCell>{profileUser.company_name}</TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {children}
      </>
    );
  }