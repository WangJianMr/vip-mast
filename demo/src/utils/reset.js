import axios from 'axios'
import { Message } from "element-ui"
import store from '../store/index'
const $axios = axios.create({
    baseURL: process.env.VUE_APP_DEV,
    timeout: 1000,
});


const exceptionMessage = {
    1000: '用户名或密码错误',
    3000: ' ....'
}
// // Add a request interceptor
// axios.defaults.baseURL = process.env.VUE_APP_DEV;
$axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = store.getters.SET_TOKEN
    if (token) config.headers.token = 'Bearer '+token
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
$axios.interceptors.response.use(function (response) {
    if (response.status < 400) {
        return response.data
    }
    return response;
}, function (error) {
    console.log(error, 'error');
    // if (error.response.status >= 400) {
    //     _showError(error.response.data.errorCode
    //         , error.response.data.msg)
    //     return
    // }
    return Promise.reject(error);
});
const _showError = (code = '', message) => {
    console.log(code, message);
    let title
    title = exceptionMessage[code] || message || "发生未知错误"
    Message.error(title)

}



const request = (options) => {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data || options.params
        delete options.data
    }
    $axios.defaults.baseURL = options.proxy || process.env.VUE_APP_DEV;
    return $axios(options)
}


export default request