import React from 'react';
import { connect } from 'react-redux';

import IssuesList from './../issues-list';
import ReposList from './../repos-list';
import SearchForm from './../search-form';
import Paging from './../paging';

import IssueDAO from './../../dao/issue';


class MainPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.issues = new IssueDAO(this.props.dispatch);

    this.onSearch = this.onSearch.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.setRepo = this.setRepo.bind(this);

    this.state = {
      selectedPage: 1,
    };
  }

  onSearch(username, repository) {
    this.setState({
        selectedPage: 1,
    });
    this.issues.reset().find(username, repository);
  }

  onChangePage(selectedPage) {
    this.setState({
        selectedPage,
    });
    this.issues.setPage(selectedPage);
  }

  setRepo(repoFullName) {
    const [ username, repository ] = repoFullName.split('/');
    this.issues.find(username, repository);
  }

  render() {
    const {
      issues,
      pageCount,
      partialSuccess,
      isLoading,
      error,
    } = this.props.issues;

    const {
        selectedPage
    } = this.state;

    return (
      <div>
        <SearchForm
          onSearch={this.onSearch}
          isLoading={isLoading}
          error={error}
        />
        {!error && issues.length > 0 && partialSuccess && (
          <ReposList
            repos={issues}
            setRepo={this.setRepo}
          />
        )}
        {!error && issues.length > 0 && !partialSuccess && (
          <IssuesList
            issues={issues}
          />
        )}
        {!error && issues.length > 0 && (
          <Paging
            pageCount={pageCount}
            selectedPage={selectedPage}
            onChangePage={this.onChangePage}
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
