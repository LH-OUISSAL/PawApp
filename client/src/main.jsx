import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // This should import your CSS with @import "tailwindcss"
import { Provider } from 'react-redux'
import { store } from './redux/breeds/store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
    <App />
  </Provider>
)