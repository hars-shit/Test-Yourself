import {persistReducer, persistStore} from 'redux-persist'
import paperSlice from './paperSlice'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';


const persistConfig={
    key:'root',
    storage
}


const persistedReducer=persistReducer(persistConfig,paperSlice)

const store=configureStore({
    reducer:persistedReducer,
})
let persistor=persistStore(store);

export  {store,persistor}