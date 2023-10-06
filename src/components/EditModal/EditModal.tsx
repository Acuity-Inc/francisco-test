import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { formatDate } from '../../utils/utils';

export type FormFields = {
  parentName: string;
  intField: number;
  doubleField: number;
  dateField: string;
  stringField: string;
  booleanField: boolean;
};

type EditModalProps = {
  data: any;
  open: boolean;
  closeModal: () => void;
  action: (form: FormFields) => void;
};

export default function EditModal({ data, open, closeModal, action }: EditModalProps) {
  const [formState, setFormState] = useState<FormFields>({
    parentName: data.parentName,
    intField: data.intField,
    doubleField: data.doubleField,
    dateField: formatDate(data.dateField),
    stringField: data.stringField,
    booleanField: data.booleanField,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'booleanField') {
      setFormState((prev) => ({ ...prev, [name]: e.target.checked }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    action(formState);
    closeModal();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} padding={3}>
          <Grid item xs={6} container justifyContent='center'>
            <TextField
              label='Name'
              name='parentName'
              onChange={handleInputChange}
              value={formState.parentName}
            />
          </Grid>
          <Grid item xs={6} container justifyContent='center'>
            <TextField
              label='Int Field'
              name='intField'
              onChange={handleInputChange}
              value={formState.intField}
            />
          </Grid>
          <Grid item xs={6} container justifyContent='center'>
            <TextField
              label='Double Field'
              name='doubleField'
              onChange={handleInputChange}
              value={formState.doubleField}
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
              onChange={handleInputChange}
              value={formState.dateField}
            />
          </Grid>
          <Grid item xs={6} container justifyContent='center'>
            <TextField
              label='String Field'
              name='stringField'
              onChange={handleInputChange}
              value={formState.stringField}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formState.booleanField}
                  name='booleanField'
                  onChange={handleInputChange}
                  value={formState.booleanField}
                />
              }
              label='Boolean Field'
              name='booleanField'
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button color='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
