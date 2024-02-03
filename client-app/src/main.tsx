import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app/layout/App.tsx'
import { StoreContext, store } from './app/stores/store.ts'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
)
