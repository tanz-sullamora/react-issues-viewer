import React from 'react';


const ReposList = ({ setRepo, repos }) => (
  <ul className="repos-list">
    {repos.map((repo) =>
      <li key={repo.id} className="repos-list__item">
        <span onClick={setRepo.bind(this, repo.full_name)} className="repos-list__link">{repo.name} ({repo.open_issues_count})</span>
      </li>
    )}
  </ul>
);

ReposList.propTypes = {
  setRepo: React.PropTypes.func.isRequired,
  repos: React.PropTypes.array.isRequired,
};

export default ReposList;
