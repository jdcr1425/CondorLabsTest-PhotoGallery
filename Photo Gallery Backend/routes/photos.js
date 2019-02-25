const { Router } = require('express');
const multerConfig = require("../multerConfig")
const router = Router();

const photosController = require("../controllers/photos");

router.get('/photos', photosController.getPhotos );

router.get('/photos/:id', photosController.getOnePhoto);

router.post('/photos', multerConfig() , photosController.savePhoto);

router.delete('/photos/:id', photosController.deletePhoto);

router.patch('/photos/:id', photosController.removePhotoFromAlbum);


module.exports = router;
