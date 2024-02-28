var express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Define Schema for storing file informations
const fileSchema = new mongoose.Schema({
  name: String,
  type: String,
  size: Number,
  uploadDate: { type: Date, default: Date.now },
});
const File = mongoose.model("File", fileSchema);

// Route to handle file uploads
app.post("/api/fileanalyse", upload.single("upfile"), async (req, res) => {
  const { size, originalname, mimetype } = req.file;

  try {
    // Create a new document in MongoDB for the uploaded file
    const newFile = new File({
      name: originalname,
      type: mimetype,
      size: size,
    });
    await newFile.save();

    res.json({
      name: originalname,
      type: mimetype,
      size: size,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
