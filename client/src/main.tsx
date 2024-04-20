import './assets/css/styles.scss';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

import { App } from './App.tsx'
import store from './bundles/framework/store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <Toaster 
          theme="dark"
          position="bottom-right"
          duration={2000}
        />
      <App />
    </Provider>
  </React.StrictMode>,
)
