import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import MainPage from './components/MainPage';
import Poker from './components/Poker';
import './App.css';

function App() {
  return (
    <Router>
          <div>
          <Switch>
            {/* login */}
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/Register" component={Register}></Route>      
            <Route exact path="/Profile" component={Profile}></Route>    
            <Route exact path="/MainPage" component={MainPage}></Route>      
            <Route exact path="/Poker" component={Poker}></Route>      
          </Switch>        
        </div>
      </Router>
  );
}

export default App;
