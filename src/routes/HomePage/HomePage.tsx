import React, { useEffect, useState, useCallback } from 'react';
import '../../App.css';
import { Container, Box, Typography, TableCell, Button } from '@mui/material';
import Header from '../../components/Header/Header';
import { useOktaAuth } from '@okta/okta-react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditModal, { FormFields } from '../../components/EditModal/EditModal';
import {
  ParentType,
  axiosDeleteWithAuth,
  axiosGetWithAuth,
  axiosPutWithAuth,
  formatDate,
} from '../../utils/utils';

function HomePage() {
  const { authState } = useOktaAuth();

  const [parents, setParents] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<ParentType | null>(null);

  const handleDeleteParent = (id: string) => {
    axiosDeleteWithAuth(id, 'parents', authState).then(() => {
      setParents([...parents.filter((parent) => parent.id !== id)]);
    });
  };

  const handleEditParent = (parent: any) => {
    setSelectedParent(parent);
    setOpen(true);
  };

  const getParents = async () => {
    const response = await axiosGetWithAuth('parents', authState);
    setParents(response);
  };

  useEffect(() => {
    getParents();
  }, []);

  const handleSubmitEdit = useCallback(
    async (form: FormFields) => {
      const reqBody = { ...form, id: selectedParent?.id };
      axiosPutWithAuth('parents', authState, reqBody).then(() => getParents());
    },
    [selectedParent]
  );

  return (
    <>
      <Header />
      <Box component='main' sx={{ pt: 4 }}>
        <Container maxWidth='lg'>
          <Box sx={{ my: 5 }}>
            <Typography variant='h4' component='h1' gutterBottom>
              Home Page
            </Typography>
          </Box>
          <Box>
            <Box>
              <Typography variant='h4' component='h1'>
                Parents
              </Typography>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }} aria-label='parent table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align='center'>Boolean</TableCell>
                    <TableCell align='center'>Date</TableCell>
                    <TableCell align='center'>Double</TableCell>
                    <TableCell align='center'>Int</TableCell>
                    <TableCell align='center'>String</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parents.map((parent) => (
                    <TableRow
                      key={parent.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        {parent.parentName}
                      </TableCell>
                      <TableCell align='center'>{parent.booleanField?.toString()}</TableCell>
                      <TableCell align='center'>{formatDate(parent.dateField)}</TableCell>
                      <TableCell align='center'>{parent.doubleField}</TableCell>
                      <TableCell align='center'>{parent.intField}</TableCell>
                      <TableCell align='center'>{parent.stringField}</TableCell>
                      <TableCell>
                        <Button variant='outlined' onClick={() => handleEditParent(parent)}>
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant='outlined' onClick={() => handleDeleteParent(parent.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {open && (
            <EditModal
              data={selectedParent}
              open={open}
              action={handleSubmitEdit}
              closeModal={() => setOpen(false)}
            />
          )}
        </Container>
      </Box>
    </>
  );
}

export default HomePage;
