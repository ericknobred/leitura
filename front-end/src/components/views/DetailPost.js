import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PostItem from '../post/PostItem'
import NavTop from '../nav/NavTop'

import { loadPostDetailById, clearPostForm } from '../../actions/PostAction'

class DetailPost extends Component {

    componentDidMount(){
        this.props.loadPostDetailById(this.props.postId)
    }

    componentDidUpdate(prevProps){
        if(this.props.saved){
            this.props.history.push("/"+prevProps.postEntity.category)
        }
        if(this.props.notFound){
            this.props.history.push('/PageNotFound')
        }
    }

    goBack(){
        this.props.clearPostForm()
        this.props.history.go(-1)
    }

    editPost(id){
        this.props.history.push(`/edit/${id}`)
    }

    editComment(id){
        this.props.history.push(`/editComment/${id}`)
    }


    render() {
        return (
            <div>
                 <NavTop selected={this.props.postDetail.category} />
                 <div className="app-container">
                    <div className="container">
                        <button className="button-back" onClick={() => this.goBack()}> Back</button> 
                        <div className="app-box">
                            <PostItem post={this.props.postDetail} editPost={(id) => this.editPost(id)} editComment={(id) => this.editComment(id)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state, ownProps) => {
    return {
        postDetail: state.PostReducer.postDetail,
        postId: ownProps.match.params.postId,
        saved: state.PostReducer.saved,
        notFound: state.PostReducer.notFound
    }
}

let mapDispatchToProps = dispatch => {
    return {
        loadPostDetailById: (id) => dispatch(loadPostDetailById(id)),
        clearPostForm: () => dispatch(clearPostForm())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailPost))