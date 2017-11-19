import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, HashRouter, Redirect} from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p> Page Not Found</p>;



const App = () => (
  <main>
    <Switch >
      <Route exact path="/" render={() => (<Redirect to="/issues" />)} />
      <Route path="/issue/:id" component={IssueEdit} />
      <Route path="/issues" component={IssueList} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </main>
)
const AppRouter = () => (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(<AppRouter/>,contentNode);

if(module.hot) {
  module.hot.accept();
}
