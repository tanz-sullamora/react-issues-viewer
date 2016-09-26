import React from 'react';

import { readableDate } from './../../utils';


const IssueView = ({ issue }) => (
  <div>
    <h2>{issue.title}</h2>
    <small>{readableDate(issue.created_at)}</small>
    <h3>by {issue.user.login}</h3>
    <p>{issue.body}</p>
  </div>
);

IssueView.propTypes = {
  issue: React.PropTypes.object.isRequired,
};

export default IssueView;
