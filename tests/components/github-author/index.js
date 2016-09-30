import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { wrap } from 'react-stateless-wrapper'

import GithubAuthor from './../../../app/components/github-author';


describe('Component: GithubAuthor', function() {

  it('must render', function() {
    const WrappedComponent = wrap(GithubAuthor)
    const component = TestUtils.renderIntoDocument(
        <WrappedComponent user={{}} />
    );
    const actual = TestUtils.findRenderedDOMComponentWithClass(component, 'github-author');
    expect(actual).toBeDefined();
  });


  it('must render img tag with valid src if user.avatar_url provided', function() {
    const user = {
      avatar_url: 'http://example.com/some.png',
    };

    const WrappedComponent = wrap(GithubAuthor)
    const component = TestUtils.renderIntoDocument(
        <WrappedComponent user={user} />
    );
    const actual = TestUtils.findRenderedDOMComponentWithClass(component, 'github-author__avatar');

    expect(actual).toBeDefined();

    expect(actual.src).toEqual(user.avatar_url);
  });

});
