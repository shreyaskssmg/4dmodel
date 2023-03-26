const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();
const PORT =  process.env.PORT || 5000;
const cors = require('cors')


app.use(cors({
    origin: "*",
}))

app.get('/user', (req, res) => {
    res.json({name:"Kyle",color:"white"})
})


app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const file = path.join(__dirname, 'assets', 'models', filename);
    res.download(file);
  });
  



app.use(fileUpload());

// Handle POST request to upload file
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  let file = req.files.file;

  // Use the mv() method to place the file in the server's directory
  file.mv(path.join(__dirname, '/assets/models/', file.name), function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});
  

app.listen(PORT, () => {
  console.log('Server is running on port 5000');
});




