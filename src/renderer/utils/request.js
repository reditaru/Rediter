import axios from 'axios'
import auth  from './auth'
import config from '../config'
function handleError(response) {
    let promise;
    if (promise == null) {
        return { status: response.status, success: false };
    }

    return promise.then((data) => {
        data.status = response.status;
        return data;
    });
}
export default function request(url, options) {
    if (options == null) {
        options = {};
    }

    if (options.headers == null) {
        options.headers = {};
    }
    let token = auth.getAuth();
    if(token!=null)
        options.headers['Authorization'] = token;
    options.headers['Content-Type'] = 'application/json';
    options.url = config.host + url;
    options.responseType = 'json'
    return axios(options)
        .then((data) => {
            if (data == null) {
                data = {};
            }
            return data;
        })
        .catch(response => console.log(response));
}