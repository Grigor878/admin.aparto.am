// const express = require('express');
// const path = require('path');
// const app = express();
// const port = process.env.PORT || 3001;

// app.listen(port);

// let root = path.join(__dirname, '../public_html');

// app.use(express.static(root));

// app.use(function (req, res, next) {
//     if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
//         res.sendFile('index.html', { root })
//     } else next()
// });

const express = require('express');
const path = require('path');
const rendertron = require('rendertron-middleware');  

const app = express();

const RENDERTRON_URL = 'https://render-tron.appspot.com';

app.use(
  rendertron.makeMiddleware({
    proxyUrl: RENDERTRON_URL,  
    userAgent: /googlebot|bingbot|slurp|baiduspider/i  
  })
);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/dashboard', (req, res) => {
  res.send('Dashboard is handled by a different service');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Node.js server is running on http://example.am:${PORT}`);
});

// Example API route
// app.get('/api/your-endpoint', (req, res) => {
//     res.json({ message: 'Hello from the API' });
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public_html', 'index.html'));
// });