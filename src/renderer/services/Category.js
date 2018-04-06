import request from '../utils/request'

export async function getCategories() {
    return request('/api/categories', {
        method: 'GET'
    });
}
export async function getCategory(payload) {
    return request('/api/category/' + payload.id, {
        method: 'GET'
    });
}
export async function updateCategory(payload) {
    return request('/api/category/' + payload.id, {
        method: 'PUT',
        data: {
            name: payload.name
        }
    });
}
export async function deleteCategory(payload) {
    return request('/api/category/' + payload.id, {
        method: 'DELETE'
    });
}
export async function createCategory(payload) {
    return request('/api/categories', {
        method: 'POST',
        data: {
            ...payload
        }
    });
}