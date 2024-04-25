const Contact = require('../models/contact');

exports.getContactInfo = async (req, res) => {
    try {
        const contactInfo = await Contact.find();
        if (!contactInfo) {
            return res.status(404).json({ error: 'İletişim bilgileri bulunamadı' });
        }
        res.json(contactInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateContactInfo = async (req, res) => {
    try {
        const { desc, address, email, phone, facebook, instagram, linkedin } = req.body;

        const contactInfo = await Contact.findOne();
        if (!contactInfo) {
            
            const newContactInfo = new Contact({
                desc,
                address,
                email,
                phone,
                facebook,
                instagram,
                linkedin
            });
            await newContactInfo.save();
            return res.json({ message: 'İletişim bilgileri başarıyla eklendi', contactInfo: newContactInfo });
        }

        contactInfo.desc = desc;
        contactInfo.address = address;
        contactInfo.email = email;
        contactInfo.phone = phone;
        contactInfo.facebook = facebook;
        contactInfo.instagram = instagram;
        contactInfo.linkedin = linkedin;

        await contactInfo.save();

        res.json({ message: 'İletişim bilgileri başarıyla güncellendi', contactInfo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
