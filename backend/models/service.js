const mongoose = require('mongoose');
const slugify = require('slugify');

const serviceSchema = new mongoose.Schema({
    name: { type: String },
    img: { type: String },
    desc: { type: String },
    slug: { type: String, unique: true }
}, {timestamps: true});



serviceSchema.pre('save', async function(next) {
    if (!this.isModified('name')) {
        return next();
    }

    this.slug = await generateUniqueSlug(this.model('Service'), this.name);
    next();
});

async function generateUniqueSlug(model, title, counter = 0) {
    let slug = slugify(title, { lower: true });

    if (counter > 0) {
        slug += `-${counter}`;
    }

    const existingService = await model.findOne({ slug });
    if (existingService) {
        return generateUniqueSlug(model, title, counter + 1);
    }

    return slug;
}

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
