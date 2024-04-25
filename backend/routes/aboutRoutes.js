const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const upload = require('../middlewares/upload');
const authMiddleware = require('../middlewares/auth');


router.get('/about', aboutController.getAboutInfo);

router.put('/about', authMiddleware.authenticateUser, upload.single("img"), aboutController.updateAboutInfo);

module.exports = router;
