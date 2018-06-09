import React, { Component } from 'react'
import * as Icons from './icons/Icons.js'
import './App.css'
import PostList from './components/PostList'
import NewPostBox from './components/NewPostBox'


class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className="nav-container">
          <div className='nav-top'>
            <div className='container'>
              <div className="nav-title">
                Read
              </div>
            </div>
          </div>
          <div className="nav-menu">
            <div className="container">
              <div className="nav-items">

                <div className="nav-item active">Category 1</div>
                <div className="nav-item">Category 2</div>
                <div className="nav-item">Category 3</div>

              </div>
            </div>
          </div>
        </div>
        <div className="app-container">
          <div className="container">
            <div className="app-box">
              <NewPostBox />
            </div>
            <div className="app-box">
              <PostList/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App; 

