const express = require('express');
const router = express.Router();
const referenceController = require('../controllers/referenceController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');


router.get('/references', referenceController.getReferenceList);

router.get('/references/:id', referenceController.getReferenceById);

router.post('/references', authMiddleware.authenticateUser, upload.single('img'), referenceController.addReference);

router.put('/references/:id', authMiddleware.authenticateUser, upload.single('img'), referenceController.updateReference);

router.delete('/references/:id', authMiddleware.authenticateUser, referenceController.deleteReference);

module.exports = router;
