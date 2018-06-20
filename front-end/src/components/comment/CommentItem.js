import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteComment, voteUp, voteDown} from '../../actions/CommentAction'
import PropTypes from 'prop-types'
import moment from 'moment'
import ButtonBar from '../others/ButtonBar'
import ButtonActionBar from '../others/ButtonActionBar'

import { showDialog } from '../../actions/DialogAction'

class CommentItem extends Component{

    editComment(id){
        this.props.editComment(id)
    }

    openDialogDelete(comment) {
        this.props.showDialog('Deseja realmente deletar este comentário?', deleteComment, comment)
    }

    voteUp(id){
        this.props.voteUp(id)
    }

    voteDown(id){
        this.props.voteDown(id)
    }
   
    render() {
        let { comment } = this.props
        return (
            <div className="comment-box">
            <div className="comment-item">
                <ButtonActionBar 
                    openDialogDelete={() => {this.openDialogDelete(comment)}}  
                    edit={() => {this.editComment(comment.id)}}  
                />
                <div className="comment-info">
                    <div className="comment-user-name">
                    {comment.author}
                    <br />
                    <small className='comment-date-created'>{moment(comment.timestamp).toNow()}</small>
                    </div>
                </div>
                <div className="comment-body">
                    {comment.body}
                </div>
                <ButtonBar 
                    score={comment.voteScore}
                    voteUp={() => {this.voteUp(comment.id)}}  
                    voteDown={() => {this.voteDown(comment.id)}}  
                    />
                </div>
            </div>
        )
    }
}

let mapStateToProps = () => {
    return {

    }
}

let mapDispatchToProps = dispatch => {
    return {
        showDialog: (text, action, payload) => dispatch(showDialog(text, action, payload)),
        voteUp: id => dispatch(voteUp(id)),
        voteDown: id => dispatch(voteDown(id))
    }
}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentItem)