import React, {useState, useEffect} from 'react';
import {
    Typography,
    TextField,
    Button,
    makeStyles,
} from '@material-ui/core';

import {
    Alert
} from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    inputField: {
        margin: theme.spacing(2),
        width: '40ch',
    },
    buttonContainer: {
        margin: theme.spacing(2),
    }
}))

const RoleAdd = (props) => {
    const classes = useStyles();
    const [formDetails, setFormDetails] = useState({
        role_id: '',
        role_desc: '',
        lob_id: '',
        wfgroup_id: ''
    });

    const {
        roleDetails: {
            addRole: addRoleDetails
        },
        rolesActions: {
            addRole,
            clearAddRole
        }
    } = props;

    useEffect(() => {
        return () => {
            clearAddRole();
        }
    }, [clearAddRole]);

    const inputHandler = (val, selector) => {
        setFormDetails(s => ({
            ...s,
            [selector]: val
        }));
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        addRole({...formDetails});
    }

    return(
        <>
            <Typography component="h1" variant="h4" color="primary" gutterBottom>
                Add Role
            </Typography>
            {
                (addRoleDetails.data) &&
                <Alert className="mt-20" onClose={clearAddRole}>Role added successfully</Alert>
            }
            {
                (addRoleDetails.error) &&
                <Alert severity="error" className="mt-20" onClose={clearAddRole}>{addRoleDetails.error}</Alert>
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
                    <Button type="submit" variant="contained" color="primary" disabled={addRoleDetails.loading}>
                        Add Role
                    </Button>
                </div>
            </form>
        </>
    )

}

export default RoleAdd;

