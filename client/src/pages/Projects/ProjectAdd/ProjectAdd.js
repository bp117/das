import React, {useState, useEffect} from 'react';
import {
    Typography,
    TextField,
    Button,
    makeStyles,
    FormControl,
    Select,
    InputLabel,
    Input,
    MenuItem
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

const ProjectAdd = (props) => {
    const classes = useStyles();
    const [error, setError] = useState('');
    const initialState = {
        lob_id: '',
        workflow_id: '',
        project_type_id: '',
        annotation_id: '',
        ds_id: '',
        project_name: '',
        project_desc: '',
        num_tasks: '',
        complete_percent: '',
        to_reassign: '',
        project_start_date: '',
        project_recurrence_start_date: '',
        project_recurrence_end_date: '',
        project_end_date: '',
        project_model_name: '',
        project_status_id: '',
        annotators_per_record: '',
        workflow_roles: []
    };
    const [formDetails, setFormDetails] = useState({...initialState});

    const {
        projectDetails: {
            addProject: addProjectDetails
        },
        projectsActions: {
            addProject,
            clearAddProject
        }
    } = props;

    useEffect(() => {
        return () => {
            clearAddProject();
        }
    }, [clearAddProject]);

    const inputHandler = (val, selector, type = "string") => {
        let _val = val;
        if(val !== "" && type === "number"){
            _val = +_val;
        }
        setFormDetails(s => ({
            ...s,
            [selector]: _val
        }));
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const payload = {...formDetails};
        payload.workflow_roles = (typeof payload.workflow_roles === "string" ? payload.workflow_roles : payload.workflow_roles.join(","))
        if(payload.workflow_roles.split(",").length === 1 && payload.workflow_roles.split(",").includes("reviewer")){
            setError("Reviewer can not be the only role");
            return;
        }
        else{
            setError(null);
        }
        addProject({...payload});
    }

    const reset = () => {
        setFormDetails({...initialState});
    }

    return(
        <>
            <Typography component="h1" variant="h4" color="primary" gutterBottom>
                Add Project
            </Typography>
            {
                addProjectDetails.data &&
                <Alert className="mt-20" onClose={clearAddProject}>Project added successfully</Alert>
            }

            {
                addProjectDetails.error !== null &&
                <Alert severity="error" className="mt-20" onClose={clearAddProject}>{addProjectDetails.error}</Alert>
            }

            {
                error &&
                <Alert severity="error" className="mt-20">{error}</Alert>
            }

            <form className="mt-20" onSubmit={formSubmitHandler}>

                <TextField 
                    className={classes.inputField}
                    type="text"
                    label="LOB ID"
                    variant="outlined"
                    value={formDetails.lob_id} 
                    onChange={(e) => inputHandler(e.target.value, 'lob_id')}/>
                <FormControl variant="outlined" className={classes.inputField} required>
                    <InputLabel id="workflow-roles-label">Workflow Roles</InputLabel>
                    <Select
                        label="Workflow Roles"
                        labelId="workflow-roles-label"
                        multiple
                        value={formDetails.workflow_roles}
                        onChange={(e) => inputHandler(e.target.value, 'workflow_roles')}
                        input={<Input />}
                        >
                            <MenuItem value="annotator">Annotator</MenuItem>
                            <MenuItem value="reviewer">Reviewer</MenuItem>
                    </Select>
                </FormControl>
                <TextField 
                    className={classes.inputField}
                    type="text"
                    label="Workflow ID"
                    variant="outlined"
                    value={formDetails.workflow_id} 
                    onChange={(e) => inputHandler(e.target.value, 'workflow_id')}/>
                <TextField 
                    className={classes.inputField}
                    type="text"
                    label="Project Type ID"
                    variant="outlined"
                    value={formDetails.project_type_id} 
                    onChange={(e) => inputHandler(e.target.value, 'project_type_id')}/>
                <TextField 
                    className={classes.inputField}
                    type="text"
                    label="Annotation ID"
                    variant="outlined"
                    value={formDetails.annotation_id} 
                    onChange={(e) => inputHandler(e.target.value, 'annotation_id')}/>
                <TextField 
                    className={classes.inputField}
                    label="DS ID"
                    type="text"
                    variant="outlined"
                    value={formDetails.ds_id} 
                    onChange={(e) => inputHandler(e.target.value, 'ds_id')}/>
                <TextField
                    required 
                    className={classes.inputField}
                    label="Name"
                    variant="outlined"
                    value={formDetails.project_name} 
                    onChange={(e) => inputHandler(e.target.value, 'project_name')}/>
                <TextField 
                    className={classes.inputField}
                    label="Description"
                    variant="outlined"
                    value={formDetails.project_desc} 
                    onChange={(e) => inputHandler(e.target.value, 'project_desc')}/>
                <TextField 
                    className={classes.inputField}
                    label="# Of Tasks"
                    variant="outlined"
                    value={formDetails.num_tasks} 
                    onChange={(e) => inputHandler(e.target.value, 'num_tasks')}/>
                <TextField 
                    className={classes.inputField}
                    label="Complete Percent"
                    variant="outlined"
                    value={formDetails.complete_percent} 
                    onChange={(e) => inputHandler(e.target.value, 'complete_percent')}/>
                <TextField 
                    className={classes.inputField}
                    label="To Reassign"
                    variant="outlined"
                    value={formDetails.to_reassign} 
                    onChange={(e) => inputHandler(e.target.value, 'to_reassign')}/>
                <TextField 
                    className={classes.inputField}
                    label="Project Start Date"
                    variant="outlined"
                    value={formDetails.project_start_date} 
                    onChange={(e) => inputHandler(e.target.value, 'project_start_date')}/>
                <TextField 
                    className={classes.inputField}
                    label="Recurrence Start Date"
                    variant="outlined"
                    value={formDetails.project_recurrence_start_date} 
                    onChange={(e) => inputHandler(e.target.value, 'project_recurrence_start_date')}/>
                <TextField 
                    className={classes.inputField}
                    label="Recurrence End Date"
                    variant="outlined"
                    value={formDetails.project_recurrence_end_date} 
                    onChange={(e) => inputHandler(e.target.value, 'project_recurrence_end_date')}/>
                <TextField 
                    className={classes.inputField}
                    label="Project End Date"
                    variant="outlined"
                    value={formDetails.project_end_date} 
                    onChange={(e) => inputHandler(e.target.value, 'project_end_date')}/>
                <TextField 
                    className={classes.inputField}
                    label="Model Name"
                    variant="outlined"
                    value={formDetails.project_model_name} 
                    onChange={(e) => inputHandler(e.target.value, 'project_model_name')}/>
                <TextField 
                    className={classes.inputField}
                    type="text"
                    label="Status ID"
                    variant="outlined"
                    value={formDetails.project_status_id} 
                    onChange={(e) => inputHandler(e.target.value, 'project_status_id')}/>
                <TextField 
                    className={classes.inputField}
                    type="text"
                    label="Annotators Per Record"
                    variant="outlined"
                    value={formDetails.annotators_per_record} 
                    onChange={(e) => inputHandler(e.target.value, 'annotators_per_record')}/>
                
                <div className={classes.buttonContainer}>
                    <Button type="submit" variant="contained" color="primary" disabled={addProjectDetails.loading}>
                        Add Project
                    </Button>
                    {' '}
                    <Button type="button" variant="contained" color="secondary" onClick={reset}>
                        Reset
                    </Button>
                </div>
            </form>
        </>
    )

}

export default ProjectAdd;

