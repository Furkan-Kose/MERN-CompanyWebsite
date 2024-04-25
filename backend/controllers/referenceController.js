const Reference = require('../models/reference');
const fs = require('fs-extra');


exports.getReferenceList = async (req, res) => {
    try {
        const references = await Reference.find();
        res.json(references);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getReferenceById = async (req, res) => {
    const { id } = req.params;

    try {
        const reference = await Reference.findById(id);
        if (!reference) {
            return res.status(404).json({ error: 'Referans bulunamadı' });
        }
        res.json(reference);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.addReference = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload an image file' });
        }

        const newReference = new Reference({
            img: req.file.path
        });

        await newReference.save();
        res.json({ message: 'Referans başarıyla eklendi', reference: newReference });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateReference = async (req, res) => {
    const { id } = req.params;

    try {
        const existingReference = await Reference.findById(id);
        if (!existingReference) {
            return res.status(404).json({ error: 'Referans bulunamadı' });
        }

        const oldImagePath = existingReference.img;

        if (req.file) {
            fs.unlinkSync(oldImagePath);
            existingReference.img = req.file.path;
        }

        await existingReference.save();

        res.json({ message: 'Referans başarıyla güncellendi', reference: existingReference });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteReference = async (req, res) => {
    const { id } = req.params;

    try {
        const reference = await Reference.findById(id);
        if (!reference) {
            return res.status(404).json({ error: 'Referans bulunamadı' });
        }

        const imagePath = reference.img;
        await fs.unlink(imagePath);

        await Reference.findByIdAndDelete(id);

        res.json({ message: 'Referans başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
