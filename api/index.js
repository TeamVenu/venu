const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hooray! Welcome to venu api.' });
});

router.get('/places', (req, res) => {
  retrievePlaces((error, data) => {
    if (!error) {
      res.json(data);
    } else {
      res.status(500).send();
    }
  });
});
/**
 * retrievePlaces retrieves places from our JSON file
 * @param  {function} callback
 */
function retrievePlaces(callback) {
  fs.readFile('./app/fixtures/test.json', 'utf-8', (err, content) => {
    callback(err, JSON.parse(content));
  });
}

module.exports = router;

