import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { Routes } from './app/router/Routes.tsx'
import { StoreContext, store } from './app/stores/store.ts'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={Routes} />
    </StoreContext.Provider>
  </React.StrictMode>,
)
