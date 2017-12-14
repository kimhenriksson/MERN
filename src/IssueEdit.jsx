import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default class IssueEdit extends React.Component{
  constructor(props) {
    super(props);
    console.log(props);
    this.params = props.match.params;
    console.log(this.params);
  }

  render() {
    return (
      <div>
        <p>This is a placeholder from the Issue Edit page {this.params.id}</p>
        <Link to="/issues">Back to issue list</Link>
      </div>
    );
  }
}

IssueEdit.propTypes = {
  params: PropTypes.object.isRequired,
};
