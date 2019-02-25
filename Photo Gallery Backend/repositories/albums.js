const Album = require("../models/Album");

const getAlbums = async () => {
    return Album.findAll();
}

const getOneAlbum = async ({ id }) =>{
    return Album.findOne({where: {
        id_album: id
    }});
}

const saveAlbum = async (body) =>{
    return Album.create(body);
}

const deleteAlbum = async ({ id })=>{
    return Album.destroy({where: {
        id_album: id
    }})
}

module.exports = { getAlbums , getOneAlbum , saveAlbum, deleteAlbum}
