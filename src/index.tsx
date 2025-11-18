import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n/config';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'next-themes';
import { LoadingProvider } from './utils/globalStateContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange= {false}>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
