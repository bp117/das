import axios from 'axios';

export const usersApi = () => {
    return axios.get('/v1/api/users/')
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}

export const singleUserApi = (payload) => {
    return axios.get(`/v1/api/users/${payload.id}/`)
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}

export const editUserApi = (payload) => {
    return axios.put(`/v1/api/users/${payload.id}/`, payload.data)
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}

export const deleteUserApi = (payload) => {
    return axios.delete(`/v1/api/users/${payload.id}/`)
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}

export const addUserApi = (payload) => {
    return axios.post(`/v1/api/users/`, payload)
    .then(res => {
        return res.data;
    }).catch(error => {
        throw new Error(error.detail);
    });
}