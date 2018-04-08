const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.post('/', (req, res) => {
  console.log(req.body.location);
  res.send('Hello');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
