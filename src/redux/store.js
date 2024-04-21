import {persistReducer, persistStore} from 'redux-persist'
import paperSlice from './paperSlice'
import { configureStore,combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import promptSlice from './promptSlice';
import userSlice from './userSlice';
import clusterSlice from './clusterSlice';
import loggedSlice from './loggedSlice';


const persistConfig={
    key:'root',
    storage
}

const rootReducer=combineReducers({
    paperSlice:paperSlice,
    promptSlice:promptSlice,
    userSlice:userSlice,
    clusterSlice:clusterSlice,
    loggedSlice:loggedSlice
})

const persistedReducer=persistReducer(persistConfig,rootReducer)

const store=configureStore({
    reducer:persistedReducer,
})
let persistor=persistStore(store);

export  {store,persistor}