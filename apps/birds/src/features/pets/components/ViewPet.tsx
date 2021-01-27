import React from 'react';
import {
  Container,
  createStyles,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Theme
} from '@material-ui/core';
import { ErrorIcon } from '@pets/common-ui';
import { petsSelectors } from '../pets.slice';
import { useFetchPets } from '../hooks/useFetchPets';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from 'app/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    },
    list: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  })
);

export const ViewPet: React.FC = () => {
  const classes = useStyles();
  const { isFetching, error } = useFetchPets();
  const { id } = useParams<{ id: string }>();
  const pet = useTypedSelector((state) => petsSelectors.selectById(state, id));

  return pet && !isFetching && !error ? (
    <Paper className={classes.paper}>
      <List className={classes.list}>
        <ListItem>
          <ListItemText primary="Name" secondary={pet.name} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Age" secondary={pet.age} />
        </ListItem>
      </List>
    </Paper>
  ) : error ? (
    <ErrorIcon />
  ) : (
    <Container>
      <LinearProgress />
    </Container>
  );
};
