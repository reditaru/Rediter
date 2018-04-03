import { ipcMain, net } from 'electron'
import FeedParser from 'feedparser'
const parseFeed = address => {
    return new Promise((resolve, reject) => {
        const options = {
            url: address
        }
        const request = net.request(options);
        request.setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
        request.setHeader('Accept', 'text/html,application/xhtml+xml');
        const feedParser = new FeedParser();
        request.on('response', (response) => {
            response.pipe(feedParser);
        })
        request.on('error', (err) => {
            reject(err);
        })
        request.end();
        let meta;
        let items = [];
        feedParser.on('readable', function() {
            let item;
            meta = this.meta;
            while (item = this.read()) {
                items.push(item);
            }
        });
        feedParser.on('error', err => {
            reject(err);
        });
        feedParser.on('end', () => {
            resolve({ meta: meta, items:items, success: true });
        });
    });
}

ipcMain.on('parse-feed', async (event, arg) => {
    event.sender.send('parse-feed-reply', await parseFeed(arg));
})
export default parseFeed;