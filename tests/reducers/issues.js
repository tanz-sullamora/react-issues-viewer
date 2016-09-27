import IssueReducer, { actions as IssueActions, LOADING_START, LOADING_ERROR, LOADING_SUCCESS, PAGE_COUNT } from './../../app/reducers/issues';

describe('Reducer Issues', function() {

  let dispatch = null;

  beforeEach(function() {
    dispatch = {
      anAction: function(value) {
        return value;
      }
    };

    spyOn(dispatch, 'anAction')
  });


  it('must return initial state', function() {
    const expected = {
      issues: [],
      pageCount: 0,
      partialSuccess: false,
      isLoading: false,
      error: false,
    };

    const actual = IssueReducer(undefined, {});

    expect(actual).toEqual(expected);
  });


  it('must set isLoading=true, error=false on LOADING_START action', function() {
    const expected = {
      issues: [],
      pageCount: 0,
      partialSuccess: false,
      isLoading: true,
      error: false,
    };

    const actual = IssueReducer(undefined, {
      type: LOADING_START
    });

    expect(actual).toEqual(expected);
  });


  it('must set isLoading=false, error=true on LOADING_ERROR action', function() {
    const expected = {
      issues: [],
      pageCount: 0,
      partialSuccess: false,
      isLoading: false,
      error: true,
    };

    const actual = IssueReducer(undefined, {
      type: LOADING_ERROR
    });

    expect(actual).toEqual(expected);
  });


  it('must set isLoading=false, error=false, issues=... on LOADING_SUCCESS action', function() {
    const expected = {
      issues: [
        { some: 'object' },
      ],
      pageCount: 0,
      partialSuccess: true,
      isLoading: false,
      error: false,
    };

    const actual = IssueReducer(undefined, {
      response: [
        { some: 'object' },
      ],
      listType: 'foo',
      type: LOADING_SUCCESS
    });

    expect(actual).toEqual(expected);
  });


  it('must set PAGE_COUNT=x on PAGE_COUNT action', function() {
    const expected = {
      issues: [],
      pageCount: 7,
      partialSuccess: false,
      isLoading: false,
      error: false,
    };

    const actual = IssueReducer(undefined, {
      type: PAGE_COUNT,
      pageCount: 7,
    });

    expect(actual).toEqual(expected);
  });


  it('must export actions object with success, start, error, pageCount methods', function() {
    expect(IssueActions.start).toBeDefined();
    expect(IssueActions.success).toBeDefined();
    expect(IssueActions.error).toBeDefined();
    expect(IssueActions.pageCount).toBeDefined();
  });


  it('must dispatch LOADING_START on calling actions.start', function() {
    const expected = {
      type: LOADING_START,
    };

    IssueActions.start()(dispatch.anAction);

    expect(dispatch.anAction).toHaveBeenCalledWith(expected);
  });


  it('must dispatch LOADING_ERROR on calling actions.error', function() {
    const expected = {
      type: LOADING_ERROR,
    };

    IssueActions.error()(dispatch.anAction);

    expect(dispatch.anAction).toHaveBeenCalledWith(expected);
  });


  it('must dispatch LOADING_SUCCESS with response on calling actions.success', function() {
    const response = [
      { some: 'object' },
    ];
    const listType = 'foo';
    const expected = {
      type: LOADING_SUCCESS,
      response,
      listType,
    };

    IssueActions.success(listType, response)(dispatch.anAction);

    expect(dispatch.anAction).toHaveBeenCalledWith(expected);
  });


  it('must dispatch PAGE_COUNT with x on calling actions.pageCount', function() {
    const pageCount = 7;
    const expected = {
      type: PAGE_COUNT,
      pageCount,
    };

    IssueActions.pageCount(pageCount)(dispatch.anAction);

    expect(dispatch.anAction).toHaveBeenCalledWith(expected);
  });

});
