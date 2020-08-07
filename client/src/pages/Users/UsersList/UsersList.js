import React, {useEffect, useState} from 'react';
import {
    Typography,
    Grid,
    Button,
    IconButton,
} from '@material-ui/core';
import {
    Alert
} from '@material-ui/lab';
import {
    Delete as DeleteIcon,
    Edit as EditIcon
} from '@material-ui/icons';

import DataTable, {createTheme} from 'react-data-table-component';
import {
    Loader,
    DeleteConfirmation,
    Modal
} from '../../../components';
import UserAdd from '../UserAdd';
import UserEdit from '../UserEdit';
import {
    COLUMNS
} from './constants'

createTheme('edas-console', {
    background: {
      default: 'transparent',
    },
});

const UsersList = (props) => {
    const [deleteId, setDeleteId] = useState(null);
    const [isAddOpen, setAddOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const {
        userDetails: {
            users,
            deleteUser: deleteUserDetails
        },
        usersActions: {
            fetchUsers,
            deleteUser,
            clearDeleteUser
        }
    } = props;

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const deleteHandler = (id) => {
        deleteUser({id})
    }

    const ACTION_COLUMNS = [
        {
            cell: (props) => (
                <>
                    <IconButton size="small" onClick={() => setEditId(props.id)}> <EditIcon  fontSize="small"/> </IconButton>
                    <IconButton size="small" color="secondary" onClick={() => {setDeleteId(props.id)}}> <DeleteIcon  fontSize="small"/> </IconButton>
                </>
            )
        }
    ]

    return(
        <>
            <Grid container direction="row" justify="space-between">
                    <Typography component="h1" variant="h4" color="primary" gutterBottom>
                        Users
                    </Typography>
                    <div>
                        <Button variant="contained" color="primary" onClick={() => setAddOpen(true)}>Add User</Button>
                    </div>
            </Grid>

            <DeleteConfirmation 
                open={deleteId !== null} 
                handleClose={() => setDeleteId(null)} 
                onDelete={() => {deleteHandler(deleteId)}} />

            <Modal open={isAddOpen} handleClose={() => setAddOpen(false)}>
                <UserAdd />
            </Modal>

            <Modal open={editId !== null} handleClose={() => setEditId(null)}>
                <UserEdit userId={editId} />
            </Modal>

            <div className="mt-20">
            
                {
                    deleteUserDetails.data !== null &&
                    <Alert onClose={clearDeleteUser}>User Deleted Successfully</Alert>
                }
                {
                    deleteUserDetails.error &&
                    <Alert severity="error" onClose={clearDeleteUser}>{deleteUserDetails.error}</Alert>
                }

                {
                    users.loading && <Loader />
                }

                {
                    users.error && 
                    <Alert severity="error" onClose={clearDeleteUser}>{users.error}</Alert>

                }

            </div>

            {
                users.data && (
                    <div className="mt-30">
                        <DataTable 
                            noHeader
                            highlightOnHover
                            striped
                            data={users.data}
                            columns={[...COLUMNS, ...ACTION_COLUMNS]}
                            pagination
                            theme="edas-console" />
                    </div>
                )
            }
                
        </>
    )

}

export default UsersList;