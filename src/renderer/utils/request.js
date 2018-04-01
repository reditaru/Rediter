import axios from 'axios'
import auth  from './auth'
function handleError(response) {
    if (promise == null) {
        return { status: response.status, success: false };
    }

    return promise.then((data) => {
        data.status = response.status;
        return data;
    });
}
export function request(url, options) {
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
    options.url = url;
    options.responseType = 'json'
    return axios(options)
        .then((data) => {
            if (data == null) {
                data = {};
            }
            return data;
        })
        .catch(response => handleError(response));
}