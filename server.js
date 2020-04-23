var express = require("express");
var path = require("path");
var fs = require("fs");


var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function dbAsArray() {
    let data = [];
    fs.readFile(path.join(__dirname, "db", "db.json"), "utf-8", (err, data) => {
        if (err) throw err;
        console.log(data);
        return JSON.parse(data);
    });
}

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
    let dbArr = dbAsArray();
    dbArr.push(note);

    fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(dbArr), (err) => {
        if(err) throw err;
        Console.log("Database updated");
    })
    res.send(note);
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Listener
// ===========================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

dbAsArray();