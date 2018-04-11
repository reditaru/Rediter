import request from '../utils/request'
import electron, { ipcRenderer } from 'electron'
import FeedParser from 'feedparser'

export async function deleteFeed(payload) {
    return request('/api/category/' + payload.category + '/' + payload.id, {
        method: 'DELETE'
    });
}
export async function getFeedPosts(payload) {
    return new Promise((resolve, reject) => {
        ipcRenderer.once('parse-feed-reply', (event, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('parse-feed', payload.address);
    })
    .catch(err => {
        return { success: false }
    });
}
export async function createFeed(payload) {
    return request('/api/category/' + payload.categoryId + '/feeds', {
        method: 'POST',
        data: {
            address: payload.address
        }
    });
}
export async function getFeeds(payload) {
    return request('/api/category/' + payload.id, {
        method: 'GET'
    });
}

export async function getLocalPosts(payload) {
    return new Promise((resolve, reject) => {
        ipcRenderer.once('read-posts-reply', (event, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('read-posts', payload);
    })
    .catch(err => {
        return { success: false }
    });
}

export async function setLocalPosts(payload) {
    return new Promise((resolve, reject) => {
        ipcRenderer.once('write-posts-reply', (event, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('write-posts', payload);
    })
    .catch(err => {
        return { success: false }
    });
}