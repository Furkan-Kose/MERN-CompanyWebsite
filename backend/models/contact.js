const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    desc: { type: String },
    address: { type: String },
    email: { type: String },
    phone: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
}, {timestamps: true});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
