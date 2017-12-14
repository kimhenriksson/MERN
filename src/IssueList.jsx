import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFilter.jsx';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

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
          <th>Id</th>
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
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    console.log('ComponentDidMount');
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.search;
    const newQuery = this.props.location.search;

    for(var propname in this.props /*prevProps.location*/) {
      console.log('this.prop:' + propname + ':' + this.props[propname]);
    }
    console.log("#######");
    for(var propname in this.props.match /*prevProps.location*/) {
      console.log('prop.match:' + propname + ':' + this.props.match[propname]);
    }
    console.log("#######");
    for(var propname in this.props.history /*prevProps.location*/) {
      console.log('prop.history:' + propname + ':' + this.props.history[propname]);
    }
    console.log("#######");
    for(var propname in this.props.location /*prevProps.location*/) {
      console.log('prop.location:' + propname + ':' + this.props.location[propname]);
    }
    console.log('oldQueryy:'+oldQuery + ':' + newQuery + ':' + prevProps.location.hash);
    if(oldQuery === newQuery) {
      console.log('returning');
      return;
    }
    this.loadData();
  }

  loadData() {
    console.log("Load Data:"+`/api/issues${this.props.location.search}`);
    fetch(`/api/issues${this.props.location.search}`).then(response => {
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

  setFilter(query) {
    console.log('push:this.props.location.pathname:'+query['status'] + ':' + query.status);
    this.props.location({pathname: this.props.location.pathname, query});
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
        <IssueFilter setFilter={this.setFilter}/>
        <hr />
          <IssueTable issues={this.state.issues}/>
        <hr />
        <IssueAdd createIssue={this.createIssue}/>
        <hr />
        </div>
    );
  }
}

IssueList.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object,
};
