import fs from 'path';

function relativePath(path) {
    return fp.join(__dirname, path);
}

export default relativePath;