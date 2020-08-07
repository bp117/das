import axios from 'axios';

export const projectsApi = () => {
    return axios.get('/v1/api/project-details/')
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}

export const singleProjectApi = (payload) => {
    return axios.get(`/v1/api/project-details/${payload.id}/`)
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}

export const editProjectApi = (payload) => {
    return axios.patch(`/v1/api/project-details/${payload.id}/`, payload.data)
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}

export const deleteProjectApi = (payload) => {
    return axios.delete(`/v1/api/project-details/${payload.id}/`)
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}

export const addProjectApi = (payload) => {
    return axios.post(`/v1/api/project-details/`, payload)
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}