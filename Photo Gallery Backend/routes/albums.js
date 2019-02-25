const { Router } = require('express');
const multerConfig = require("../multerConfig")
const router = Router();

const albumsController = require("../controllers/albums");

router.get('/albums', albumsController.getAlbums );

router.get('/albums/:id', albumsController.getOneAlbum);

router.get('/albums/:id/photos', albumsController.getAlbumPhotos);

router.post('/albums', multerConfig(), albumsController.saveAlbum);

router.post('/albums/:id/photos', albumsController.saveAlbumPhotos);

router.delete('/albums/:id', albumsController.deleteAlbum);


module.exports = router;
