import axios from 'axios'
const $axios = axios.create({
    baseURL: process.env.VUE_APP_DEV,
    timeout: 1000,
});
// // Add a request interceptor
// axios.defaults.baseURL = process.env.VUE_APP_DEV;
$axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.token = window.localStorage.getItem('token')
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
$axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

const request = (options) => {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data || options.params
        delete options.data
    }
    return $axios(options)
}


export default request