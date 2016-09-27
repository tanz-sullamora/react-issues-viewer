import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

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
      wasSearched: false,
    };
  }

  componentDidMount() {
    const {
      owner='',
      repo='',
    } = this.props.params;

    if (owner) {
      this.onSearch(owner, repo);
    }
  }

  onSearch(username='', repository='') {
    this.setState({
        selectedPage: 1,
        wasSearched: true,
    });
    this.issues.reset().find(username, repository);
    this.props.router.push(`search/${username}/${repository}`);
  }

  onChangePage(selectedPage) {
    this.setState({
        selectedPage,
    });
    this.issues.setPage(selectedPage);
  }

  setRepo(repoFullName) {
    const [ username='', repository='' ] = repoFullName.split('/');
    this.issues.reset().find(username, repository);
    this.props.router.push(`search/${username}/${repository}`);
  }

  render() {
    const {
      issues,
      pageCount,
      partialSuccess,
      isLoading,
      error,
      errorMessage,
    } = this.props.issues;

    const {
        selectedPage,
        wasSearched,
    } = this.state;

    return (
      <div className="main-page">
        <SearchForm
          onSearch={this.onSearch}
          isLoading={isLoading}
          error={error}
          errorMessage={errorMessage}
        />
        {isLoading && (
          <p className="main-page__text">Loading…</p>
        )}
        {!isLoading && !error && issues.length > 0 && partialSuccess && (
          <div>
            <p className="main-page__text">Please, pick a repository to view issues</p>
            <ReposList
              repos={issues}
              setRepo={this.setRepo}
            />
          </div>
        )}
        {!isLoading && !error && issues.length === 0 && partialSuccess && wasSearched && (
          <p className="main-page__text">This user has no repositories</p>
        )}
        {!isLoading && !error && issues.length > 0 && !partialSuccess && (
          <IssuesList
            issues={issues}
          />
        )}
        {!isLoading && !error && issues.length === 0 && !partialSuccess && wasSearched && (
          <p className="main-page__text">There are no open issues in this repository</p>
        )}
        {!isLoading && !error && issues.length > 0 && (
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

export default connect(mapStateToProps)(withRouter(MainPage));
