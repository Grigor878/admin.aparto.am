const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

const website = "https://aparto.am/";
const logo = `${website}static/media/logo.c81fd539113588de5f95.png`;
const propertyUrl = `${website}api/public/api/getInterfaceProperties/`;
const imageUrl = `${website}api/public/images/`;

const filePath = path.resolve(__dirname, "../client/build", "index.html");

app.use(express.static(path.resolve(__dirname, "../client/build")));

function serveHTML(req, res, title, description, image, url) {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        data = data.replace(/__TITLE__/g, title)
            .replace(/__DESCRIPTION__/g, description)
            .replace(/__IMAGE__/g, image)
            .replace(/__URL__/g, url);

        res.send(data);
    });
}

// Serve result by id page in server side
app.get("/result/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(`${propertyUrl}${id}`);
        const responseData = response?.data;

        const homeId = responseData?.home_id;
        const title = `Aparto | Result - ${homeId}`
        const description = responseData?.en[0]?.fields[2]?.value;
        const image = imageUrl + responseData?.photo[0]?.name;
        const url = req.protocol + '://' + req.get('host') + req.originalUrl;

        serveHTML(req, res, title, description, image, url);
    } catch (error) {
        console.error("Error fetching data from the API:", error);
        return res.status(500).send('Internal Server Error');
    }
});

// Serve other pages as usual
app.get("*", (req, res) => {
    const title = "Aparto | " + req.originalUrl.replace(/^\/+/, '').toLocaleUpperCase();
    const description = "Discover Property to Buy or Rent";
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;

    serveHTML(req, res, title, description, logo, url);
});

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});


// data = data.replace(/<meta.*?>/g, '');