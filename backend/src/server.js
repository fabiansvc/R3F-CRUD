const express = require('express');
const app = express();
const port = 5000;

const uri = "mongodb+srv://root:8888@cluster0.p13usi6.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const Model = require('./model/Model');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `src/uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.post('/api/models', upload.single('model'), (req, res) => {
  const newModel = new Model({
    name: req.body.name,
    model: req.file.path
  });

  newModel.save()
    .then(model => {
      console.log('Model saved:', model);
      res.json(model);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to save model' });
    });
});

app.get('/api/models/:id', (req, res) => {
  const id = req.params.id;
  Model.findById(id)
    .then(model => {
      const modelPath = model.model;
      const filePath = `${process.cwd()}/${modelPath}`;
      res.sendFile(filePath);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to get model' });
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
