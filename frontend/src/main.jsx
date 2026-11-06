import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "sonner"
import { Provider } from 'react-redux'
import { store } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor } from "./redux/store.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    <Toaster position="top-right" richColors />
  </StrictMode>,
)