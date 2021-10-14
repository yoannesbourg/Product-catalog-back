
// Required modules
const express = require("express");
const app = express();

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const multer = require('multer');
const { uploadFile } = require("../../service/AwsService");
const upload = multer({dest: 'uploads/'});

const { uploadFIle, getFileStream } = require('../../service/AwsService');

app.get('/:key', (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
})

app.post("/", upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        const result = await uploadFile(file);
        await unlinkFile(file.path);
        console.log(result);
        return res.json(result);
    } catch (error) {
        console.error('error', error.message)
        return res.json({
            status: 500,
            error: 'Error aws'
        });
    }
})

module.exports = app