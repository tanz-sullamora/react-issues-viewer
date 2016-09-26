import React from 'react';


const ReposList = ({ setRepo, repos }) => (
  <ul>
    {repos.map((repo) =>
      <li key={repo.id}>
        <span onClick={setRepo.bind(this, repo.full_name)}>{repo.name}</span>
      </li>
    )}
  </ul>
);

ReposList.propTypes = {
  setRepo: React.PropTypes.func.isRequired,
  repos: React.PropTypes.array.isRequired,
};

export default ReposList;
