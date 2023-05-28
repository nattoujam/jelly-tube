/**
 * @file             : index.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/08
 * Last Modified Date: 2023 05/08
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const api_domain = 'jelly-fish.local';
// const api_port = '3001';
const api_port = '3333';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `http://${api_domain}:${api_port}/graphql`
});

const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={ client }>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
