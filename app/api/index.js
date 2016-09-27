import * as axios from 'axios';

class API {

  constructor() {
    this.endpointUrl = 'https://api.github.com';
    this.perPage = 5;
  }

  getEndpointUrl() {
    return this.endpointUrl;
  }
  
  setEndpointUrl(url) {
    this.endpointUrl = url;
  }

  getPerPage() {
    return this.perPage;
  }
  
  setPerPage(limit) {
    this.perPage = limit;
  }

  setPage(page) {
    this.page = page;
  }
  
  findUserRepos(username) {
    return axios.get(`${this.endpointUrl}/users/${username}/repos?page=${this.page}&per_page=${this.perPage}`);
  }

  listIssuesByUserAndRepo(username, repo) {
    return axios.get(`${this.endpointUrl}/repos/${username}/${repo}/issues?page=${this.page}&per_page=${this.perPage}`);
  }

  findIssue(username, repo, issue) {
    return axios.get(`${this.endpointUrl}/repos/${username}/${repo}/issues/${issue}`);
  }

}

export default API;
