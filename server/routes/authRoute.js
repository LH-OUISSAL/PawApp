import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import authenticate from '../middlewares/auth.js';

const router = express.Router();

//Sign up
    router.post('/signup', async (req, res) => {
        const { name, email, password, address } = req.body;
        console.log( {
            name: name,
            email: email,
            address: address
            });
    
        try {
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }
    
        const newUser = new User({ name, email, password, address });
    
        await newUser.save();
    
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        res.status(201).json({
            token,
            user: {
            name: newUser.name,
            email: newUser.email,
            address: newUser.address
            },
        });
        
        
        } catch (err) {
        res.status(500).json({ message: 'Server error' ,name:name,email:email,address:address,password:password });
        }
    });



//Log in
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
    
        try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        res.json({ token, user: { name: user.name, email: user.email, address: user.address } });
        } catch (err) {
        res.status(500).json({ message: 'Server error' });
        }
    });

//Log out
    router.post('/logout', (req, res) => {
        // Invalidate the token on the client-side, since JWTs are stateless
        res.status(200).json({ message: 'Logged out successfully' });
    });




// Update password route
    router.post('/update-password', authenticate, async (req, res) => {
        const { oldPassword, newPassword, confirmPassword } = req.body;
    
        if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'New password and confirmation do not match' });
        }
    
        try {
        const user = await User.findById(req.userId);
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }
    
        user.password = await bcrypt.hash(newPassword, 10);
    
        await user.save();
    
        res.status(200).json({ message: 'Password updated successfully' });
        } catch (err) {
        res.status(500).json({ message: 'Server error' });
        }
    });
    

export default router