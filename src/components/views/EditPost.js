import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PostForm from '../post/PostForm'
import NavTop from '../nav/NavTop'

import { loadPostById } from '../../actions/PostAction'

class EditPost extends Component {

    componentDidMount(){
        this.props.loadPostById(this.props.postId)
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
        this.props.history.push("/"+this.props.postEntity.category)
    }

    render() {
        return (
            <div>
                 <NavTop selected={this.props.postEntity.category} />
                 <div className="app-container">
                    <div className="container">
                        <button className="button-back" onClick={() => this.goBack()}> Back</button>                          
                        <PostForm />
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state, ownProps) => {
    return {
        postId: ownProps.match.params.postId,
        saved: state.PostReducer.saved,
        postEntity: state.PostReducer.PostEntity,
        notFound: state.PostReducer.notFound
    }
}

let mapDispatchToProps = dispatch => {
    return {
        loadPostById: (id) => dispatch(loadPostById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPost))