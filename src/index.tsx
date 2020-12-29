import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {UserProvider} from './context/UserProvider';
import UserMob from "./store/UserMob";

const user = new UserMob()

ReactDOM.render(
    <UserProvider value={user}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </UserProvider>,
  document.getElementById('root')
);

reportWebVitals();
