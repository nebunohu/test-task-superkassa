import { TWsActions, WS_CONNECTION_CLOSE, WS_CONNECTION_START, WS_GET_MESSAGE } from '../actions/ws-actions';

type TWsState = {
    wsConnected: boolean;
    phones: Array<any>;
}

export const initialState:TWsState = {
  wsConnected: false,
  phones: []
};

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
  switch (action.type) {
  case WS_CONNECTION_START: {
    return {
      ...state,
      wsConnected: true,
    };
  }
  case WS_CONNECTION_CLOSE: {
    return {
      ...state,
      wsConnected: false,
    };
  }
  case WS_GET_MESSAGE: {
    return {
      ...state,
      phones: action.payload,
    };
  }
  default: return state;
  }
};