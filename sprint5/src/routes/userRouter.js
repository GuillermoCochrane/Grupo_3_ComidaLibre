const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({  
        destination: function (req, file, cb) {
            let imgAdress = path.join(__dirname,'../../public/images/avatar') ;
            cb(null, imgAdress);
        },
        filename: function (req, file, cb) {
            let newName = "img-user" + Date.now() + path.extname(file.originalname);
            cb(null, newName );
        },
})

var upload= multer({storage: storage});

const userController = require('../controllers/userController');

router.get('/', userController.profile);

router.get('/login', userController.log);
router.post('/login', userController.validate);

router.get('/register', userController.reg);
router.post('/register', userController.create);

router.get('/edit/:id', userController.edit); 
router.put('/edit/:id',upload.single('image'), userController.update); 


module.exports = router;