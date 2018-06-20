'use strict';

const express = require('express');
const request = require('request');

// Constants
const PORT = 9999;
const HOST = '0.0.0.0';
const MATCHES_SERVICES = process.env.MATCHES_SERVICES || 'game-data';
const SERVICE_VERSION = process.env.VERSION || 'v1';

const app = express();
app.get('/matches', (req, res) => {
  const url = MATCHES_SERVICES;
  console.log('URL:', url);
  request(url, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    const content = JSON.parse(body);
    content.version = SERVICE_VERSION;
    res.json(content);
  });
});

app.get('/healthcheck', (req, res) => {
  console.log(`Game Data Proxy Running on http://${HOST}:${PORT}`);
  res.json({status: "OK", version : SERVICE_VERSION});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);