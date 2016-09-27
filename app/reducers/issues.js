export const LOADING_START = 'LIST_LOADING_START';
export const LOADING_ERROR = 'LIST_LOADING_ERROR';
export const LOADING_SUCCESS = 'LIST_LOADING_SUCCESS';
export const PAGE_COUNT = 'LIST_PAGE_COUNT';


export const actions = {
  start: () => (dispatch) => {
    dispatch({
      type: LOADING_START,
    });
  },
  error: (response) => (dispatch) => {
    dispatch({
      type: LOADING_ERROR,
      response,
    });
  },
  success: (listType, response) => (dispatch) => {
    dispatch({
      type: LOADING_SUCCESS,
      listType,
      response,
    });
  },
  pageCount: (pageCount) => (dispatch) => {
    dispatch({
      type: PAGE_COUNT,
      pageCount,
    });
  },
};

const INITIAL_STATE = {
  issues: [],
  pageCount: 0,
  partialSuccess: false,
  isLoading: false,
  error: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case LOADING_START: {
      return {
        ...state,
        error: false,
        isLoading: true,
      }
    }

    case LOADING_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    }

    case LOADING_SUCCESS: {
      const {
        response=[],
        listType,
      } = action;

      return {
        ...state,
        issues: response,
        partialSuccess: listType !== 'issues',
        isLoading: false,
        error: false,
      }
    }

    case PAGE_COUNT: {
      const {
        pageCount,
      } = action;

      return {
        ...state,
        pageCount,
      };
    }

    default:
      return state;

  }
};

export default reducer;
