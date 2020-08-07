import React, {useEffect, useState} from 'react';
import {
    makeStyles,
    Typography,
    Grid,
    Button,
    IconButton,
    TextField
} from '@material-ui/core';
import {
    Alert
} from '@material-ui/lab';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    FileCopy as DuplicateIcon
} from '@material-ui/icons';

import DataTable, {createTheme} from 'react-data-table-component';
import {useHistory} from 'react-router-dom'
import {isArray, isEmpty} from 'lodash'
import {
    Loader,
    DeleteConfirmation
} from '../../../components';
import {
    downloadCSV
} from '../../../utils/export'

const style = makeStyles(theme => ({
    tableHeading: {
        // fontWeight: 'bold',
        height: '24px'
    },
    searchInputContainer: {
        paddingBottom: '10px'
    }
}));

createTheme('edas-console', {
    background: {
      default: 'transparent',
    },
});

const ProjectsList = (props) => {
    const classes = style();
    const history = useHistory();
    const [deleteId, setDeleteId] = useState(null);
    const {
        projectsDetails: {
            projects,
            deleteProject: deleteProjectDetails,
            addProject: addProjectDetails
        },
        projectsActions: {
            fetchProjects,
            deleteProject,
            clearDeleteProject,
            addProject,
            clearAddProject
        }
    } = props;

    const initFilterValue = {
        id: '',
        project_name: '',
        project_model_name: '',
        project_type_id: '',
        project_status_id: '',
        num_tasks: '',
        complete_percent: '',
        to_reassign: '',
        annotators_per_record: '',
        project_start_date: '',
        project_recurrence_start_date: '',
        project_end_date: ''
    };
    const [filters, setFilters] = useState({...initFilterValue});

    const [projectsData, setProjectsData] = useState(null);

    useEffect(() => {
        fetchProjects();
        return () => {
            clearAddProject();
            clearDeleteProject();
        }
    }, [fetchProjects, clearAddProject, clearDeleteProject]);

    useEffect(() => {
        if(!isEmpty(projects.data) && isArray(projects.data)){
            setProjectsData(
                projects.data.filter(p => {
                    var params = Object.keys(filters);
                    return !params.some(param => {
                        return filters[param] !== "" && typeof p[param] !== "undefined" && p[param].toString().toLowerCase().indexOf(filters[param].toLowerCase()) === -1;
                    })
                })
            );
        }
        else{
            setProjectsData(null);
        }
    }, [projects, filters]);

    const deleteHandler = (id) => {
        deleteProject({id})
    }

    const addProjectHandler = (_id) => {
        const project = projects.data.filter(p => p.id === _id);
        if(project.length === 0){
            return;
        }
        const {id, ...payload} = project[0];
        addProject(payload);
    }

    const ACTION_COLUMNS = [
        {
            cell: (props) => (
                <>
                    <IconButton size="small" onClick={() => {history.push(`/projects/edit/${props.id}`)}}> <EditIcon fontSize="small"/> </IconButton>
                    <IconButton size="small" onClick={() => {addProjectHandler(props.id)}}> <DuplicateIcon fontSize="small"/> </IconButton>
                    <IconButton size="small" color="secondary" onClick={() => {setDeleteId(props.id)}}> <DeleteIcon fontSize="small"/> </IconButton>
                </>
            )
        }
    ]
    const applyFiltering = (keyCode, val, selector) => {
        if(keyCode !== 13) return;
        setFilters(f => ({
            ...f,
            [selector]: val
        }));
    }

    const resetFilters = () => {
        setFilters({...initFilterValue})
    }

    const TableHeader = ({name, selector}) => (
        <div>
            <div className={classes.tableHeading}>{name}</div>
            <div className={classes.searchInputContainer}>
                <TextField name={selector} id={selector} defaultValue={filters[selector]} key={selector} onKeyUp={(e) => applyFiltering(e.keyCode, e.target.value, selector)} />
            </div>
        </div>
    );

    const COLUMNS = [
        {
            name: <TableHeader name="ID" selector="id" />,
            selector: 'id',
            width: '60px'
        },
        {
            name: <TableHeader name="Name" selector="project_name" />,
            selector: 'project_name'
        },
        {
            name: <TableHeader name="Model" selector="project_model_name" />,
            selector: 'project_model_name',
            format: ({project_model_name: val}) => val === "" ? '-' : val
        },
        {
            name: <TableHeader name="Type" selector="project_type_id" />,
            selector: 'project_type_id',
            width: '80px',
            format: ({project_type_id: val}) => val === "" ? '-' : val
        },
        {
            name: <TableHeader name="Status" selector="project_status_id" />,
            selector: 'project_status_id',
            width: '80px',
            format: ({project_status_id: val}) => val === "" ? '-' : val
        },
        {
            name: <TableHeader name="# of tasks" selector="num_tasks" />,
            selector: 'num_tasks',
            width: '80px',
            format: ({num_tasks: val}) => val === "" ? '-' : val
        },
        {
            name: <TableHeader name="% Complete" selector="complete_percent" />,
            selector: 'complete_percent',
            width: '80px',
            format: ({complete_percent: val}) => val === "" ? '-' : val
        },
        {
            name: <TableHeader name="# to reassign" selector="to_reassign" />,
            selector: 'to_reassign',
            width: '80px',
            format: ({to_reassign: val}) => val === "" ? '-' : val
        },
        {
            name: <TableHeader name='Start End' selector="project_start_date" />,
            selector: 'project_start_date',
            width: '80px',
            format: ({project_start_date: val}) => val === "" ? '-' : val
        },
        {
            name: <TableHeader name='Last Modified' selector="project_recurrence_start_date" />,
            selector: 'project_recurrence_start_date',
            width: '80px',
            format: ({project_recurrence_start_date: val}) => val === "" ? '-' : val
        },
        {
            name: <TableHeader name='End Date' selector="project_end_date" />,
            selector: 'project_end_date',
            width: '80px',
            format: ({project_end_date: val}) => val === "" ? '-' : val
        }
    ]

    return(
        <>
            <Grid container direction="row" justify="space-between">
                    <Typography component="h1" variant="h4" color="primary" gutterBottom>
                        Projects
                    </Typography>
                    <div>
                        { projects.data && <Button variant="contained" color="primary" onClick={() => downloadCSV(projects.data)}>Export</Button>}
                        {' '}
                        <Button variant="contained" color="primary" onClick={() => history.push('/projects/add')}>Add Project</Button>
                    </div>
            </Grid>

            <DeleteConfirmation 
                open={deleteId !== null} 
                handleClose={() => setDeleteId(null)} 
                onDelete={() => {deleteHandler(deleteId)}} />

            <div className="mt-20">
            
                {
                    deleteProjectDetails.data !== null &&
                    <Alert onClose={clearDeleteProject}>Project Deleted Successfully</Alert>
                }
                {
                    deleteProjectDetails.error &&
                    <Alert severity="error" onClose={clearDeleteProject}>{deleteProjectDetails.error}</Alert>
                }

                {
                    projects.loading && <Loader />
                }

                {
                    projects.error && 
                    <Alert severity="error" onClose={() => {}}>{projects.error}</Alert>
                }

                {
                    (addProjectDetails.data) &&
                    <Alert className="mt-20" onClose={clearAddProject}>Project cloned successfully</Alert>
                }

                {
                    (addProjectDetails.error) &&
                    <Alert severity="error" className="mt-20" onClose={clearAddProject}>{addProjectDetails.error}</Alert>
                }

            </div>

            {
                !isEmpty(projectsData) && (
                    <>
                        {
                            Object.values(filters).filter(v => v !== "").length > 0 && (
                                <Button onClick={resetFilters}>Clear Filters</Button>
                            )
                        }
                        <div className="mt-30">
                            <DataTable 
                                noHeader
                                highlightOnHover
                                striped
                                data={projectsData}
                                columns={[...COLUMNS, ...ACTION_COLUMNS]}    
                                responsive                        
                                pagination
                                theme="edas-console"
                                customStyles={{
                                    headCells: {
                                        style: {
                                          paddingLeft: '4px', // override the cell padding for head cells
                                          paddingRight: '4px',
                                        },
                                      },
                                      cells: {
                                        style: {
                                          paddingLeft: '4px', // override the cell padding for data cells
                                          paddingRight: '4px',
                                        },
                                    },
                                }} />
                        </div>
                    </>
                )
            }

            {
                !projects.loading && isEmpty(projectsData) && Object.values(filters).filter(v => v !== "").length > 0 && (
                    <Alert
                        action={
                            <Button color="inherit" size="small" onClick={resetFilters}>
                                Reset Filters
                            </Button>
                        }
                        severity="error"
                        >
                        No results to display for the applied filters.
                    </Alert>
                )
            }
                
        </>
    )

}

export default ProjectsList;