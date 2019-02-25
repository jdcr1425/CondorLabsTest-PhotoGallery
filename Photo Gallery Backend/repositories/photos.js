const isEmpty = require("lodash/isEmpty");
const Photo = require("../models/Photo");

const getPhotos = async ({ startDate, endDate, title, id_album}) => {
    let datefilters = {}, filters = {};
    if(!isEmpty(startDate)) datefilters['$gte'] = startDate;
    if(!isEmpty(endDate)) datefilters['$lte'] = endDate;

    if (!isEmpty(datefilters)){
        filters = {
            created_at: datefilters
        }
    }

    if(title) {
        filters = {
            ...filters,
            title: {
                ['$like']: `%${title}%` 
            }
        }
    }

    if(id_album) {
        filters = {
            ...filters,
            id_album
        }
    }

    return Photo.findAll({ where: filters });
}

const getOnePhoto = async ({ id }) =>{
    return Photo.findOne({where: {
        id_img: id
    }});
}

const getPhotosByAlbum = async ({ id_album }) =>{
    return Photo.findAll({ where: {
        id_album
    }});
}

const saveImage = async (body) =>{
    return Photo.create(body);
}

const deletePhoto = async ({ id })=>{
    return Photo.destroy({where: {
        id_img: id
    }})
}

const savePhotosToAlbum = async ({ id_img, id_album }) => {
    return Photo.update({ id_album },  { where: { id_img } });
}


const deleteImagesByAlbum = async ({ id_album }) => {
    return Photo.destroy({where: {
        id_album
    }})    
}


const removeOne = async ({ id }) => {
    return Photo.update({ id_album: null },  { where: { id_img : id } });
}



module.exports = { getPhotos , getOnePhoto , saveImage, deletePhoto, getPhotosByAlbum , savePhotosToAlbum, deleteImagesByAlbum, removeOne }
