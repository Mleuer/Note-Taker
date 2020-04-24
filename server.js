var express = require("express");
var path = require("path");
var fs = require("fs");


var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "db", "db.json"), "utf-8", (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.post("/api/notes", function (req, res) {
    const note = req.body;

    fs.readFile(path.join(__dirname, "db", "db.json"), "utf-8", (err, data) => {
        if (err) throw err;

        let dbArray = [];
        if (data) {
            dbArray = JSON.parse(data);
        }

        note.id = dbArray.length + 1;
        dbArray.push(note);

        fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(dbArray), (err) => {
            if (err) throw err;
            Console.log("Database updated");
        })
    });
    res.send(note);
});

app.delete("/api/notes/:id", function (req, res) {
    const id = parseInt(req.params.id);

    fs.readFile(path.join(__dirname, "db", "db.json"), "utf-8", (err, data) => {
        if (err) throw err;

        let dbArray = [];
        if (data) {
            dbArray = JSON.parse(data);
        }
        dbArray = dbArray.filter(element => {
            return element.id !== id;
        });
        console.log(dbArray);

        fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(dbArray), (err) => {
            if (err) throw err;
            console.log("Database updated");
            res.sendStatus(200);
        })
    });
});


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Listener
// ===========================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
