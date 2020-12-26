/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import 'dom4';
import App from './app';

const appNode = document.getElementById('app');

ReactDOM.render(<App />, appNode);

if ('serviceWorker' in navigator && !__DEV__) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('Service worker registered 😎 👌');
      })
      .catch(() => {
        console.log('Service worker registration failed 🤦');
      });
  });
}
