import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class IssueFilter extends React.Component{
  constructor() {
    super();
    this.clearFilter = this.clearFilter.bind(this);
    this.setFilterOpen = this.setFilterOpen.bind(this);
    this.setFilterAssigned = this.setFilterAssigned.bind(this);
  }

  setFilterOpen(e) {
    e.preventDefault();
    this.props.setFilter({status: 'open'});
  }

  setFilterAssigned(e) {
    e.preventDefault();
    this.props.setFilter({status: 'Assigned'});
  }

  clearFilter(e) {
    e.preventDefault();
    this.props.setFilter({});
  }

  render(){
    const Separator = () => <span>|</span>;
    return (
      <div>
        <Link to = "/issues">All Issues</Link>
        <Separator />
        <Link to="/issues?status=open">
        Open issues
        </Link>
        <Separator />
        <Link to="/issues?status=Assigned">Assigned Issues</Link>

      </div>
    )
  }
}

IssueFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
}
