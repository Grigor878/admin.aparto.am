const express = require('express')
const path = require('path')
const fs = require('fs')

const PORT = 5000

const app = express()

app.get("/", (req, res) => {
    const filePath = path.resolve(__dirname, "./build", "index.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return console.log(err)
        }

        data = data.replace(/__TITLE__/g, "Aparto")
            .replace(/__DESCRIPTION__/g, "Discover Property to Buy or Rent")
            .replace(/__IMAGE__/g, "https://aparto.am/static/media/logo.c81fd539113588de5f95.png")

        res.send(data)
    })
})

app.get("/result", (req, res) => {
    const filePath = path.resolve(__dirname, "./build", "index.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return console.log(err)
        }

        data = data.replace(/__TITLE__/g, "Aparto | Result")
            .replace(/__DESCRIPTION__/g, "Result")
            .replace(/__IMAGE__/g, "")
            .replace(/__URL__/g, "https://aparto.am/result")

        res.send(data)
    })
})

app.use(express.static(path.resolve(__dirname, "./build")));

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
})