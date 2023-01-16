import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import cartReducer from './cartRedux';
import userReducer from './userRedux'

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    // blacklist: ['cart'], // What you don't wanna to persist
    // whitelist: ['user'] // What you want to persist
};

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

// let store = createStore(persistedReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export const persistor = persistStore(store);