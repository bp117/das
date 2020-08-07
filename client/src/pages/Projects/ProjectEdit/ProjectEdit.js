import React, {useState} from 'react';
import {
    Typography,
    Stepper,
    Step,
    StepButton,
} from '@material-ui/core';
import BasicSetup from './BasicSetup';
import UserSetup from './UserSetup';

const ProjectEdit = (props) => {
    const {
        projectDetails: {
            singleProject: singleProjectDetails,
            editProject: editProjectDetails
        },
        projectsActions: {
            editProject,
            clearEditProject,
            fetchSingleProject,
            clearSingleProject
        },
        userDetails: {
            users: userDetails
        },
        usersActions: {
            fetchUsers,
            clearUsers
        }
    } = props;

    const [activeStep, setActiveStep] = useState(0);

    return (
        <>
            <Typography component="h1" variant="h4" color="primary" gutterBottom>
                Edit Project
            </Typography>

            <Stepper nonLinear activeStep={activeStep}>
                {['Basic Setup', 'User Setup', 'Label Allocation', 'Data Source Setup', 'Data Allocation'].map((label, index) => (
                    <Step key={label}>
                        <StepButton onClick={() => {
                            if([0,1].includes(index)){
                                setActiveStep(index)
                            }
                        }}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            {
                activeStep === 0 && (
                    <BasicSetup 
                        singleProjectDetails={singleProjectDetails}
                        editProjectDetails={editProjectDetails}
                        editProject={editProject}
                        clearEditProject={clearEditProject}
                        fetchSingleProject={fetchSingleProject}
                        clearSingleProject={clearSingleProject}
                        setActiveStep={setActiveStep} />
                )
            }

            {
                activeStep === 1 && (
                    <div className="mt-30">
                        <UserSetup
                            userDetails={userDetails}
                            fetchUsers={fetchUsers}
                            clearFetchUsers={clearUsers}
                            singleProjectDetails={singleProjectDetails}
                            editProjectDetails={editProjectDetails}
                            editProject={editProject}
                            clearEditProject={clearEditProject}
                            fetchSingleProject={fetchSingleProject}
                            clearSingleProject={clearSingleProject} />
                    </div>
                )
            }
            


        </>
    )
}

export default ProjectEdit;