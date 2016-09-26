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
    this.issues.find(owner, repo, id);
  }

  render() {
    const {
      issue,
      partialSuccess,
      isLoading,
      error,
    } = this.props.issue;

    if (isLoading) {
      return <span>Wait a minute…</span>;
    }

    if (error) {
      return <span>Some error</span>;
    }

    return (
      <div>
        <IssueView issue={issue} />
        <p>
          <a href="/#">&larr; Back to search</a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  issue: state.issue,
});

export default connect(mapStateToProps)(IssuePage);
