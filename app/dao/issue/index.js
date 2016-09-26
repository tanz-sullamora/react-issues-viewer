import API from './../../api';
import { actions as IssuesActions } from './../../reducers/issues';
import { actions as SingleIssueActions } from './../../reducers/issue';

class Issue {

  constructor(dispatch) {
    this.api = new API();
    this.dispatch = dispatch;
  }

  find(username, repo='', issue='') {
    if (issue !== '') {
      return this.findSingleIssue(username, repo, issue);
    }

    if (repo !== '') {
      return this.findIssues(username, repo);
    }

    this.findRepos(username);
  }

  findRepos(username) {
    IssuesActions.start()(this.dispatch);

    this.api.findUserRepos(username)
      .then(
        (response) => IssuesActions.success('repos', response.data)(this.dispatch)
      )
      .catch(
        (response) => IssuesActions.error(response)(this.dispatch)
      );
  }

  findIssues(username, repo) {
    IssuesActions.start()(this.dispatch);
    
    this.api.listIssuesByUserAndRepo(username, repo)
      .then(
        (response) => IssuesActions.success('issues', response.data)(this.dispatch)
      )
      .catch(
        (response) => IssuesActions.error(response)(this.dispatch)
      );
  }

  findSingleIssue(username, repo, issue) {
    SingleIssueActions.start()(this.dispatch);
    
    this.api.findIssue(username, repo, issue)
      .then(
        (response) => SingleIssueActions.success(response.data)(this.dispatch)
      )
      .catch(
        (response) => SingleIssueActions.error(response)(this.dispatch)
      );
  }

}

export default Issue;
