import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    makeStyles
} from '@material-ui/core';
import {
    Menu as MenuIcon
} from '@material-ui/icons';
import clsx from 'clsx';

const DRAWER_WIDTH = 240;
const useStyles = makeStyles((theme) => ({

    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
}));

const TopBar = (props) => {
    const classes = useStyles();
    const {
        handleDrawerOpen,
        open
    } = props;

    return (
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
                <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                EDAS Console
            </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar;