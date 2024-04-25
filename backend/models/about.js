const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    img: { type: String },
    desc: { type: String },
}, {timestamps: true});

const About = mongoose.model('About', aboutSchema);

module.exports = About;
