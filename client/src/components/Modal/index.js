import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    border: 0,
    maxHeight: '80vh',
    overflow: 'auto'
  },
}));

export default function TransitionsModal(props) {
  const {
    open,
    handleClose,
    children
  } = props;
  const classes = useStyles();

  return (
    
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableEnforceFocus
        disableAutoFocus
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid item xs={12} sm={12} md={8} lg={7}>
            <div className={classes.paper}>
              {children}
            </div>
          </Grid>
          
        </Fade>
      </Modal>
  );
}
