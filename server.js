const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Middleares
const middleares = require("./middleware/middleware");
middleares(app);

// Routers
const routers = require("./router/router");
routers(app);

// Database connacted
const connectDB = require("./config/DB");
connectDB();

// Upload Endpoint
app.post("/upload", (req, res, next) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  file.name = `${uuidv4()}.png`;
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    next();
  });
});

app.post("/remove", (req, res) => {
  const { picPath } = req.body;
  fs.unlink(`${__dirname}/client/public${picPath}`, function (err) {
    if (err) throw err;
    // if no error, file has been deleted successfully
    console.log("File deleted!");
  });
  res.json("body");
});

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// App start on port 5000
const PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log(`Server Start on Port ${PORT}`));
