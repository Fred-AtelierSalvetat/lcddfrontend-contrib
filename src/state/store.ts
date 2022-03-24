import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import api from '../api/lcddbackend-api';
import { reducersList } from './reducers';

export const store = configureStore({
    reducer: { ...reducersList, [api.reducerPath]: api.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, logger),
    devTools: process.env.NODE_ENV !== 'production',
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
