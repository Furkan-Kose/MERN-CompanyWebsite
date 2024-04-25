const Project = require('../models/Project');
const fs = require('fs-extra');
const slugify = require('slugify');


exports.getProjectList = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getProjectBySlug = async (req, res) => { 
    const { slug } = req.params;

    try {
        const project = await Project.findOne({ slug });
        if (!project) {
            return res.status(404).json({ error: 'Proje bulunamadı' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.addProject = async (req, res) => {
    try {
        const { name, year, employer, location, type, time } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Please upload an image file' });
        }

        const slug = slugify(name, { lower: true }); 

        const newProject = new Project({
            name,
            year,
            employer,
            location,
            type,
            time,
            img: req.file.path,
            slug,
        });
        
        await newProject.save();
        res.json({ message: 'Proje başarıyla eklendi', project: newProject });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};



exports.updateProject = async (req, res) => {
    const { slug } = req.params;
    const { name, year, employer, location, type, time } = req.body;

    try {
        const existingProject = await Project.findOne({ slug });
        if (!existingProject) {
            return res.status(404).json({ error: 'Proje bulunamadı' });
        }

        const oldImagePath = existingProject.img;

        if (req.file) {
            fs.unlinkSync(oldImagePath);
            existingProject.img = req.file.path;
        }

        existingProject.name = name;
        existingProject.year = year;
        existingProject.employer = employer;
        existingProject.location = location;
        existingProject.type = type;
        existingProject.time = time;

        await existingProject.save();

        res.json({ message: 'Proje başarıyla güncellendi', project: existingProject });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteProject = async (req, res) => {
    const { slug } = req.params;

    try {
        const project = await Project.findOne({ slug });
        if (!project) {
            return res.status(404).json({ error: 'Proje bulunamadı' });
        }

        const imagePath = project.img;
        await fs.unlink(imagePath);

        await Project.findOneAndDelete({ slug });

        res.json({ message: 'Proje başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};