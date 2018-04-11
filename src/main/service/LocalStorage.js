import electron, { ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'
const userPath = electron.app.getPath('userData');
const postPath = path.join(userPath, "posts");
if (!fs.existsSync(postPath)) {
    fs.mkdirSync(postPath);
}
function getLocalPosts(feed) {
    const file = path.join(postPath, feed.id + '.json');
    let result = { success: false };
    if (fs.existsSync(file)) {
        result = { res: JSON.parse(fs.readFileSync(file)), success: true };
    }
    return result;
}

function writeLocalPosts(feed, posts) {
    const file = path.join(postPath, feed + '.json');
    fs.writeFileSync(file, JSON.stringify(posts));
}

ipcMain.on('read-posts', async (event, arg) => {
    let result;
    try{
        result = await getLocalPosts(arg);
    }
    catch (err) {
        result = { success: false, err };
    }
    event.sender.send('read-posts-reply', result);
});
ipcMain.on('write-posts', async (event, arg) => {
    let result = true;
    Object.keys(arg).every(async (key) => {
        let flag = true;
        try{
            await writeLocalPosts(key, arg[key]);
        }
        catch (err) {
            result = false;
            flag = false;
        }
        return flag;
    })
    event.sender.send('write-posts-reply', { success: result });
});
