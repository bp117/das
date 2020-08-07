import React, {useEffect, useState} from 'react';
import {
    Typography,
    Grid,
    Button,
    IconButton
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
import RoleAdd from '../RoleAdd';
import RoleEdit from '../RoleEdit';
import {
    COLUMNS
} from './constants'

createTheme('edas-console', {
    background: {
      default: 'transparent',
    },
});

const RolesList = (props) => {
    const [deleteId, setDeleteId] = useState(null);
    const [isAddOpen, setAddOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const {
        roleDetails: {
            roles,
            deleteRole: deleteRoleDetails
        },
        rolesActions: {
            fetchRoles,
            deleteRole,
            clearDeleteRole
        }
    } = props;

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const deleteHandler = (id) => {
        deleteRole({id})
    }

    const ACTION_COLUMNS = [
        {
            cell: (props) => (
                <>
                    <IconButton size="small" onClick={() => {setEditId(props.id)}}> <EditIcon  fontSize="small"/> </IconButton>
                    <IconButton size="small" color="secondary" onClick={() => {setDeleteId(props.id)}}> <DeleteIcon  fontSize="small"/> </IconButton>
                </>
            )
        }
    ]

    return(
        <>
            <Grid container direction="row" justify="space-between">
                    <Typography component="h1" variant="h4" color="primary" gutterBottom>
                        Roles
                    </Typography>
                    <div>
                        <Button variant="contained" color="primary" onClick={() => setAddOpen(true)}>Add Role</Button>
                    </div>
            </Grid>

            <DeleteConfirmation 
                open={deleteId !== null} 
                handleClose={() => setDeleteId(null)} 
                onDelete={() => {deleteHandler(deleteId)}} />

            <Modal open={isAddOpen} handleClose={() => setAddOpen(false)}>
                <RoleAdd />
            </Modal>

            <Modal open={editId !== null} handleClose={() => setEditId(null)}>
                <RoleEdit roleId={editId} />
            </Modal>

            <div className="mt-20">
            
                {
                    deleteRoleDetails.data !== null &&
                    <Alert onClose={clearDeleteRole}>Role Deleted Successfully</Alert>
                }
                {
                    deleteRoleDetails.error &&
                    <Alert severity="error" onClose={clearDeleteRole}>{deleteRoleDetails.error}</Alert>
                }

                {
                    roles.loading && <Loader />
                }

                {
                    roles.error && 
                    <Alert severity="error" onClose={clearDeleteRole}>{roles.error}</Alert>

                }

            </div>

            {
                roles.data && (
                    <div className="mt-30">
                        <DataTable
                            noHeader 
                            highlightOnHover
                            striped
                            data={roles.data}
                            columns={[...COLUMNS, ...ACTION_COLUMNS]}
                            pagination
                            theme="edas-console" />
                    </div>
                )
            }
                
        </>
    )

}

export default RolesList;