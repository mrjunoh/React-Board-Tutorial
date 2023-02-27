const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const port = 8000
const mysql = require('mysql');
const {urlencoded} = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
  host:"localhost",
  user:"root",
  password:"비번",
  database:"simpleboard"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get', (req, res)=>{
  const sql = "SELECT * FROM board;";
  db.query(sql, (err, result)=>{
    res.send(result);
  })
})

app.post('/api/insert', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const sqlQuery = "INSERT INTO board (title, content) VALUES (?,?)";
  db.query(sqlQuery, [title, content], (err, result) => {
      res.send('success!');
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//23.02.27