import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CommentForm from '../comment/CommentForm'
import NavTop from '../nav/NavTop'

import { loadCommentById } from '../../actions/CommentAction'

class EditComment extends Component {

    componentDidMount(){
        this.props.loadCommentById(this.props.commentId)
    }

    componentDidUpdate(prevProps){
        if(this.props.saved){
            this.props.history.go(-1)
        }
        if(this.props.notFound){
            this.props.history.push('/PageNotFound')
        }
    }

    goBack(){
        this.props.history.go(-1)
    }

    render() {
        return (
            <div>
                 <NavTop />
                 <div className="app-container">
                    <div className="container">
                    <button className="button-back" onClick={() => this.goBack()}>Back</button>
                        <div className="app-box">                            
                            <CommentForm />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state, ownProps) => {
    return {
        commentId: ownProps.match.params.commentId,
        saved: state.CommentReducer.saved,
        commentEntity: state.CommentReducer.CommentEntity,
        notFound: state.CommentReducer.notFound
    }
}

let mapDispatchToProps = dispatch => {
    return {
        loadCommentById: (id) => dispatch(loadCommentById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditComment))