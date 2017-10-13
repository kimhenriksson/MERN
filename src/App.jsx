
const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component{
  render(){
    return (
      <div>This is a placeholder for the Issue Filter. </div>
    )
  }
}

// this and IssueTable could be impleneted with arrow (ES2015) or function style
const IssueRow =(props) => (
  <tr>
    <td>{props.issue.id}</td>
    <td>{props.issue.status}</td>
    <td>{props.issue.owner}</td>
    <td>{props.issue.created.toDateString()}</td>
    <td>{props.issue.effort}</td>
    <td>{props.issue.completionDate?issue.completionDate.toDateString():''}</td>
    <td>{props.issue.title}</td>
  </tr>
)

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
// this and IssueRow could be impleneted with arrow (ES2015) or function style
function IssueTable (props) {
  const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue}/>)
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

class IssueAdd extends React.Component{
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.IssueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    });

    form.owner.value="";
    form.title.value="";
  }

  render(){
    return (
    <div>
      <form name="IssueAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="owner" placeholder="Owner" />
        <input type="text" name="title" placeholder="Title" />
        <button>Add</button>
      </form>
    </div>
    )
  }
}

class IssueList extends React.Component{
  constructor() {
    super();
    this.state = { issues: []};
    this.createIssue = this.createIssue.bind(this);
  }

  ComponentdidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/issues').then(response =>
      response.json())
      .then(data => {
        console.log('Total count of records:', data._metadata.total_count);
        data.records.forEach( issue => {
          issue.created = new Date(issue.created);
          if(issue.completionDate)
            issue.completionDate = new Date(issue.completionDate);
        });
        this.setState({issues: data.records });
      }).catch(err => {
        console.log(err);
      })
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

ReactDOM.render(<IssueList/>,contentNode);
