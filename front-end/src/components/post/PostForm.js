import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formPostHandleChange, formPostSave } from '../../actions/PostAction'

class PostForm extends Component {
  render() {
    
    let {inputErrors, postEntity, formPostHandleChange, formPostSave} = this.props
    
    return (
      <div className="app-box">
        <div className="new-post">
            <div className="header">
            {postEntity.id ? (
              <h2>Edit Post</h2>
            ) : (
              <h2>New Post</h2>
            )}              
            </div>
                

      <form 
        onSubmit={e => {
          e.preventDefault() 
          formPostSave(postEntity, this.props.sort)
        }}
      >
      <div className="middle">
          <input name="author"  disabled={postEntity.id ? "disabled" : ""} className={inputErrors.find(text => text === "author") ? 'app-input input-error' : 'app-input'} placeholder="Author" value={postEntity.author} onChange={e => { formPostHandleChange(e, inputErrors)}} />
          <input name="title"  className={inputErrors.find(text => text === "title") ? 'app-input input-error' : 'app-input'} placeholder="Title" value={postEntity.title} onChange={e => { formPostHandleChange(e, inputErrors)}} />
          <textarea rows="4" name="body"  className={inputErrors.find(text => text === "body") ? 'app-input input-error' : 'app-input'} placeholder="Body" value={postEntity.body} onChange={e => { formPostHandleChange(e, inputErrors)}}></textarea>
          <div className="footer">
            <button className="btn-primary btn-lg" type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
    </div>
    )   
  }
}


const mapStateToProps = state => {
  
  return {
    sort: state.PostReducer.sort,
    postEntity: state.PostReducer.PostEntity,
    inputErrors: state.PostReducer.inputErrors,
    category: state.CategoryReducer.categorySelected
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  formPostHandleChange: (e, inputErrors) => { dispatch(formPostHandleChange(e, inputErrors))},
  formPostSave: (postEntity) => { dispatch(formPostSave({
    ...postEntity,
    category: ownProps.category
    })) 
  }
})

PostForm.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)