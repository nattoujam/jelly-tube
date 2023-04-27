/**
 * @file             : app.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 04/15
 * Last Modified Date: 2023 04/27
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const portNum = 3333;
const app = express();
const fs = require('fs');
const server = require('https').createServer({
  key: fs.readFileSync('./.certs/server.key'),
  cert: fs.readFileSync('./.certs/server.crt'),
}, app)

// CORS対策
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)

// mysql
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
connection.connect ((err) => {
  if (err) {
    console.log('error connecting:' + err.stack);
    return;
  }
  console.log('success to connect database');
});

// 静的フォルダの利用設定
app.use(express.static('hls_test'))

// DEBUG:
// video list
const video_list = [1, 2, 3, 4, 1, 2, 3, 4]

app.get('/', (req, res) => {
  res.status(200).send({ id: 1, message: "hogehoge" });
});


app.get('/videolist', (req, res) => {
  console.log('send video list');
  connection.query(
    'SELECT * FROM videos',
    (err, results) => {
      console.log(results);
      res.status(200).send({ videolist: results });
    }
  );
});

app.get('/jt:videoId', (req, res) => {
  const videoId = req.params.videoId;
  console.log(`video ID: ${videoId}`);
  console.log(__dirname)
  // res.sendFile(__dirname + '/hls/1/1.m3u8')
  console.log(req.protocol);
  console.log(req.get('host'));
  console.log(req.originalUrl);
  res.end('https://localhost:3333/4/4.m3u8');
});

server.listen(portNum);
console.log(`listen: ${portNum}`);
