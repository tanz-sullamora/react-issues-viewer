import API from './../../api';
import { start, error, success } from './../../reducers/issues';

class Issue {

  constructor(dispatch) {
    this.api = new API();
    this.dispatch = dispatch;
  }

  find(username, repo='') {
    start()(this.dispatch);

    if (repo !== '') {
      this.api.listIssuesByUserAndRepo(username, repo)
        .then(
          (response) => success('issues', response.data)(this.dispatch)
        )
        .catch(
          (response) => error(response)(this.dispatch)
        );
    } else {
      this.api.findUserRepos(username)
        .then(
          (response) => success('repos', response.data)(this.dispatch)
        )
        // .catch(
        //   (response) => error(response)(this.dispatch)
        // );
    }
  }

}

export default Issue;
