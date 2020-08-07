import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core';

const DeleteConfirmation = (props) => {

    const {
        open,
        handleClose,
        onDelete
    } = props;

    const handleDelete = () => {
        onDelete();
        handleClose();
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to delete the selected row?
                </DialogContentText>
            </DialogContent>
            <DialogActions> 
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleDelete} color="primary"  autoFocus>
                    Delete
                </Button>
            </DialogActions>
      </Dialog>
    )
}

export default DeleteConfirmation;