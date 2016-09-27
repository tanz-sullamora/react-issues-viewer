export const LOADING_START = 'SINGLE_LOADING_START';
export const LOADING_ERROR = 'SINGLE_LOADING_ERROR';
export const LOADING_SUCCESS = 'SINGLE_LOADING_SUCCESS';

export const actions = {
  start: () => (dispatch) => {
    dispatch({
      type: LOADING_START,
    });
  },
  error: () => (dispatch) => {
    dispatch({
      type: LOADING_ERROR,
    });
  },
  success: (response) => (dispatch) => {
    dispatch({
      type: LOADING_SUCCESS,
      response,
    });
  },
};

const INITIAL_STATE = {
  issue: {
    user: {}
  },
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
        response={}
      } = action;

      return {
        ...state,
        issue: response,
        isLoading: false,
        error: false,
      }
    }

    default:
      return state;

  }
};

export default reducer;
