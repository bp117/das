import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.timeout = 4000;
axios.interceptors.response.use(res => {
    return res;
}, err => {
    if(err.response.status === 401) {
        window.location = "/";
    }
    if(err.response.status === 400) {
        return Promise.reject({detail: JSON.stringify(err.response.data)})
    }
    
    return Promise.reject(err)
});