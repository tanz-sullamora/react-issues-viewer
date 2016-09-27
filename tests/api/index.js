import moxios from 'moxios';

import API from './../../app/api';


describe('API', function() {

  beforeEach(function () {
    moxios.install()
  })

  afterEach(function () {
    moxios.uninstall()
  })


  it('API instance must create successfully', function() {
    const actual = new API();

    expect(actual).toBeDefined();
  });


  it('API.setEndpointUrl and API.getEndpointUrl must work correctly', function() {
    const api = new API();
    const expected = 'some url';
    
    api.setEndpointUrl(expected);
    const actual = api.getEndpointUrl();

    expect(actual).toEqual(expected);
  });


  it('API.setPerPage and API.getPerPage must work correctly', function() {
    const api = new API();
    const expected = 7;
    
    api.setPerPage(expected);
    const actual = api.getPerPage();

    expect(actual).toEqual(expected);
  });


  it('API.setPage must work correctly', function() {
    const api = new API();
    const expected = 7;
    
    api.setPage(expected);
    const actual = api.page;

    expect(actual).toEqual(expected);
  });


  it('API.findUserRepos must return promise', function() {
    const api = new API();
    const expected = jasmine.any(Promise);
    const actual = api.findUserRepos();

    expect(actual).toEqual(expected);
  });


  it('API.findUserRepos must call axios.get with correct url', function(done) {
    const endpointUrl = 'endpointUrl';
    const username = 'username';
    const page = 2;
    const perPage = 3;

    const api = new API();
    api.setEndpointUrl(endpointUrl);
    api.setPage(page);
    api.setPerPage(perPage);

    const expected = `${endpointUrl}/users/${username}/repos?page=${page}&per_page=${perPage}`

    api.findUserRepos(username);

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: []
      }).then(function () {
        const actual = request.url;
        expect(actual).toEqual(expected);
        done()
      })
    });
  });


  it('API.listIssuesByUserAndRepo must return promise', function() {
    const api = new API();
    const expected = jasmine.any(Promise);
    const actual = api.listIssuesByUserAndRepo();

    expect(actual).toEqual(expected);
  });


  it('API.listIssuesByUserAndRepo must call axios.get with correct url', function(done) {
    const endpointUrl = 'endpointUrl';
    const username = 'username';
    const repo = 'repo';
    const page = 2;
    const perPage = 3;

    const api = new API();
    api.setEndpointUrl(endpointUrl);
    api.setPage(page);
    api.setPerPage(perPage);

    const expected = `${endpointUrl}/repos/${username}/${repo}/issues?page=${page}&per_page=${perPage}`;

    api.listIssuesByUserAndRepo(username, repo);

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: []
      }).then(function () {
        const actual = request.url;
        expect(actual).toEqual(expected);
        done()
      })
    });
  });


  it('API.findIssue must return promise', function() {
    const api = new API();
    const expected = jasmine.any(Promise);
    const actual = api.findIssue();

    expect(actual).toEqual(expected);
  });


  it('API.findIssue must call axios.get with correct url', function(done) {
    const endpointUrl = 'endpointUrl';
    const username = 'username';
    const repo = 'repo';
    const issue = 2;

    const api = new API();
    api.setEndpointUrl(endpointUrl);

    const expected = `${endpointUrl}/repos/${username}/${repo}/issues/${issue}`;

    api.findIssue(username, repo, issue);

    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: []
      }).then(function () {
        const actual = request.url;
        expect(actual).toEqual(expected);
        done()
      })
    });
  });

});
