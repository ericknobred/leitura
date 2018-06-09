import React, { Component } from "react"

export default class NewPostBox extends Component{
    render() {

        return (
            <div className="new-post">
                <div className="header">
                  <h2>New Post</h2>
                </div>
                <div className="middle">
                  <input type="text" className="app-input" placeholder="Author"/> 
                  <input type="text" className="app-input" placeholder="Title"/>
                  <textarea rows="7" className="app-input" placeholder="Body"></textarea>
                </div>
                <div className="footer">
                  <button className="btn-primary btn-lg">Save</button>
                </div>
              </div>
        )

    }
}
