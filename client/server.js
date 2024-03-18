// const express = require('express')
// const path = require('path')
// const fs = require('fs')

// const PORT = 5000

// const app = express()

// app.use(express.static(path.resolve(__dirname, "./build")));

// app.get("/", (req, res) => {
//     const filePath = path.resolve(__dirname, "./build", "index.html")
//     fs.readFile(filePath, "utf8", (err, data) => {
//         if (err) {
//             return console.log(err)
//         }

//         data = data.replace(/__TITLE__/g, "Aparto")
//             .replace(/__DESCRIPTION__/g, "Discover Property to Buy or Rent")
//             .replace(/__IMAGE__/g, "https://aparto.am/static/media/logo.c81fd539113588de5f95.png")

//         res.send(data)
//     })
// })

// app.get("/result", (req, res) => {
//     const filePath = path.resolve(__dirname, "./build", "index.html")
//     fs.readFile(filePath, "utf8", (err, data) => {
//         if (err) {
//             return console.log(err)
//         }

//         data = data.replace(/__TITLE__/g, "Aparto | Result")
//             .replace(/__DESCRIPTION__/g, "Result")
//             .replace(/__IMAGE__/g, "")
//             .replace(/__URL__/g, "https://aparto.am/result")

//         res.send(data)
//     })
// })

// app.listen(PORT, () => {
//     console.log("Server is listening on port " + PORT);
// })

const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const app = express();

// Serve static files from the build folder
app.use(express.static(path.resolve(__dirname, "./build")));

// Handle dynamic content for "/"
app.get("/", (req, res) => {
    // Read the index.html file
    const filePath = path.resolve(__dirname, "./build", "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        // Replace placeholders with actual values
        data = data.replace(/__TITLE__/g, "Aparto")
                   .replace(/__DESCRIPTION__/g, "Discover Property to Buy or Rent")
                   .replace(/__IMAGE__/g, "https://aparto.am/static/media/logo.c81fd539113588de5f95.png");

        res.send(data);
    });
});

// Handle dynamic content for "/result"
app.get("/result", (req, res) => {
    // Read the index.html file
    const filePath = path.resolve(__dirname, "./build", "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        // Replace placeholders with actual values
        data = data.replace(/__TITLE__/g, "Aparto | Result")
                   .replace(/__DESCRIPTION__/g, "Result")
                   .replace(/__IMAGE__/g, "")
                   .replace(/__URL__/g, "https://aparto.am/result");

        res.send(data);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
