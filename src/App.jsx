import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter, Redirect, withRouter} from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p> Paage Not Found</p>;


const App = (props) => (
  <div>
    <div className="header">
      <h1>Issue Tracker</h1>
    </div>
    <div className="contents">
      {props.children}
    </div>
    <div className="footer">
      full source available at github
    </div>
  </div>
)



const AppRouter = () => (
  <BrowserRouter>
    <main>
      <Switch >
        <Route exact path="/" render={() => (<Redirect to="/issues" />)} />
        <Route path="/issue/:id" component={IssueEdit} />
        <Route path="/issues" component={withRouter(IssueList)} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </main>
  </BrowserRouter>
)

ReactDOM.render(<AppRouter/>,contentNode);

if(module.hot) {
  module.hot.accept();
}
