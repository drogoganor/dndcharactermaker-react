import { createStore, compose } from 'redux';
import { persistStore } from 'redux-persist'
import rootReducer from './reducer';

const store = createStore(rootReducer);
// const persistor = persistStore(store);

export default {
    store,
    // persistor
};