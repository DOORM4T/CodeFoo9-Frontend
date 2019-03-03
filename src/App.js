import React, { Component } from 'react'
import Feed from './components/Feed'

class App extends Component {

  render() {
    return (
      <div className="App">
        My App!
        <Feed />
      </div>
    );
  }
}

export default App;