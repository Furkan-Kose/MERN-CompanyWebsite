const mongoose = require('mongoose');
const slugify = require('slugify');

const projectSchema = new mongoose.Schema({
    name: { type: String },
    slug: { type: String, unique: true }, 
    img: { type: String },
    year: { type: Number },
    employer: { type: String },
    location: { type: String },
    type: { type: String },
    time: { type: String },
}, {timestamps: true});

projectSchema.pre('save', async function(next) {
    if (!this.isModified('name')) {
        return next();
    }

    this.slug = await generateUniqueSlug(this.model('Project'), this.name);
    next();
});

async function generateUniqueSlug(model, title, counter = 0) {
    let slug = slugify(title, { lower: true });

    if (counter > 0) {
        slug += `-${counter}`;
    }

    const existingProject = await model.findOne({ slug });
    if (existingProject) {
        return generateUniqueSlug(model, title, counter + 1);
    }

    return slug;
}


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
