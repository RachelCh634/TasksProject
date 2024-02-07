import { createStore, combineReducers, applyMiddleware } from 'redux';
import contacts from './reducers/contacts';
import task from './reducers/task';

const deleteTask = (store) => (next) => (action) => {
    console.log('action: ', action);
    return next(action);
}

const reducer = combineReducers({ contacts, task });
const store = createStore(reducer,applyMiddleware(deleteTask))
window.store = store;
export default store;