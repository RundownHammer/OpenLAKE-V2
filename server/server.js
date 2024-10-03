import path from "path";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import authRoutes from './routes/auth.js';
import blogCRUDRoutes from './routes/BlogsCRUD.js';
import blogListRoutes from './routes/BlogList.js';
import cors from "cors";
import cookieParser from "cookie-parser";

const __dirname = path.resolve();

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Set up CORS
const corsOptions = {
    origin: 'https://openlake-ecbz.onrender.com', // Ensure this is the correct URL
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));

// Set up body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, '/dist')));

// Enable `trust proxy` for secure cookies when behind a proxy (e.g., Render)
app.set('trust proxy', 1);

// Session setup with dynamic secure setting
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only set secure in production
        sameSite: 'none', // Ensure cross-origin compatibility
    },
}));

// Passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/blogcrud', blogCRUDRoutes);
app.use('/bloglist', blogListRoutes);

// Serve React app for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
