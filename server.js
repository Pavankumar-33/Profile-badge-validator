
const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'publicFiles' directory
app.use(express.static('publicFiles'));

// Handle file upload
app.post('/upload', upload.single('avatar'), (req, res) => {
  res.send('File uploaded!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
