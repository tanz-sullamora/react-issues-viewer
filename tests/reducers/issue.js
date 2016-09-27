import IssueReducer, { actions as IssueActions, LOADING_START, LOADING_ERROR, LOADING_SUCCESS } from './../../app/reducers/issue';

describe('Reducer Issue', function() {

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
      issue: {
        user: {}
      },
      isLoading: false,
      error: false,
      errorMessage: '',
    };

    const actual = IssueReducer(undefined, {});

    expect(actual).toEqual(expected);
  });


  it('must set isLoading=true, error=false on LOADING_START action', function() {
    const expected = {
      issue: {
        user: {}
      },
      isLoading: true,
      error: false,
      errorMessage: '',
    };

    const actual = IssueReducer(undefined, {
      type: LOADING_START
    });

    expect(actual).toEqual(expected);
  });


  it('must set isLoading=false, error=true on LOADING_ERROR action', function() {
    const expected = {
      issue: {
        user: {}
      },
      isLoading: false,
      error: true,
      errorMessage: '',
    };

    const actual = IssueReducer(undefined, {
      type: LOADING_ERROR,
    });

    expect(actual).toEqual(expected);
  });


  it('must set isLoading=false, error=false, issue=... on LOADING_SUCCESS action', function() {
    const expected = {
      issue: {
        user: {
          hello: 'my friend',
        },
      },
      isLoading: false,
      error: false,
      errorMessage: '',
    };

    const actual = IssueReducer(undefined, {
      response: {
        user: {
          hello: 'my friend',
        },
      },
      type: LOADING_SUCCESS
    });

    expect(actual).toEqual(expected);
  });


  it('must export actions object with success, start, error methods', function() {
    expect(IssueActions.start).toBeDefined();
    expect(IssueActions.success).toBeDefined();
    expect(IssueActions.error).toBeDefined();
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
      errorMessage: '',
    };

    IssueActions.error({})(dispatch.anAction);

    expect(dispatch.anAction).toHaveBeenCalledWith(expected);
  });


  it('must dispatch LOADING_SUCCESS with response on calling actions.success', function() {
    const response = {
      user: {
        hello: 'my friend',
      },
    };
    const expected = {
      type: LOADING_SUCCESS,
      response,
    };

    IssueActions.success(response)(dispatch.anAction);

    expect(dispatch.anAction).toHaveBeenCalledWith(expected);
  });

});
