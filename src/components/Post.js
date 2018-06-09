import React, { Component } from "react"
import * as Icons from '../icons/Icons.js'

import NewCommentBox from './NewCommentBox'
import Comment from './Comment'

export default class Post extends Component{
    render() {

        return (
            <div className="post-item">
                  <div className="post-item-actions"><Icons.FaPencil /> <Icons.FaTrash /></div>
                  <div className="post-item-info">
                    
                    <div className="post-item-body">
                      <div className="post-item-title">Post Title</div>
                      <div className="post-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin, lorem et imperdiet mattis, orci lorem euismod orci, vitae maximus dui libero et nulla. In sollicitudin mollis interdum. Curabitur imperdiet malesuada venenatis. Nulla dignissim ipsum rutrum, fringilla dolor vel, imperdiet nisi. Sed placerat felis ante, tempor consequat lectus dapibus at. Curabitur venenatis aliquam eros sit amet mattis. Mauris porta interdum ipsum, iaculis faucibus libero tempus sit amet. Nam a molestie nulla. Nullam ultricies pellentesque purus et ultricies. Etiam luctus tellus eu tellus tempor, vel mollis massa vestibulum. Morbi dictum pharetra diam, non placerat ligula consequat interdum. Etiam vitae maximus sapien. Etiam vitae venenatis enim. Mauris vehicula nulla sapien, nec euismod odio tristique volutpat. Suspendisse posuere libero sit amet arcu vestibulum vulputate. Vestibulum faucibus enim sodales, placerat nisi non, tempor metus.</div>
                    </div>
                    <div className="post-item-user">
                      <span className='post-user-name'>by <b>Erick Nobre</b>.<br /><small className='post-date-created'>10 hours ago</small></span>
                    </div>
                  </div>
                  <div className="post-item-controls">
                  <div className="item-control">
                      <Icons.FaStar className='btn-icon' />
                      <span className='btn-text'>0 Score</span>
                  </div>
                    <div className="item-control">
                      <button className="btn-post-control" type='button'>
                        <Icons.FaThumbsUp className='btn-icon btn-icon-mousein' />
                        <Icons.FaThumbsOUp className='btn-icon btn-icon-mouseout' />
                        <span className='btn-text'>Vote UP</span>
                      </button>
                    </div>
                    <div className="item-control">
                      <button className="btn-post-control" type='button'>
                        <Icons.FaThumbsDown className='btn-icon btn-icon-mousein' />
                        <Icons.FaThumbsODown className='btn-icon btn-icon-mouseout' />
                        <span className='btn-text'>Vote DOWN</span>
                      </button>
                    </div>
                    <div className="item-control">
                      <button className="btn-post-control" type='button'>
                        <Icons.FaComments className='btn-icon btn-icon-mousein' />
                        <Icons.FaCommentsO className='btn-icon btn-icon-mouseout' />
                        <span className='btn-text'>0 comments</span>
                      </button>
                    </div>
                  </div>
                  <div id='test' className="post-item-comments">
                    <div className="comment-box">
                      <NewCommentBox />
                    </div>
                    <div className="comment-box"> 
                        <Comment />
                    </div>
                  </div>
                </div>
        )
    }
}