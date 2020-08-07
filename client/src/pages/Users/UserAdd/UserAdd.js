import React, {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import {
    Typography,
    TextField,
    Button,
    makeStyles
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

const UserEdit = (props) => {
    const classes = useStyles();
    const [formDetails, setFormDetails] = useState({
        user_lan_id: '',
        project_id: '',
        lob_id: '',
        role_id: '',
        first_name: '',
        last_name: '',
        access_expiry_date: '',
        active: ''
    });

    const {
        userDetails: {
            addUser: addUserDetails
        },
        usersActions: {
            addUser,
            clearAddUser
        }
    } = props;

    useEffect(() => {
        return () => {
            clearAddUser();
        }
    }, [clearAddUser]);

    const inputHandler = (val, selector) => {
        setFormDetails(s => ({
            ...s,
            [selector]: val
        }));
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        addUser({...formDetails, creation_date: dayjs().format('DD/MM/YYYY')});
    }

    return(
        <>
            <Typography component="h1" variant="h4" color="primary" gutterBottom>
                Add User
            </Typography>

            {
                addUserDetails.data &&
                <Alert className="mt-20" onClose={clearAddUser}>User added successfully</Alert>
            }

            {
                addUserDetails.error &&
                <Alert severity="error" className="mt-20" onClose={clearAddUser}>{addUserDetails.error}</Alert>
            }   

            <form className="mt-20" onSubmit={formSubmitHandler}>

                <TextField
                    className={classes.inputField}
                    label="User Lan ID"
                    variant="outlined"
                    value={formDetails.user_lan_id} 
                    inputProps={{
                        maxLength: 7,
                        minLength: 4
                    }}
                    onChange={(e) => inputHandler(e.target.value, 'user_lan_id')}/>
                
                <TextField 
                    className={classes.inputField}
                    label="Project ID"
                    variant="outlined"
                    value={formDetails.project_id} 
                    onChange={(e) => inputHandler(e.target.value, 'project_id')}/>
                <TextField 
                    required
                    className={classes.inputField}
                    label="LOB ID"
                    variant="outlined"
                    value={formDetails.lob_id} 
                    onChange={(e) => inputHandler(e.target.value, 'lob_id')}/>

                
                <TextField 
                    className={classes.inputField}
                    label="Role ID"
                    variant="outlined"
                    value={formDetails.role_id} 
                    onChange={(e) => inputHandler(e.target.value, 'role_id')}/>

                <TextField 
                    className={classes.inputField}
                    label="First Name"
                    variant="outlined"
                    value={formDetails.first_name} 
                    onChange={(e) => inputHandler(e.target.value, 'first_name')}/>

                <TextField 
                    className={classes.inputField}
                    label="Last Name"
                    variant="outlined"
                    value={formDetails.last_name} 
                    onChange={(e) => inputHandler(e.target.value, 'last_name')}/>


                <TextField 
                    className={classes.inputField}
                    label="Access Expiry Date"
                    variant="outlined"
                    value={formDetails.access_expiry_date} 
                    onChange={(e) => inputHandler(e.target.value, 'access_expiry_date')}/>
                
                <TextField 
                    required
                    className={classes.inputField}
                    label="Active"
                    variant="outlined"
                    value={formDetails.active} 
                    onChange={(e) => inputHandler(e.target.value, 'active')}/>
                <div className={classes.buttonContainer}>
                    <Button type="submit" variant="contained" color="primary" disabled={addUserDetails.loading}>
                        Add User
                    </Button>
                </div>
            </form>
        </>
    )

}

export default UserEdit;

