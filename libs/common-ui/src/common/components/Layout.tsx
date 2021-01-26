import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { Nav } from './Nav';
import { NavLink } from 'react-router-dom';
import {
  Grid,
  makeStyles,
  createStyles,
  Theme as MuiTheme,
  Toolbar,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme: MuiTheme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

type Props = {
  title: string;
};

export const Layout: React.FC<Props> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Nav title={title}>
        <List>
          <ListItem
            button
            component={NavLink}
            to="/"
            exact
            activeClassName="Mui-selected"
          >
            <ListItemText primary="View Pets" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/add"
            exact
            activeClassName="Mui-selected"
          >
            <ListItemText primary="Add Pets" />
          </ListItem>
        </List>
      </Nav>
      <Grid container className={classes.content}>
        <Toolbar />
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
