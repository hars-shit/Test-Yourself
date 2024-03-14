
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { SocketProvider } from './context/SocketProvider.jsx'
import  { persistor, store } from './redux/store.js'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
  <BrowserRouter>
  <SocketProvider>
    <App />
  </SocketProvider>
  </BrowserRouter>
    </PersistGate>
  </Provider>
)
