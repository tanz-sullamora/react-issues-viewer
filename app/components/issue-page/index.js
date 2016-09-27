import React from 'react';
import { connect } from 'react-redux';

import IssueView from './../issue-view';

import IssueDAO from './../../dao/issue';


class IssuePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.issues = new IssueDAO(this.props.dispatch);
  }

  componentDidMount() {
    const {
      owner,
      repo,
      id,
    } = this.props.params;

    this.issues.reset().find(owner, repo, id);
  }

  render() {
    const {
      issue,
      partialSuccess,
      isLoading,
      error,
      errorMessage,
    } = this.props.issue;

    return (
      <div className="issue-page">
        {isLoading && <span>Wait a minute…</span>}
        {!isLoading && !error && <IssueView issue={issue} />}
        {!isLoading && error && (<p className="issue-page__error">An error has occurred{errorMessage ? ` — ${errorMessage}` : ''}. Please, try again…</p>)}
        <p>
          <a href="/#" className="issue-page__backlink">&larr; Back to search</a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  issue: state.issue,
});

export default connect(mapStateToProps)(IssuePage);
