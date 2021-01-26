import React from 'react';
import { IPet } from '@pets/types';
import { PetForm } from '@pets/common-ui';
import { postPet } from '../api';
import { useHistory } from 'react-router-dom';
import { useMutation, useQueryCache } from 'react-query';
import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    },
    button: {
      margin: theme.spacing(2, 0)
    }
  })
);

export const AddPets: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const cache = useQueryCache();
  const [addPet] = useMutation(postPet, {
    onSuccess: () => cache.invalidateQueries('pets')
  });

  const onSubmit = (values: IPet) =>
    new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          await addPet({ ...values, type: 'Dog' });
          history.push('/');
          resolve();
        } catch (error) {
          reject(error);
        }
      })();
    });

  return (
    <Paper className={classes.paper}>
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            Add Pet
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <PetForm onSubmit={onSubmit} />
        </Grid>
      </Grid>
    </Paper>
  );
};
