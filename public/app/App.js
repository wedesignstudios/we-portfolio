// React code starts here
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {

  render() {
    return (
      <div>
          This is a REACT Component!
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('app'))