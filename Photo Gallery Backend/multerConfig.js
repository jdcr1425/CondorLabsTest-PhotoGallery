const path = require('path');
const multer = require('multer');

const storage = () => {
  const multerSettings = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + path.extname(file.originalname));
    }
  });
  return multer({ storage: multerSettings }).single('file');
};

module.exports = storage;
