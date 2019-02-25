const { getPhotos : get, getOnePhoto: getOne, saveImage: post, deletePhoto: deleteOne, removeOne } = require("../repositories/photos");
const cloudinary = require("../services/cloudinary");
const fs = require('fs-extra');

const getPhotos = async (req, res) =>{
    try{

        const { startDate, endDate, title, id_album } = req.query;

        const photos = await get({ startDate, endDate, title, id_album });
        if (!photos) return res.status(404).send({ message: "No images found"})
        return res.send(photos);

    }catch(err){
        console.log(err)
        return res.status(500).send(err);
    }
}

const getOnePhoto = async (req, res) =>{
    try{
        const { id } = req.params;
        const photo = await getOne({ id });
        if (!photo) return res.status(404).send({ message: "No image found"})
        return res.send(photo);

    }catch(err){
        return res.status(500).send(err);
    }
}

const savePhoto = async (req, res) =>{
    try{

        const { file } = req;
        const { title, description, id_album } = req.body;

        const path = file.path;
        const savedImage = await cloudinary.upload({ path });

        const photoData = {
            title,
            description,
            id_album,
            image_url: savedImage.url,
            dimentions: `${savedImage.width}x${savedImage.height}`,
            size: savedImage.bytes / 1024,
            public_id: savedImage.public_id
            
        };
    
        await post(photoData);

        fs.unlink(path);

        return res.send({ message: "created!" });
    

    }catch(err){
        console.log(err)
        return res.status(500).send(err);
    }

}


const deletePhoto = async (req, res) => {
    try {

        const { id } = req.params;
        await deleteOne({ id });

        return res.send({ message: "Deleted!"})
    } catch(err){
        return res.status(500).send(err);
    }
}

const removePhotoFromAlbum = async (req, res) => {
    try {

        const { id } = req.params;
        await removeOne({ id });

        return res.send({ message: "Removed!"})
    } catch(err){
        return res.status(500).send(err);
    }
}


module.exports = { getPhotos, getOnePhoto, savePhoto, deletePhoto,removePhotoFromAlbum }