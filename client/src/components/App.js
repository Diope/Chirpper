import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {BrowserRouter as Router} from 'react-router-dom';

import Navbar from '../containers/Navbar';
import MainCont from '../containers/MainCont';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="onBoard">
        <Navbar />
        <MainCont />
      </div>
    </Router>
  </Provider>
)


export default App;
