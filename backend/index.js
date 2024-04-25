const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const referenceRoutes = require('./routes/referenceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const path = require('path');

dotenv.config();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', projectRoutes);
app.use('/api', serviceRoutes);
app.use('/api', referenceRoutes);
app.use('/api', contactRoutes);
app.use('/api', aboutRoutes);
app.use('/api', userRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connection successful'))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
