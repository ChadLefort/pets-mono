import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { ErrorIcon } from '@pets/common-ui';
import { Link } from 'react-router-dom';
import { removePet } from '../slice';
import { useAppDispatch } from 'app/reducer';
import { useFetchPets } from '../hooks/useFetchPets';
import {
  Button,
  Container,
  createStyles,
  Grid,
  IconButton,
  LinearProgress,
  Link as MuiLink,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    paper: {
      padding: theme.spacing(2),
    },
    item: {
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

export const ViewPets: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const remove = (id: number) => () => dispatch(removePet(id));
  const { pets, isFetching, error } = useFetchPets();

  return pets.length && !isFetching && !error ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {pets.map((pet) => (
            <TableRow key={pet.id}>
              <TableCell component="th" scope="row">
                <MuiLink
                  component={Link}
                  color="textSecondary"
                  to={`/${pet.id}`}
                >
                  {pet.name}
                </MuiLink>
              </TableCell>
              <TableCell align="right">{pet.age}</TableCell>
              <TableCell align="right">
                <IconButton component={Link} to={`edit/${pet.id}`}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  data-testid={`${pet.name}-delete`}
                  onClick={remove(pet.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : pets.length === 0 && !isFetching && !error ? (
    <Paper className={classes.paper}>
      <Grid container spacing={4}>
        <Grid item xs={12} classes={{ root: classes.item }}>
          <Typography>No pets found. Please add one.</Typography>
        </Grid>
        <Grid item xs={12} classes={{ root: classes.item }}>
          <Button color="inherit" component={Link} to="/add">
            Add Pets
          </Button>
        </Grid>
      </Grid>
    </Paper>
  ) : error ? (
    <ErrorIcon />
  ) : (
    <Container>
      <LinearProgress />
    </Container>
  );
};
