import request from '../utils/request'

export async function login(payload) {
    return request('/api/login', {
        method: 'POST',
        data: {
            ...payload
        }
    });
}
export async function register(payload) {
    return request('/api/register', {
        method: 'POST',
        data: {
            ...payload
        }
    });
}
export async function logout(payload) {
    return request('/api/logout', {
        method: 'POST',
        data: {
            ...payload
        }
    })
}