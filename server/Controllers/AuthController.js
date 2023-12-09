import User from '../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    console.log(req.body.username, req.body.firstname, req.body.lastname);
    
    const exististingUser = await User.findOne({ username: req.body.username });
    if (exististingUser) {
        return res.status(500).json({
            message: "User already exists!"
        })
    }
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const user = new User({
        username: req.body.username, 
        password: hashedPassword, 
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        email: req.body.email,
        signature: req.body.signature
    });

    try {
        await user.save();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '4h' });

    res.status(200).json({ user: user._doc, token: token, tokenExpiration: 4 });
}

export const loginUser = async (req, res) => {

    try {
        const userWithPassword = await User.findOne({username: req.body.username});
    
        if (!userWithPassword) {
            return res.status(500).json({ message: "User doesn't exist!" })
        }
    
        const isEqual = await bcrypt.compare(req.body.password, userWithPassword.password);
    
        if (!isEqual) {
            return res.status(401).json({ message: "Password doesn't match." })
        }

        const { password, ...user } = userWithPassword._doc;

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '4h' })
    
        return res.status(200).json({ user, token: token, tokenExpiration: 4 });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message })
    }
}