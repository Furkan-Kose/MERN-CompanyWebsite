const Service = require('../models/service');
const fs = require('fs-extra');
const slugify = require('slugify');


exports.getServiceList = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getServiceBySlug = async (req, res) => {
    const { slug } = req.params;

    try {
        const service = await Service.findOne({ slug });
        if (!service) {
            return res.status(404).json({ error: 'Faaliyet alanı bulunamadı' });
        }
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.addService = async (req, res) => {
    try {
        const { name, desc } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Please upload an image file' });
        }

        const slug = slugify(name, { lower: true });

        const newService = new Service({
            name,
            desc,
            slug,
            img: req.file.path
        });

        await newService.save();
        res.json({ message: 'Faaliyet alanı başarıyla eklendi', service: newService });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};


exports.updateService = async (req, res) => {
    const { slug } = req.params;
    const { name, desc } = req.body;

    try {
        const existingService = await Service.findOne({ slug });
        if (!existingService) {
            return res.status(404).json({ error: 'Faaliyet alanı bulunamadı' });
        }

        const oldImagePath = existingService.img;

        if (req.file) {
            fs.unlinkSync(oldImagePath);
            existingService.img = req.file.path;
        }

        existingService.name = name;
        existingService.desc = desc;

        await existingService.save();

        res.json({ message: 'Faaliyet alanı başarıyla güncellendi', service: existingService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteService = async (req, res) => {
    const { slug } = req.params;

    try {
        const service = await Service.findOne({ slug });
        if (!service) {
            return res.status(404).json({ error: 'Faaliyet alanı bulunamadı' });
        }

        const imagePath = service.img;
        await fs.unlink(imagePath);

        await Service.findOneAndDelete({ slug });

        res.json({ message: 'Faaliyet alanı başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};