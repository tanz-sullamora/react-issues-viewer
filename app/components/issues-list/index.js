import React from 'react';

const readableDateOptions = {
  era: 'narrow',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'short',
  timezone: 'UTC',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

const readableDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString('ru', readableDateOptions);
};

export const IssuesList = ({ issues }) => (
  <table>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Created at</th>
    </tr>
    {issues.map((issue) =>
      <tr key={issue.id}>
        <td>{issue.number}</td>
        <td>{issue.title}</td>
        <td>{readableDate(issue.created_at)}</td>
      </tr>
    )}
  </table>
);

IssuesList.propTypes = {
  issues: React.PropTypes.array.isRequired,
};

export default IssuesList;
