import React from 'react';
import { connect } from 'react-redux';

import IssuesList from './../issues-list';
import ReposList from './../repos-list';
import SearchForm from './../search-form';

import IssueDAO from './../../dao/issue';


class MainPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.issues = new IssueDAO(this.props.dispatch);

    this.onSearch = this.onSearch.bind(this);
    this.setRepo = this.setRepo.bind(this);

    this.state = {
      username: '',
      repository: '',
      isLoading: false,
      error: false,
    };
  }

  onSearch(username, repository) {
    this.issues.find(username, repository);
  }

  setRepo(repoFullName) {
    const [ username, repository ] = repoFullName.split('/');
    this.issues.find(username, repository);
  }

  render() {
    const {
      issues,
      partialSuccess,
      isLoading,
      error,
    } = this.props.issues;

    return (
      <div>
        <SearchForm
          onSearch={this.onSearch}
          isLoading={isLoading}
          error={error}
        />
        {issues.length > 0 && partialSuccess && (
          <ReposList
            repos={issues}
            setRepo={this.setRepo}
          />
        )}
        {issues.length > 0 && !partialSuccess && (
          <IssuesList
            issues={issues}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  issues: state.issues,
});

export default connect(mapStateToProps)(MainPage);
