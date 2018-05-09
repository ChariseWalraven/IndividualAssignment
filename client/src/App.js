import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import LogoutPage from './components/logout/LogoutPage'
import BatchesPage from './components/batches/BatchesPage.jsx'
import TopBar from './components/TopBar'
import Typography from 'material-ui/Typography'
import withTheme from 'material-ui/styles/withTheme'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar style={{width: '100%'}}/>
          </nav>
          <main style={{ marginTop: 75 }}>
          <Typography component='div'>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path='/batches' component={BatchesPage} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
          </Typography>
          </main>
        </div>
      </Router>
    )
  }
}

export default withTheme()(App);
