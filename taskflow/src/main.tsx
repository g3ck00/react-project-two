import './index.css'
import App from './App.tsx';

import React from "react";
import ReactDOM from "react-dom/client";

import {BrowserRouter} from "react-router-dom";
import AuthProvider from "./context/AuthProvider.tsx";
import {TaskProvider} from "./context/TaskProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
          <AuthProvider>
              <TaskProvider>
            <App />
              </TaskProvider>
          </AuthProvider>
  </React.StrictMode>,
)
