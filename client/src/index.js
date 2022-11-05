/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import store from './store/store';
import App from './App';
// import mapsSizeContext from './context/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <mapsSizeContext.Provider> */}
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
      {/* </mapsSizeContext.Provider> */}
    </BrowserRouter>
  </Provider>,
);
