import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formCommentHandleChange, formCommentSave } from '../../actions/CommentAction'
import PropTypes from 'prop-types'

class CommentForm extends Component {
  render() {
    
    let {inputErrors, commentEntity, formCommentHandleChange, formCommentSave, parentId} = this.props
    commentEntity.parentId = parentId
    
    return (
      <form className="comment-field"
        onSubmit={e => {
          e.preventDefault() 
          formCommentSave(commentEntity)
        }}
      >
          <input name="author" className={inputErrors.find(text => text === "author") ? 'app-input app-input-sm input-error' : 'app-input app-input-sm'} disabled={ commentEntity.id ? "disabled" : ""} placeholder="Author" value={commentEntity.author} onChange={e => { formCommentHandleChange(e, inputErrors)}} />
          <textarea rows="4" name="body" className={inputErrors.find(text => text === "body") ? 'app-input app-input-sm input-error' : 'app-input app-input-sm'} placeholder="Type your comment..." value={commentEntity.body} onChange={e => { formCommentHandleChange(e, inputErrors)}}></textarea>
          <button className="btn-primary btn-md" type="submit">Save</button>
      </form>
    )   
  }
}
  
  
const mapStateToProps = state => {
  
  return {
    commentEntity: state.CommentReducer.CommentEntity,
    inputErrors: state.CommentReducer.inputErrors
  }
}
  
const mapDispatchToProps = (dispatch) => ({
  formCommentHandleChange: (e, inputErrors) => { dispatch(formCommentHandleChange(e, inputErrors))},
  formCommentSave: (commentEntity) => { dispatch(formCommentSave(commentEntity)) 
  }
})

CommentForm.propTypes = {
  parentId: PropTypes.string
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)