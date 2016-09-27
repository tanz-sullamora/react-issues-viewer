import React from 'react';

import GithubAuthor from './../github-author';
import { readableDate } from './../../utils';


const IssueView = ({ issue }) => (
  <div className="issue-view">
    <h2 className="issue-view__title">{issue.title}</h2>
    <small className="issue-view__date">{readableDate(issue.created_at)}</small>
    <h3 className="issue-view__author">by <GithubAuthor user={issue.user} /></h3>
    <p className="issue-view__text">{issue.body}</p>
  </div>
);

IssueView.propTypes = {
  issue: React.PropTypes.object.isRequired,
};

export default IssueView;
