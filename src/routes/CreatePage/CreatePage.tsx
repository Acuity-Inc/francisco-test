import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Header from '../../components/Header/Header';
import { axiosPostWithAuth } from '../../utils/utils';
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';

export type FormFields = {
  parentName: string;
  intField: number;
  doubleField: number;
  dateField: string;
  stringField: string;
  booleanField: boolean;
};

export default function CreatePage() {
  const [formState, setFormState] = useState<FormFields>({
    parentName: '',
    intField: 0,
    doubleField: 0,
    dateField: '',
    stringField: '',
    booleanField: false,
  });
  const { authState } = useOktaAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'booleanField') {
      setFormState((prev) => ({ ...prev, [name]: e.target.checked }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    axiosPostWithAuth('parents', authState, formState).then(() => navigate('/'));
  };

  return (
    <>
      <Header />
      <Box component='main' sx={{ pt: 4 }}>
        <Container maxWidth='sm'>
          <Box sx={{ my: 5 }}>
            <Typography variant='h4' component='h1' gutterBottom>
              Create Page
            </Typography>
            <Grid container spacing={3} padding={3}>
              <Grid item xs={6} container justifyContent='center'>
                <TextField fullWidth label='Name' name='parentName' onChange={handleInputChange} />
              </Grid>
              <Grid item xs={6} container justifyContent='center'>
                <TextField
                  fullWidth
                  label='Int Field'
                  name='intField'
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6} container justifyContent='center'>
                <TextField
                  fullWidth
                  label='Double Field'
                  name='doubleField'
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6} container justifyContent='center'>
                <TextField
                  size='medium'
                  label='Date Field'
                  type='date'
                  name='dateField'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6} container justifyContent='center'>
                <TextField
                  fullWidth
                  label='String Field'
                  name='stringField'
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formState.booleanField}
                      name='booleanField'
                      onChange={handleInputChange}
                    />
                  }
                  label='Boolean Field'
                  name='booleanField'
                />
              </Grid>
              <Grid item xs={12} display='flex' justifyContent='flex-end'>
                <Button onClick={() => handleSubmit()} variant='outlined'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
