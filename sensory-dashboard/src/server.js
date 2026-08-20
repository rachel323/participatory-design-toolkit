// This is the server class that handles all the routes for the dashboard

const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// Routes
const wledRoutes = require('./routes/wled');
const soundRoutes = require('./routes/sound');
const sessionRoutes = require('./routes/session');
const logRoutes = require('./routes/log');
const motorRoutes = require('./routes/motor');      //haptic



// Middleware
app.use(express.json());

// needed for HTML forms
app.use(express.urlencoded({ extended: true }));

// Admin-pagina route 
app.get('/admin', (req, res) => {
    // Optioneel: check of de user admin is
    // if (!req.session.isAdmin) {
    //     return res.redirect('/');
    // }
    res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Session middleware
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

// API routes
app.use('/api/wled', wledRoutes);
app.use('/api/sound', soundRoutes);
app.use('/api/log', logRoutes);
app.use('/api/motor', motorRoutes);         //haptic

// Session routes
app.use('/', sessionRoutes);

// Start server
app.listen(port, () => {
    console.log(`Backend draait op http://localhost:${port}`);
});