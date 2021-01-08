import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PetsIcon from '@material-ui/icons/Pets';
import React, { useContext } from 'react';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ThemeContext } from './Theme';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    toolBar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    icon: {
      paddingRight: theme.spacing(1),
    },
  })
);

type Props = {
  title: string;
};

export const Nav: React.FC<Props> = ({ title, children }) => {
  const classes = useStyles();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Box display="flex" alignItems="center">
            <Box className={classes.icon}>
              <PetsIcon />
            </Box>
            <Typography variant="h6" component="h1" noWrap>
              {title}
            </Typography>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={theme === 'dark'}
                onClick={toggleTheme}
                name="theme"
              />
            }
            label={theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Box className={classes.drawerContainer}>{children}</Box>
      </Drawer>
    </React.Fragment>
  );
};
