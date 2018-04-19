import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from "../reducers";

let store = createStore(rootReducer,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
, applyMiddleware(thunk));
let getData = (val) => store.getState()[val]


exports.store = store;
exports.getData = getData;