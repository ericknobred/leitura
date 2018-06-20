import React, { Component } from 'react'
import {connect} from 'react-redux';
import CommentItem from './CommentItem'

import {loadCommentsByPost} from '../../actions/CommentAction'

class CommentList extends Component {

  componentDidMount(){
      this.props.loadCommentsByPost(this.props.parentId)
  }
  
  componentDidUpdate(prevProps){
    if(this.props.category !== prevProps.category){
      this.props.loadCommentsByPost(this.props.parentId)
    }
  }

  render() {
    
    let { comments } = this.props
      return (
        <div> 
          {this.props.loaded && (
            comments
            .map(item => (<CommentItem category={this.props.category} key={item.id} comment={item} editComment={this.props.editComment} />))
          )}
        </div>
      ) 
  }
}

var mapStateToProps = (state) => {
    return {
      comments: state.CommentReducer.Comments,
      loaded: state.CommentReducer.loaded
    }
  }
  
var mapDispatchToProps = (dispatch) => {
  return {
    loadCommentsByPost: (parentId,sort) => {dispatch(loadCommentsByPost(parentId, sort))}
  }
}

CommentList.propTypes = {
  
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
