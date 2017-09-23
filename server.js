const express = require('express');

const app = express();
app.use(express.static('static'));

app.listen(2345,function(){
  console.log('App started on port 2345');
});
