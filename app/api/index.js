import * as axios from 'axios';

class API {

  constructor() {
    this.endpointUrl = 'https://api.github.com';
    this.perPage = 20;
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
  
  findUserRepos(username, page=1) {
    return axios.get(`${this.endpointUrl}/users/${username}/repos?page=${page}&per_page=${this.perPage}`);
  }

  listIssuesByUserAndRepo(username, repo, page=1) {
    return axios.get(`${this.endpointUrl}/repos/${username}/${repo}/issues?page=${page}&per_page=${this.perPage}`);
  }

}

export default API;
