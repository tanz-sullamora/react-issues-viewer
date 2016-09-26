import API from './../../api';
import { actions as IssuesActions } from './../../reducers/issues';
import { actions as SingleIssueActions } from './../../reducers/issue';

const githubLastPageRegexp = /\?page=(\d+)&per_page=\d+>; rel="last"/;

class Issue {

  constructor(dispatch) {
    this.api = new API();
    this.dispatch = dispatch;
    this.saved = [];
    this.needToProcessPages = true;
  }

  processPageCount(response) {
    if (!this.needToProcessPages) {
      return response;
    }
    this.needToProcessPages = false;

    const { headers } = response;
    if (headers.link) {
      const last = githubLastPageRegexp.exec(headers.link);
      if (last !== null) {
        IssuesActions.pageCount(last[1])(this.dispatch);
      }
    }

    return response;
  }

  reset() {
    this.needToProcessPages = true;
    this.api.setPage(1);
    return this;
  }

  find(username, repo='', issue='') {

    if (issue !== '') {
      this.saved = [username, repo, issue];
      return this.findSingleIssue(username, repo, issue);
    }

    if (repo !== '') {
      this.saved = [username, repo];
      return this.findIssues(username, repo);
    }

    this.saved = [username];
    this.findRepos(username);
  }

  setPage(page) {
    this.api.setPage(page);
    this.find(...this.saved);
  }

  findRepos(username, page) {
    IssuesActions.start()(this.dispatch);

    this.api.findUserRepos(username)
      .then(this.processPageCount.bind(this))
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
      .then(this.processPageCount.bind(this))
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
