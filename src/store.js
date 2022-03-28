import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

/**Enhancers - Extends the redux, allows to change the behavior of the entire store. Returns new version of createStore
const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const originalDispatch = store.dispatch;

    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return originalDispatch({
                type: action
            });
        }

        return originalDispatch(action);
    };

    return store;
};
*/

// Redux Midlware - allows to change the behavior of part of store - dispatch fucntion
// First argumet in first func -> { getState, dispatch } = store only 2 funcs
// next - dispatch or next dispatch 
const logMiddleware = () => (next) => (action) => {
    console.log('It`s a ' + action.type);
    return next(action);
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logMiddleware));

export default store;