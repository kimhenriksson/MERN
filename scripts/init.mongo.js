db = new Mongo().getDB('issuetracker');

db.issues.remove({});

db.issues.insert([
  {
    status:'open', owner:'Rawan',
    created: new Date('2017-09-26'), effort:5, completionDate: undefined,
    title:'Error in console when clicking Add',
  },
  {
    status:'Assigned', owner:'Eddiee',
    created:new Date('2017-09-22'), effort:14, completionDate: undefined,
    title:'Missing bottom border panel',
  },
]);

db.issues.createIndex({status: 1});
db.issues.createIndex({owner: 2});
db.issues.createIndex({created: 3});
