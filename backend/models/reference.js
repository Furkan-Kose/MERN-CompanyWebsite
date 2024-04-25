const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    img: { type: String },
}, {timestamps: true});

const Reference = mongoose.model('Reference', referenceSchema);

module.exports = Reference;
