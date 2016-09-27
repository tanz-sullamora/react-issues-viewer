import React from 'react';


const GithubAuthor = ({ user }) => (
  <span className="github-author">
    {user.avatar_url && <img src={user.avatar_url}  className="github-author__avatar" />}
    <a href={user.html_url} className="github-author__link">{user.login}</a>
  </span>
);

GithubAuthor.propTypes = {
  user: React.PropTypes.object.isRequired,
};

export default GithubAuthor;
