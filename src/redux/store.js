import {persistReducer, persistStore} from 'redux-persist'
import paperSlice from './paperSlice'
import { configureStore,combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import promptSlice from './promptSlice';


const persistConfig={
    key:'root',
    storage
}


const rootReducer=combineReducers({
    paperSlice:paperSlice,
    promptSlice:promptSlice
})

const persistedReducer=persistReducer(persistConfig,rootReducer)

const store=configureStore({
    reducer:persistedReducer,
})
let persistor=persistStore(store);

export  {store,persistor}