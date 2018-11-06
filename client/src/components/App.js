import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {BrowserRouter as Router} from 'react-router-dom';

import Navbar from '../containers/Navbar';
import MainCont from '../containers/MainCont';
import { setAuthToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}))
  }
}

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
