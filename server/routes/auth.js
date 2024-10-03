import express from 'express';
import passport from 'passport';
import { addUser } from '../models/user.js';
import passportConfig from '../config/passportConfig.js';

const router = express.Router();

// Initialize passport config
passportConfig(passport);

// Register route
router.post('/register', async (req, res) => {
    const { username, password, email, created_at, profilePhoto } = req.body;
    console.log('Registering user:', username, password, email, created_at, profilePhoto);
    try {
        const user = await addUser(username, password, email, created_at, profilePhoto);
        res.status(200).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

// Login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send(info.message || 'Login failed');
        }
        req.logIn(user, (err) => { // logIn method ensures req.user is populated
            if (err) {
                return next(err);
            }
            console.log('User logged in:', req.user); // Add this for debugging
            const response = {
                user : {
                    username : req.user.username,
                    email : req.user.email,
                    created_at : req.user.created_at,
                    id : req.user.id,
                    profilePhoto : req.user.profile_photo
                },
                message : "Logged in successfully"
            }
            return res.status(200).json(response);
        });
    })(req, res, next);
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        req.session.destroy();
        res.status(200).send('Logged out successfully');
    });
});

// Authenticated route
router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).send('Welcome to your dashboard');
    } else {
        res.status(401).send('Unauthorized');
    }
});

export default router;
