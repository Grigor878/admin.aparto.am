const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const app = express();
const logo = "https://aparto.am/static/media/logo.c81fd539113588de5f95.png"

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/", (req, res) => {

    const filePath = path.resolve(__dirname, "../client/build", "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        data = data.replace(/__TITLE__/g, "Aparto")
            .replace(/__DESCRIPTION__/g, "Discover Property to Buy or Rent")
            .replace(/__IMAGE__/g, logo);

        res.send(data);
    });
});

app.get("/result", (req, res) => {
    const filePath = path.resolve(__dirname, "../client/build", "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        data = data.replace(/__TITLE__/g, "Aparto | Result")
            .replace(/__DESCRIPTION__/g, "Result")
            .replace(/__IMAGE__/g, logo)
            .replace(/__URL__/g, "https://aparto.am/result");

        res.send(data);
    });
});

app.get("/result/:id", (req, res) => {
    const { id } = req.params;
    const image = "1710830295685.jpg"
    const imageUrl = `https://aparto.am/api/public/images/${image}`;
    const description = "4 սենյականոց բնակարան Կ․Ուլնեցու փոոցում"

    const filePath = path.resolve(__dirname, "../client/build", "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        data = data.replace(/__TITLE__/g, `Aparto | Result | ${id}`)
            .replace(/__DESCRIPTION__/g, description)
            .replace(/__IMAGE__/g, imageUrl)
            .replace(/__URL__/g, `https://aparto.am/result/${id}`);

        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
