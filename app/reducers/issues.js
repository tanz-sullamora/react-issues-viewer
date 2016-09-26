export const LOADING_START = 'LOADING_START';
export const LOADING_ERROR = 'LOADING_ERROR';
export const LOADING_SUCCESS = 'LOADING_SUCCESS';

export const start = () => (dispatch) => {
  dispatch({
    type: LOADING_START,
  });
}

export const error = (response) => (dispatch) => {
  dispatch({
    type: LOADING_ERROR,
    response,
  });
}

export const success = (listType, response) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
    listType,
    response,
  });
}

const INITIAL_STATE = {
  issues: [],
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

    default:
      return state;

  }
};

export default reducer;
