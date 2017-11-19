import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFilter.jsx';


// this and IssueTable could be impleneted with arrow (ES2015) or function style
const IssueRow =(props) => (
  <tr>
    <td><Link to={`/issue/${props.issue._id}`}>{props.issue._id.substr(-4)}</Link></td>
    <td>{props.issue.status}</td>
    <td>{props.issue.owner}</td>
    <td>{props.issue.created.toDateString()}</td>
    <td>{props.issue.effort}</td>
    <td>{props.issue.completionDate?issue.completionDate.toDateString():''}</td>
    <td>{props.issue.title}</td>
  </tr>
)

IssueRow.defaultProps = {
  title : '-- no title --',
};

// this and IssueRow could be impleneted with arrow (ES2015) or function style
function IssueTable (props) {
  const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue}/>)
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Iddd</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
      {issueRows}
      </tbody>
    </table>
  )
}

export default class IssueList extends React.Component{
  constructor() {
    super();
    console.log('IssueList constructor');
    this.state = { issues: []};
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    console.log('ComponentDidMount');
    this.loadData();
  }

  loadData() {
    fetch('/api/issues').then(response => {
      console.log('Here now!');
      if(response.ok) {
        response.json()
        .then(data => {
          console.log('Total count of records:', data._metadata.total_count);
          data.records.forEach( issue => {
            issue.created = new Date(issue.created);
            if(issue.completionDate)
              issue.completionDate = new Date(issue.completionDate);
          });
          this.setState({issues: data.records });
        });
      }else {
        response.json().then(error => {
          alert("failed to fetch issues:" + error.message);
        });
      }
    }).catch(err => {
        console.log(err);
      });
  }

  createIssue(newIssue) {
    fetch('/api/issues',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newIssue),
    }).then(response => {
      if(response.ok) {
        response.json()
        .then(updateIssue => {
          updateIssue.created = new Date(updateIssue.created);
          if(updateIssue.completionDate)
            updateIssue,completionDate = new Date(updateIssue.completionDate);
          const newIssues = this.state.issues.concat(updateIssue);
          this.setState({issues: newIssues});
        });
      } else {
        response.json().then(error => {
          alert("Failed to add issue: " + error.message);
        });
      }
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });
  }

  render(){
    return(
      <div>
        <h1> Issue Tracker </h1>
        <IssueFilter/>
        <hr />
          <IssueTable issues={this.state.issues}/>
        <hr />
        <IssueAdd createIssue={this.createIssue}/>
        <hr />
        </div>
    );
  }
}
