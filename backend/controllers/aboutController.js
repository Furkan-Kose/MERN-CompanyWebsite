const About = require('../models/about');
const fs = require('fs-extra');

exports.getAboutInfo = async (req, res) => {
    try {
        const aboutInfo = await About.find();
        if (!aboutInfo) {
            return res.status(404).json({ error: 'Hakkımda bilgisi bulunamadı' });
        }
        res.json(aboutInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateAboutInfo = async (req, res) => {
    try {
      const { desc } = req.body;
  
      const aboutInfo = await About.findOne();
      if (!aboutInfo) {
        const newAboutInfo = new About({
          desc
        });
        await newAboutInfo.save();
        return res.json({ message: 'Hakkımızda bilgileri başarıyla eklendi', aboutInfo: newAboutInfo });
      }
  
      aboutInfo.desc = desc;
  
        if (req.file) {
            if (aboutInfo.img) {
                fs.unlinkSync(aboutInfo.img);
            }

            aboutInfo.img = req.file.path;
        }

  
      await aboutInfo.save();
  
      res.json({ message: 'Hakkımızda bilgileri başarıyla güncellendi', aboutInfo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
};