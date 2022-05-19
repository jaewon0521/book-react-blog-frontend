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


const sagaMiddleware = createSagaMiddleWare();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

reportWebVitals();
