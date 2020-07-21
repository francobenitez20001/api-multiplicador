const path = require('path');
const {Storage} = require('@google-cloud/storage');
const {format} = require('util');
const {config} = require('../config/index');

const googleCloud = new Storage({
  keyFilename:path.join(__dirname,'../google-cloud-settings.json'),
  projectId:config.idProjectGoogleCloud
});

const bucket = googleCloud.bucket(config.bucketGoogleCloud);

class CloudStorage{

    async upload(file){
        return new Promise((resolve,reject)=>{
            const blob = bucket.file(file.originalname);
            const blobStream = blob.createWriteStream();
            blobStream.on('error', (err) => {
                reject(err)
            });
            
            blobStream.on('finish', async() => {
                resolve(format(
                  `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                ));
            });
            blobStream.end(file.buffer);
        })
    }

    async delete(file){
        const fileDelete = bucket.file(file);
        return fileDelete.delete();
    }
}

module.exports = CloudStorage;