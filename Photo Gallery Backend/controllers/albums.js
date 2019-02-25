const { getAlbums: get, getOneAlbum: getOne, saveAlbum: post, deleteAlbum: deleteOne } = require("../repositories/albums");
const { getPhotosByAlbum, savePhotosToAlbum, deleteImagesByAlbum } = require("../repositories/photos")

const cloudinary = require("../services/cloudinary");
const fs = require('fs-extra');

const getAlbums = async (req, res) =>{
    try{

        const albums = await get();
        if (!albums) return res.status(404).send({ message: "No albums found"})
        return res.send(albums);

    }catch(err){
        return res.status(500).send(err);
    }
}

const getAlbumPhotos = async (req,res) =>{
    try{

        const { id } = req.params;
        const photos = await getPhotosByAlbum({ id_album: id });
        if (!photos) return res.status(404).send({ message: "No photos found for this album"})

        const dataMapped = photos.map(photo =>{
            return {
                    id_img: photo.id_img,
                    title: photo.title,
                    description: photo.description,
                    dimentions: photo.dimentions,
                    size: photo.size,
                    image_url: photo.image_url,
                    public_id: photo.public_id,
                    created_at: photo.created_at,
                    update_at: photo.update_at,
            }
        })
        return res.send(dataMapped);

    }catch(err){
        return res.status(500).send(err);
    }

}

const getOneAlbum = async (req, res) =>{
    try{
        const { id } = req.params;
        const album = await getOne({ id });
        if (!album) return res.status(404).send({ message: "No album found"})
        return res.send(album);

    }catch(err){
        return res.status(500).send(err);
    }
}

const saveAlbum = async (req, res) =>{
    try{

        const { file } = req;
        const { name, description } = req.body;
    
        const path = file.path;
        const savedImage = await cloudinary.upload({ path });

        const albumData = {
            name,
            description,
            background_image_url: savedImage.url
        };
    
        await post(albumData);

        fs.unlink(path);

        return res.send({ message: "Created!"});
    

    }catch(err){
        return res.status(500).send(err);
    }

}


const saveAlbumPhotos = async (req,res ) =>{
    try{

        const { id } = req.params;
        const { photosIds } = req.body;
        
        photosIds.forEach(async photo =>{
            await savePhotosToAlbum({ id_img: photo, id_album: id}); 
        });

    }catch(err){
        return res.status(500).send(err);
    }
}


const deleteAlbum = async (req, res) => {
    try {

        const { id } = req.params;

        await deleteImagesByAlbum({ id_album: id });   

        await deleteOne({ id });

        return res.send({message:'Album deleted'});

    } catch(err){
        return res.status(500).send(err);
    }
}

module.exports = { getAlbums, getOneAlbum, saveAlbum, deleteAlbum, getAlbumPhotos , saveAlbumPhotos }