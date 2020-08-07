import React from 'react';
import { NavLink } from "react-router-dom";
import clsx from 'clsx';
import {
    makeStyles,
    Drawer,
    List,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse
  } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HttpsIcon from '@material-ui/icons/Https';
import PeopleIcon from '@material-ui/icons/People';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const DRAWER_WIDTH = 240;
const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: DRAWER_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const NavList = (props) => {
    const {
        open: isDrawerOpen,
        handleDrawerClose,
    } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose),
        }}
        open={isDrawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button component={NavLink} to="/projects" activeClassName="Mui-selected">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Projects" />
            </ListItem>

            <ListItem button  onClick={handleClick} >
                <ListItemIcon>
                    <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Setup"/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem activeClassName="Mui-selected" button component={NavLink} to="/users"  className={classes.nested}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users"/>
                    </ListItem>
                    <ListItem activeClassName="Mui-selected" button component={NavLink} to="/roles"  className={classes.nested}>
                        <ListItemIcon>
                            <HttpsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Roles"/>
                    </ListItem>
                </List>
            </Collapse>
            
            </List>
        <Divider />
      </Drawer>
    )
}

export default NavList;