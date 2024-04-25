const User = require('../models/user');
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (user) {
            const token = jwt.sign({ username: user.username, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Giriş başarılı', token });
        } else {
            res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

