const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hooray! Welcome to venu api.' });
});

router.get('/test', (req, res) => {
  retrieveTest((error, data) => {
    if (!error) {
      res.json(data);
    } else {
      res.status(500).send();
    }
  });
});

router.get('/test-data', (req, res) => {
  retrieveTestData((error, data) => {
    if (!error) {
      res.json(data);
    } else {
      res.status(500).send();
    }
  });
});

router.get('/places', (req, res) => {
  retrievePlaceData((error, data) => {
    if (!error) {
      res.json(data);
    } else {
      res.status(500).send();
    }
  });
});

/**
 * retrieveTest retrieves places from our JSON file
 * @param  {function} callback
 */
function retrieveTest(callback) {
  fs.readFile('./app/fixtures/test.json', 'utf-8', (err, content) => {
    callback(err, JSON.parse(content));
  });
}

/**
 * retrieveTestData retrieves places from our JSON file
 * @param  {function} callback
 */
function retrieveTestData(callback) {
  fs.readFile('./app/fixtures/test-data.json', 'utf-8', (err, content) => {
    callback(err, JSON.parse(content));
  });
}

/**
 * retrievePlaceData retrieves places from our JSON file
 * @param  {function} callback
 */
function retrievePlaceData(callback) {
  fs.readFile('./app/fixtures/places.json', 'utf-8', (err, content) => {
    callback(err, JSON.parse(content));
  });
}

module.exports = router;

