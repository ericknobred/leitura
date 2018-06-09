import React, { Component } from 'react'

export default class NewCommentBox extends Component{
    render(){
        return(
            <div className="comment-field">
                <input type="text" className="app-input app-input-sm" placeholder="Author"/> 
                <textarea rows="4" className="app-input app-input-sm" placeholder="Type your comment..."></textarea>
                <button className="btn-primary btn-md">Comment</button>
            </div>
        )
    }
}