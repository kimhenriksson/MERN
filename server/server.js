import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';
import Issue from './issue.js';
import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();

const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());

app.get('/api/issues',(req,res) => {
  db.collection('issues').find().toArray().then(issues => {
    const metadata = { total_count:issues.length};
    res.json({_metadata:metadata, records: issues})
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: 'internal server errir: ${error}'});
  });
});

app.post('/api/issues',(req,res) => {
  const newIssue = req.body;
  newIssue.created = new Date();
  if(!newIssue.status)
    newIssue.status = 'New';
  console.log(newIssue);
  const err = Issue.validateIssue(newIssue);
  if(err) {
    res.status(422).json({message: 'Invalid request: ${err}'});
    return;
  }

  db.collection('issues').insertOne(newIssue).then(result =>
    db.collection('issues').find({_id:result.insertedId}).limit(1).next())
    .then(newIssue => {
      res.json(newIssue);
    }).catch(error => {
      console.log(error);
      res.status(500).json({message:'Internal Server Error: ${error}'})
    });
  });

let db;

MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
  db = connection;

  app.listen(2345,function(){
    console.log('App started on port 2345');
  });
}).catch(error => {
  console.log('ERROR:', error)
});
