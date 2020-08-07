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


const UserEdit = (props) => {
    const classes = useStyles();
    const [formDetails, setFormDetails] = useState(COLUMNS.reduce((ac, el) => {
        ac[el.selector] = '';
        return ac;
    }, {}))

    const {
        userDetails: {
            singleUser,
            editUser: editUserDetails
        },
        usersActions: {
            fetchSingleUser,
            editUser,
            clearEditUser
        },
        userId
    } = props;

    useEffect(() => {
        if(userId !== null){
            fetchSingleUser({id: userId})
        }
        return () => {
            clearEditUser();
        }
    }, [fetchSingleUser, userId, clearEditUser]);

    useEffect(() => {
        if(!isEmpty(singleUser.data)){
            COLUMNS.forEach(el => {
                setFormDetails(s => ({...s, [el.selector]: singleUser.data[el.selector]}))
            });
        }
        
    }, [singleUser]);

    const inputHandler = (val, selector) => {
        setFormDetails(s => ({
            ...s,
            [selector]: val
        }));
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const {id, ...data} = formDetails;
        editUser({id: userId, data})
    }

    return(
        <>
            <Typography component="h1" variant="h4" color="primary" gutterBottom>
                Edit User
            </Typography>

            {
                singleUser.loading && <Loader />
            }

            {
                singleUser.error &&
                <Alert severity="error" className="mt-20">Unable to fetch user details!</Alert>
            }

            {
                !isEmpty(singleUser.data) && (
                <>

                    {
                        editUserDetails.error && 
                        <Alert severity="error" className="mt-20" onClose={clearEditUser}>{editUserDetails.error}</Alert>
                    }

                    {
                        editUserDetails.data && 
                        <Alert className="mt-20" onClose={clearEditUser}>User details edited successfully</Alert>
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
                            <Button type="submit" variant="contained" color="primary" disabled={editUserDetails.loading}>
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

export default UserEdit;