import React, {Component} from 'react'
import * as Icons from '../icons/Icons.js'

export default class Comment extends Component {
    render() {
        return (
            <div className="comment-item">
              <div className="post-item-actions"><Icons.FaPencil /> <Icons.FaTrash /></div>
              <div className="comment-info">
                <div className="comment-user-name">
                  Erick Nobre
                  <br />
                  <small className='comment-date-created'>10 hours ago</small>
                </div>                          
                
              </div>
              <div className="comment-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin.
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
              </div>
            </div>
        )
    }
}