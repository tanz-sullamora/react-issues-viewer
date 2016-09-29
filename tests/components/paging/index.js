import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { wrap } from 'react-stateless-wrapper'

import Paging from './../../../app/components/paging';


describe('Component: Paging', function() {

  it('must render', function() {
    const WrappedComponent = wrap(Paging)
    const component = TestUtils.renderIntoDocument(
        <WrappedComponent pageCount="0" />
    );
    const actual = TestUtils.findRenderedDOMComponentWithClass(component, 'paging');
    expect(actual).toBeDefined();
  });


  it('must render proper amount of pages', function() {
    const pageCount = 7;

    const WrappedComponent = wrap(Paging)
    const component = TestUtils.renderIntoDocument(
        <WrappedComponent pageCount={pageCount} onChangePage={()=>{}} />
    );
    const actual = TestUtils.scryRenderedDOMComponentsWithClass(component, 'paging__item');

    expect(actual).toBeDefined();

    expect(actual.length).toEqual(pageCount);
  });


  it('must correctly set passed selected page', function() {
    const pageCount = 7;
    const selectedPage ='3';

    const WrappedComponent = wrap(Paging)
    const component = TestUtils.renderIntoDocument(
        <WrappedComponent pageCount={pageCount} onChangePage={()=>{}} selectedPage={selectedPage} />
    );
    const actual = TestUtils.findRenderedDOMComponentWithClass(component, 'paging__item-selected');

    expect(actual).toBeDefined();

    expect(actual.textContent).toEqual(selectedPage);
  });


  it('must call onChangePage with proper page on click', function() {
    const obj = {
      onChangePage: function(value) {
        return value;
      }
    };

    spyOn(obj, 'onChangePage');

    const pageCount = 7;
    const expectedPage = 4;

    const WrappedComponent = wrap(Paging)
    const component = TestUtils.renderIntoDocument(
        <WrappedComponent pageCount={pageCount} onChangePage={obj.onChangePage} />
    );
    const actual = TestUtils.scryRenderedDOMComponentsWithClass(component, 'paging__item');

    expect(actual).toBeDefined();

    TestUtils.Simulate.click(actual[expectedPage - 1]);

    expect(obj.onChangePage).toHaveBeenCalledWith(expectedPage, jasmine.any(Object), undefined);
  });

});
