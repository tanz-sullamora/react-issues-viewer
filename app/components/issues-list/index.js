import React from 'react';

import { readableDate } from './../../utils';

const githubUrl = 'https://github.com/';


const IssuesList = ({ issues }) => (
  <table>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Created at</th>
    </tr>
    <tbody>
      {issues.map((issue) =>
        <tr key={issue.id}>
          <td>{issue.number}</td>
          <td><a href={issue.html_url.replace(githubUrl, '#/issues/')}>{issue.title}</a></td>
          <td>{readableDate(issue.created_at)}</td>
        </tr>
      )}
    </tbody>
  </table>
);

IssuesList.propTypes = {
  issues: React.PropTypes.array.isRequired,
};

export default IssuesList;
