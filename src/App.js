import React, { Component } from 'react';
import styled, { injectGlobal } from 'react-emotion';
import {Provider} from 'react-redux';

import Card from './components/Card';

import store from './ducky';

import 'bootstrap/dist/css/bootstrap.min.css';

injectGlobal`
  html, body {
    background-color: #f76b32;
  }
  html, body, #root {
    width: 100%;
    height: 100%;
  }
`

let App = ({ className }) => (
  <Provider store={store}>
    <div className={ className }>
      <Card />
    </div>
  </Provider>
);

App = styled(App)`
  width: 100%;
  height: 100%;
`

export default App;
