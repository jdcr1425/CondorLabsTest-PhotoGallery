const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dm9pyp7bs',
    api_key: process.env.CLOUDINARY_API_KEY || '184591634974549',
    api_secret: process.env.CLOUDINARY_API_SECRET || '84S7P4JLR_XVt3H4HlIkZOSOSGU'
});


const upload = async ({ path }) =>{
    return cloudinary.v2.uploader.upload(path);
}

module.exports = { upload }