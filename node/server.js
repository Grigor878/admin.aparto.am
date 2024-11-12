const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.listen(port);

let root = path.join(__dirname, '../public_html');

app.use(express.static(root));

app.use(function (req, res, next) {
    if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
        res.sendFile('index.html', { root })
    } else next()
});

// Example API route
// app.get('/api/your-endpoint', (req, res) => {
//     res.json({ message: 'Hello from the API' });
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public_html', 'index.html'));
// });