import React, { Component } from 'react'

import AlertsOverlay from './components/others/AlertOverlay'
import Dialog from './components/others/Dialog'
import Router from './components/others/Router'

import './App.css'

class App extends Component { 
  render() {
    return ( 
      <div className="App">
        <Dialog />
        <AlertsOverlay />
        <Router />
      </div>
    );
  }
}


export default App
