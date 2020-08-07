import React, {useEffect, useState} from 'react';
import {
    makeStyles,
    Typography,
    TextField,
    Button,
} from '@material-ui/core'
import {
    Alert
} from '@material-ui/lab'
import {
    Loader
} from '../../../components';
import { isEmpty } from 'lodash';
import {
    COLUMNS
} from './constants'

const useStyles = makeStyles((theme) => ({
    inputField: {
        margin: theme.spacing(2),
        width: '40ch',
    },
    buttonContainer: {
        margin: theme.spacing(2),
    }
}))


const RoleEdit = (props) => {
    const classes = useStyles();
    const [formDetails, setFormDetails] = useState(COLUMNS.reduce((ac, el) => {
        ac[el.selector] = '';
        return ac;
    }, {}))

    // const {roleId} = useParams();
    const {
        roleDetails: {
            singleRole,
            editRole: editRoleDetails
        },
        rolesActions: {
            fetchSingleRole,
            editRole,
            clearEditRole,
            clearSingleRole
        },
        roleId
    } = props;

    useEffect(() => {
        if(roleId !== null){
            fetchSingleRole({id: roleId})
        }
        return () => {
            clearEditRole();
            clearSingleRole();
        }
    }, [fetchSingleRole, clearEditRole, clearSingleRole, roleId]);

    useEffect(() => {
        if(!isEmpty(singleRole.data)){
            COLUMNS.forEach(el => {
                setFormDetails(s => ({...s, [el.selector]: singleRole.data[el.selector]}))
            });
        }
        
    }, [singleRole]);

    const inputHandler = (val, selector) => {
        setFormDetails(s => ({
            ...s,
            [selector]: val
        }));
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const {id, ...data} = formDetails;
        editRole({id: roleId, data})
    }

    return(
        <>
            <Typography component="h1" variant="h4" color="primary" gutterBottom>
                Edit Role
            </Typography>

            {
                singleRole.loading && <Loader />
            }

            {
                singleRole.error &&
                <Alert severity="error" className="mt-20">Unable to fetch role details!</Alert>
            }

            {
                !isEmpty(singleRole.data) && (
                <>

                    {
                        editRoleDetails.error && 
                        <Alert severity="error" className="mt-20" onClose={clearEditRole}>{editRoleDetails.error}</Alert>
                    }

                    {
                        editRoleDetails.data && 
                        <Alert className="mt-20" onClose={clearEditRole}>Role details edited successfully</Alert>
                    }

                    <form className="mt-20" onSubmit={formSubmitHandler}>
                        
                        <TextField 
                            required
                            className={classes.inputField}
                            label="Role ID"
                            variant="outlined"
                            value={formDetails.role_id} 
                            onChange={(e) => inputHandler(e.target.value, 'role_id')}/>

                        <TextField 
                            className={classes.inputField}
                            label="Role Desc"
                            variant="outlined"
                            value={formDetails.role_desc} 
                            onChange={(e) => inputHandler(e.target.value, 'role_desc')}/>

                        
                        <TextField 
                            required
                            className={classes.inputField}
                            label="LOB ID"
                            variant="outlined"
                            value={formDetails.lob_id} 
                            onChange={(e) => inputHandler(e.target.value, 'lob_id')}/>

                        <TextField 
                            required
                            className={classes.inputField}
                            label="WFGroup ID"
                            variant="outlined"
                            value={formDetails.wfgroup_id} 
                            onChange={(e) => inputHandler(e.target.value, 'wfgroup_id')}/>

                        
                        <div className={classes.buttonContainer}>
                            <Button type="submit" variant="contained" color="primary" disabled={editRoleDetails.loading}>
                                Update Details
                            </Button>
                        </div>
                    </form>
                </>
                )
            }


                            
        </>
    )

}

export default RoleEdit;