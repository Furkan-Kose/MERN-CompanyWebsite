const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');


router.get('/projects', projectController.getProjectList);

router.get('/projects/:slug', projectController.getProjectBySlug);

router.post('/projects', authMiddleware.authenticateUser, upload.single('img'), projectController.addProject);

router.put('/projects/:slug', authMiddleware.authenticateUser, upload.single('img'), projectController.updateProject);

router.delete('/projects/:slug', authMiddleware.authenticateUser, projectController.deleteProject);

module.exports = router;
