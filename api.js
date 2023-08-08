const express = require('express');
const multer = require('multer');

const app = express();
const PORT = 4000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  //write upload code tosave the file to public folder
  
  res.json([
    {
        "step": "step1",
        "narrative": "this is narrative for step1"
    },
    {
        "step": "step2",
        "narrative": "this is narrative for step2"
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
