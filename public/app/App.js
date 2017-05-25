// React code starts here
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Dashboard = require('./components/Dashboard');

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route path="/dashboard" component={Dashboard}/>
        </div>
      </Router>
    )
  }

}

ReactDOM.render(
  (
    <div>
      <App />
    </div>
  ),
  document.getElementById('app')
);