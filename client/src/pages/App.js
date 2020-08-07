import React from "react";
import { Router } from "react-router-dom";

import history from "../routes/History";
import Routes from "../routes/Routes";

import "./App.scss";

import {
  makeStyles,
  CssBaseline,
  Container,
} from '@material-ui/core';
import {
  NavList,
  TopBar
} from '../components'


const DRAWER_WIDTH = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));


const App = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>

      <CssBaseline />
      <Router history={history}>
      
      <TopBar handleDrawerOpen={handleDrawerOpen} open={open}/>
      <NavList open={open} handleDrawerClose={handleDrawerClose} drawerWidth={DRAWER_WIDTH} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {Routes}
        </Container>
      </main>

    </Router>
  </div>
  );
}

export default App;
