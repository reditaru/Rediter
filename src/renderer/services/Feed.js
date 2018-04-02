import request from '../utils/request'
import electron from 'electron'
import FeedParser from 'feedparser'

export async function deleteFeed(payload) {
    return request('/api/category/' + payload.categoryId + '/' + payload.feedId, {
        method: 'DELETE'
    });
}
export async function getFeedPosts(payload) {
    return parseFeed(payload.address)
        .catch(err => {
            return { success: false }
        });
}
const parseFeed = address => {
    const options = {
        url: address
    }
    const request = electron.remote.net.request(options);
    request.setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
    request.setHeader('Accept', 'text/html,application/xhtml+xml');
    const feedParser = new FeedParser();
    request.on('response', (response) => {
        response.pipe(feedParser);
    })
    request.end();
    return new Promise((resolve, reject) => {
        let meta;
        feedParser.on('readable', function() {
            let item;
            meta = this.meta;
            while (item = this.read()) {
            }
        });
        feedParser.on('error', err => {
            reject(err);
        });
        feedParser.on('end', () => {
            resolve({ data: meta, success: true });
        });
    });
}
