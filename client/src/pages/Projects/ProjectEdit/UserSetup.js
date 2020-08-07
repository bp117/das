import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import $ from 'jquery'; 
import './utils';
import {isEmpty, isArray, get} from 'lodash';
import {
    Button
} from '@material-ui/core'
import {
    Alert
} from '@material-ui/lab'
import {
    Loader
} from '../../../components'

import './usersetup.scss';

const UserSetup = (props) => {
    const {projectId} = useParams();
    const {
        userDetails,
        fetchUsers,
        clearFetchUsers,
        singleProjectDetails,
        editProjectDetails,
        editProject,
        clearEditProject,
        fetchSingleProject,
        clearSingleProject
    } = props;

    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchSingleProject({id: projectId});
        return () => {
            clearEditProject();
            clearSingleProject();
            clearFetchUsers();
        }
    }, [fetchUsers, fetchSingleProject, clearEditProject, clearSingleProject, clearFetchUsers, projectId]);

    const _data = useMemo(() => {
        if(!isEmpty(userDetails.data) && isArray(userDetails.data) && !isEmpty(singleProjectDetails.data)){
            const { annotators_list, reviewers_list } = singleProjectDetails.data;
            return userDetails.data.map(user => {
                const _in = [0];
                if(annotators_list.indexOf(user.id.toString()) !== -1){
                    _in.push(1);
                }
                if(reviewers_list.indexOf(user.id.toString()) !== -1){
                    _in.push(2);
                }
                return {
                    value: user.id,
                    label: user.id+' '+user.first_name + ' ' + user.last_name,
                    in: [..._in] 
                }
            })
        }
        return [];
    }, [userDetails, singleProjectDetails]);

    const reset = () => {
        clearSingleProject();
        fetchSingleProject({id: projectId});
    }

    useEffect(() => {
        if(!isEmpty(userDetails.data) && isArray(userDetails.data)){
            const plugin = $("#fieldChooser").fieldChooser(_data, {
                clone: true,
                sourceHeading: "Users",
                firstDestinationHeading: "Annotators",
                secondDestinationHeading: "Reviewers",
                sourceKey: "users",
                firstDestinationKey: "annotators",
                secondDestinationKey: "reviewers"
            });
            setSelectedUsers(plugin);
        }
    }, [userDetails, _data]);

    const fieldChooserHandler = (list) => {
        const annotators = list.annotators.map(user => user.value).join(",");
        const reviewers = list.reviewers.map(user => user.value).join(",");
        editProject({id: projectId, data: {annotators_list: annotators, reviewers_list: reviewers}});
    }

    return (
        <div>
            {userDetails.loading && <Loader />}
            {
                singleProjectDetails.loading && <Loader />
            }
            {
                singleProjectDetails.error &&
                <Alert severity="error" className="mt-20">Unable to fetch user details!</Alert>
            }
            {
                (editProjectDetails.data) &&
                <Alert className="mt-20" onClose={clearEditProject}>Project edited successfully</Alert>
            }
            {
                (editProjectDetails.error) &&
                <Alert severity="error" className="mt-20" onClose={clearEditProject}>{editProjectDetails.error}</Alert>
            }
            <div className={`mt-30 ${get(singleProjectDetails, 'data.workflow_roles', '').indexOf("reviewer") === -1 ? 'hidden-reviewer' : ''}`} id="fieldChooser"></div>
            <div className="mt-30">
                <Button onClick={() => fieldChooserHandler(selectedUsers.value())} variant="contained" color="primary" disabled={editProjectDetails.loading}>Save</Button>
                {' '}
                <Button type="button" variant="contained" color="secondary" onClick={reset}>
                    Reset
                </Button>
            </div>
        </div>
    )
}

export default UserSetup;