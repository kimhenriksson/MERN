
const contentNode = document.getElementById('contents');

const issues = [
  {
    id:1, status:'open', owner:'Rawan', created:new Date('2017-09-26'), effort:5, completionDate: undefined, title:'Error in console when clicking Add',
  },
  {
    id:2, status:'Assigned', owner:'Eddie', created:new Date('2017-09-22'), effort:14, completionDate: undefined, title:'Missing bottom border panel',
  },
]
class IssueFilter extends React.Component{
  render(){
    return (
      <div>This is a placeholder for the Issue Filter. </div>
    )
  }
}

class IssueRow extends React.Component {
  render(){
    const issue = this.props.issue;
    return(
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.completionDate?issue.completionDate.toDateString():''}</td>
        <td>{issue.title}</td>
      </tr>
    )
  }
}

IssueRow.propTypes = {
  issue: React.PropTypes.object.isRequired,
};

IssueRow.defaultProps = {
  title : '-- no title --',
};

class BorderWrap extends React.Component {
  render(){
    const borderStyle = {border: "1px solid silver", padding: 6};
    return(
      <div style={borderStyle}>
        {this.props.children}
      </div>
    )
  }
}

class IssueTable extends React.Component{
  render(){
    const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue}/>)
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
}

class IssueAdd extends React.Component{
  render(){
    return (
      <div>This is a placeholder for the issue Add entry form. </div>
    )
  }
}

class IssueList extends React.Component{
  render(){
    return(
      <div>
        <h1> Issue Tracker </h1>
        <IssueFilter/>
        <hr />
          <IssueTable issues={issues}/>
        <hr />
        <IssueAdd/>
        <hr />
        </div>
    );
  }
}

ReactDOM.render(<IssueList/>,contentNode);
