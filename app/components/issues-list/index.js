import React from 'react';

import GithubAuthor from './../github-author';
import { readableDate } from './../../utils';

const githubUrl = 'https://github.com/';


const IssuesList = ({ issues }) => (
  <table className="issues-list">
    <tbody>
      <tr className="issues-list__row issues-list__row-header">
        <th className="issues-list__number">#</th>
        <th className="issues-list__title">Title</th>
        <th className="issues-list__author">Author</th>
        <th className="issues-list__date">Created at</th>
      </tr>
      {issues.map((issue) =>
        <tr key={issue.id}  className="issues-list__row">
          <td className="issues-list__number">{issue.number}</td>
          <td className="issues-list__title">
            {!!issue.pull_request && (
              <span className="issues-list__pullrequest" title="Pull request">PL</span>
            )}
            <a href={issue.html_url.replace(githubUrl, '#/issues/')} className="issues-list__link">{issue.title}</a>
          </td>
          <td className="issues-list__author"><GithubAuthor user={issue.user} /></td>
          <td className="issues-list__date">{readableDate(issue.created_at)}</td>
        </tr>
      )}
    </tbody>
  </table>
);

IssuesList.propTypes = {
  issues: React.PropTypes.array.isRequired,
};

export default IssuesList;
