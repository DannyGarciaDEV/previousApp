const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
//const adminPassword = encodeURIComponent( process.env.r#fN6tMzFujP!3x)
var db, collection;

const url = "mongodb+srv://dannygarciadev:rUfN6tMzFujP3x@cluster0.nbqmops.mongodb.net/?retryWrites=true&w=majority"
const dbName = "dannydev";

app.listen(3000, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
      if(error) {
          throw error;
      }
      db = client.db(dbName);
      console.log("Connected to " + dbName + "!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
db.collection('words').find().toArray((err, result) => {
  if (err) return console.log(err)
  res.render('index.ejs', {messages: result})
})
})

app.post('/palindrome', (req, res) => {
const nameUser = req.body.word
console.log("nameUser", nameUser)
let result
//if else statement from palindrome
//mark help fix my conditional
if (typeof nameUser === 'string' && nameUser.toLowerCase() === nameUser.split('').reverse().join('').toLowerCase()) {
  result = 'Yes!';
} else {
  result = 'Nope';
}
db.collection('words').insertOne({word: req.body.word, result: result}, (err, result) => {
  if (err) return console.log(err)
  console.log('saved to database')
  res.redirect('/')
})
})

// app.put('/palindrome', (req, res) => {
//   db.collection('words')
//   .findOneAndUpdate({word: req.body.word, result: result}, {
//     $set: {

//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })
app.delete('/palindrome', (req, res) => {
  const { word, result } = req.body;
  db.collection('words').findOneAndDelete({ word, result }, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Message deleted!');
  });
});
