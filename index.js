const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const router = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 4000;


// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(router);

// =======================
app.get('/', (req, res) => {
    res.send('home');
});
// =======================


// log server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
})
