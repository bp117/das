import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
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
import {
    isEmpty
} from 'lodash';
import {
    Loader
} from '../../../components';

const useStyles = makeStyles((theme) => ({
    inputField: {
        margin: theme.spacing(2),
        width: '40ch',
    },
    buttonContainer: {
        margin: theme.spacing(2),
    }
}))

const BasicSetup = (props) => {
    const {projectId} = useParams();
    const classes = useStyles();
    const [error, setError] = useState('');
    const initialState = {
        id: '',
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
        singleProjectDetails,
        editProjectDetails,
        editProject,
        clearEditProject,
        fetchSingleProject,
        clearSingleProject,
        setActiveStep
    } = props;

    useEffect(() => {
        fetchSingleProject({id: projectId});
        return () => {
            clearEditProject();
            clearSingleProject();
        }
    }, [fetchSingleProject, projectId, clearEditProject, clearSingleProject]);

    const reset = () => {
        clearSingleProject();
        fetchSingleProject({id: projectId})
    }

    useEffect(() => {
        if(!isEmpty(singleProjectDetails.data)){
            const keys = Object.keys({...initialState});
            keys.forEach(el => {
                setFormDetails(s => {
                    if(el === "workflow_roles"){
                        return {
                            ...s, [el]: singleProjectDetails.data[el].split(",")
                        }
                    }
                    return {
                        ...s, [el]: singleProjectDetails.data[el]
                    }
                    
                })
            });
        }
        
    }, [singleProjectDetails]);

    useEffect(() => {
        if(!isEmpty(editProjectDetails.data)) {
            setActiveStep(1);
        }
    }, [editProjectDetails, setActiveStep])

    const inputHandler = (val, selector, type = "string") => {
        let _val = val;
        if(type === "number"){
            _val = +_val;
        }
        setFormDetails(s => ({
            ...s,
            [selector]: _val
        }));
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const {id: pid, ...data} = formDetails;
        data.workflow_roles = (typeof data.workflow_roles === "string" ? data.workflow_roles : data.workflow_roles.join(","))
        if(data.workflow_roles.split(",").length === 1 && data.workflow_roles.split(",").includes("reviewer")){
            setError("Reviewer can not be the only role");
            return;
        }
        else{
            setError(null);
        }
        editProject({id: pid, data});
    }

    return(
        <>

            {
                singleProjectDetails.loading && <Loader />
            }
            {
                singleProjectDetails.error &&
                <Alert severity="error" className="mt-20">Unable to fetch user details!</Alert>
            }
            {
                error &&
                <Alert severity="error" className="mt-20">{error}</Alert>
            }

            {
                !isEmpty(singleProjectDetails.data) && (
                    <>
                        {
                            (editProjectDetails.data) &&
                            <Alert className="mt-20" onClose={clearEditProject}>Project edited successfully</Alert>
                        }
                        {
                            (editProjectDetails.error) &&
                            <Alert severity="error" className="mt-20" onClose={clearEditProject}>{editProjectDetails.error}</Alert>
                        }
                        
                        <form className="mt-50" onSubmit={formSubmitHandler}>
            
                            <TextField 
                                className={classes.inputField}
                                type="text"
                                label="LOB ID"
                                variant="outlined"
                                value={formDetails.lob_id} 
                                onChange={(e) => inputHandler(e.target.value, 'lob_id')}/>
                            
                            <FormControl className={classes.inputField}>
                                <InputLabel id="workflow-roles-label">Workflow Roles</InputLabel>
                                <Select
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
                                <Button type="submit" variant="contained" color="primary" disabled={editProjectDetails.loading}>
                                    Save and Continue
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
            
        </>
    )

}

export default BasicSetup;

