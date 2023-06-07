import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux-config/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId = "928980168925-ek2i5ljakienabmevg3u1tgkoqtp4vge.apps.googleusercontent.com";
const clientId1 = "772948950721-v1oh3qjif6a0tjdfgosea03498gmp5pg.apps.googleusercontent.com"
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId={clientId1}
        redirectUri={"https://localhost:3001"}
        scope={['profile', 'email']}
      >
        <App />
      </GoogleOAuthProvider>

    </Provider>
  </BrowserRouter>
);


reportWebVitals();
