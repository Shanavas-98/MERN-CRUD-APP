import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { WorkoutsContextProvider } from './contexts/WorkoutContext';
import { AuthContextProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
    <App />
    </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
