const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');


router.get('/services', serviceController.getServiceList);

router.get('/services/:slug', serviceController.getServiceBySlug);

router.post('/services', authMiddleware.authenticateUser, upload.single('img'), serviceController.addService);

router.put('/services/:slug', authMiddleware.authenticateUser, upload.single('img'), serviceController.updateService);

router.delete('/services/:slug', authMiddleware.authenticateUser, serviceController.deleteService);

module.exports = router;
