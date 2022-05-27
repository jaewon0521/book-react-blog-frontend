import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from '../node_modules/react-router-dom/index';
import { composeWithDevTools } from '../node_modules/redux-devtools-extension/index';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from '../node_modules/react-redux/es/exports';
import createSagaMiddleWare from 'redux-saga';
import rootReducer, { rootSaga } from './modules/index';
import { check, tempSetUser } from './modules/user';

const sagaMiddleware = createSagaMiddleWare();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);
loadUser();
const root = ReactDOM.createRoot(document.getElementById('root'));

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return; // 로그인 상태가 아니라면 아무것도 안 함

    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}


root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

reportWebVitals();
