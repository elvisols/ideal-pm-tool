//npm i redux@4.0.0 react-redux@5.0.7 redux-thunk@2.3.0
//npm i axios@0.18.0
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

let store;

const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// setup store to work with our Chrome and extensions and other browsers

if (window.navigator.userAgent.includes("Chrome") && ReactReduxDevTools) {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ReactReduxDevTools)
  );
} else {
  store = createStore(
    rootReducer, // i.e index.js in the reducer folder
    initialState,
    compose(applyMiddleware(...middleware))
  );
}

export default store;
