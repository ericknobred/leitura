import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deletePost, voteUp, voteDown, toggleCommentsBox} from '../../actions/PostAction'
import moment from 'moment'
import ButtonBar from '../others/ButtonBar'
import ButtonActionBar from '../others/ButtonActionBar'
import CommentForm from '../comment/CommentForm'
import CommentList from '../comment/CommentList'

import { showDialog } from '../../actions/DialogAction'

class PostItem extends Component{

    editPost(id){
        this.props.editPost(id)
    }

    openDialogDelete(post) {
        this.props.showDialog('Deseja realmente deletar este post?', deletePost, post)
    }

    voteUp(id){
        this.props.voteUp(id)
    }

    voteDown(id){
        this.props.voteDown(id)
    }
    
    toggleCommentsBox(id){
        this.props.toggleCommentsBox(id)
    }

    render() {
        let { post, openedComments } = this.props

        return (
            <div className="post-item">
                <ButtonActionBar 
                    openDialogDelete={() => {this.openDialogDelete(post)}}  
                    edit={() => {this.editPost(post.id)}}  
                />
                <div className="post-item-info">
                    <div className="post-item-body">
                        <div className="post-item-title">{post.title}</div>
                        <div className="post-item-text">{post.body}</div>
                    </div>
                    <div className="post-item-user">
                        <span className='post-user-name'>by <b>{post.author}</b>.<br /><small className='post-date-created'>{moment(post.timestamp).toNow()}</small></span>
                    </div>
                </div>
                <ButtonBar
                    score={post.voteScore}
                    voteUp={() => {this.voteUp(post.id)}}  
                    voteDown={() => {this.voteDown(post.id)}}
                    toggleCommentsBox = {() => {this.toggleCommentsBox(post.id)}}
                    totalComments={post.commentCount}
                    commentActive={openedComments.includes(post.id)}
                />
                {
                openedComments.includes(post.id) && (
                <div className="post-item-comments">
                    <div className="comment-box">
                        <CommentForm parentId={post.id} />
                    </div>                    
                    <CommentList category={post.category} editComment={this.props.editComment} parentId={post.id} />                    
                </div>
                )}
                <hr />
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        openedComments: state.PostReducer.openedComments
    }
}

let mapDispatchToProps = dispatch => {
    return {
        showDialog: (text, action, payload) => dispatch(showDialog(text, action, payload)),
        voteUp: id => dispatch(voteUp(id)),
        voteDown: id => dispatch(voteDown(id)),
        toggleCommentsBox: (id) => dispatch(toggleCommentsBox(id))
    }
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(PostItem)