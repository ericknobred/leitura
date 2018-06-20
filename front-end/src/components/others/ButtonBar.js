import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Icons from './Icons'

class ButtonBar extends Component {
    render() {
        return (
                <div className="post-item-controls">
                  <div className="item-control">
                      <Icons.FaStar className='btn-icon' />
                      <span className='btn-text'>{this.props.score} Score</span>
                  </div>
                  <div className="item-control">
                    <button className="btn-post-control" type='button' onClick={() => this.props.voteUp()}>
                      <Icons.FaThumbsUp className='btn-icon btn-icon-mousein' />
                      <Icons.FaThumbsOUp className='btn-icon btn-icon-mouseout' />
                      <span className='btn-text'>Vote UP</span>
                    </button>
                  </div>
                  <div className="item-control">
                    <button className="btn-post-control" type='button' onClick={() => this.props.voteDown()}>
                      <Icons.FaThumbsDown className='btn-icon btn-icon-mousein' />
                      <Icons.FaThumbsODown className='btn-icon btn-icon-mouseout' />
                      <span className='btn-text'>Vote DOWN</span>
                    </button>
                  </div>
                  {this.props.totalComments >= 0 && (
                  <div className="item-control">
                    <button className={this.props.commentActive ? "btn-post-control active": "btn-post-control"} type='button'  onClick={() => this.props.toggleCommentsBox()}>
                      <Icons.FaComments className='btn-icon btn-icon-mousein' />
                      <Icons.FaCommentsO className='btn-icon btn-icon-mouseout' />
                      <span className='btn-text'>{this.props.totalComments} comments</span>
                    </button>
                  </div>
                  )}
                </div>
        )
    }
}

ButtonBar.propTypes = {
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    score: PropTypes.number.isRequired,
    totalComments: PropTypes.number,
    toggleCommentsBox: PropTypes.func    
}

export default ButtonBar