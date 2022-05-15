import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './redux/reducers/root';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose} from 'redux';
import { socketMiddleware } from './redux/middleware/socket-middleware';
import { TMiddlewareWsActions } from './types/ws';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from './redux/actions/ws-actions';
import { WS_API_URL } from './consts';

const wsActions: TMiddlewareWsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onMessage: WS_GET_MESSAGE
};

// const enhancers = compose(applyMiddleware(thunk, socketMiddleware(`${WS_API_URL}`, wsActions)));
// export const store = createStore(rootReducer, enhancers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, socketMiddleware(`${WS_API_URL}`, wsActions)]
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
