import axios from 'axios';

export const rolesApi = () => {
    return axios.get('/v1/api/roles/')
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}

export const singleRoleApi = (payload) => {
    return axios.get(`/v1/api/roles/${payload.id}/`)
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}

export const editRoleApi = (payload) => {
    return axios.put(`/v1/api/roles/${payload.id}/`, payload.data)
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}

export const deleteRoleApi = (payload) => {
    return axios.delete(`/v1/api/roles/${payload.id}/`)
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}

export const addRoleApi = (payload) => {
    return axios.post(`/v1/api/roles/`, payload)
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}