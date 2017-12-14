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
  const filter ={};
  if(req.query.status) {
    filter.status = req.query.status;
    console.log(filter.status);
  } else {
    console.log("filter.status is empty");
    for(var propname in req.params) {
      console.log(propname);
    }
  }
  if(req.query.effort_lte || req.query.effort_gte) filter.effort = {};
  if(req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte,10);
  if(req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte,10);

  
  db.collection('issues').find(filter).toArray().then(issues => {
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

/*
app.get('*', (req,res) => {
  res.sendFile(path.resolve('static/index.html'));
})*/

let db;

MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
  db = connection;

  app.listen(2345,function(){
    console.log('App started on port 2345');
  });
}).catch(error => {
  console.log('ERROR:', error)
});
