const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middlewares/auth');

router.get('/contact', contactController.getContactInfo);

router.put('/contact', authMiddleware.authenticateUser, contactController.updateContactInfo);

module.exports = router;
