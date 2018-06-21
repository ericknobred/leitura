import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PostForm from '../post/PostForm'
import PostList from '../post/PostList'
import NavTop from '../nav/NavTop'

class Posts extends Component {
    
    componentDidUpdate(prevProps) {
        let { categorySelected, categories } = this.props
       
        if(this.props.loaded !== prevProps.loaded && categorySelected) {
            if (categories.filter(item => item.name === categorySelected).length === 0){
                this.props.history.push("/PageNotFound")
            }
        }
    }

    detailPost(id, category){
        this.props.history.push(`/${category}/${id}`)
    }

    editPost(id){
        this.props.history.push(`/edit/${id}`)
    }

    editComment(id){
        this.props.history.push(`/editComment/${id}`)
    }

    render() {
        let { categorySelected } = this.props
        return (
            <div>
                <NavTop selected={categorySelected} />
                <div className="app-container">
                    <div className="container">
                        {categorySelected && <PostForm category={categorySelected} />}
                        <PostList category={categorySelected} detailPost={(id, category) => this.detailPost(id,category)} editComment={(id) => this.editComment(id)} editPost={(id) => this.editPost(id)} />
                    </div>
                </div>
            </div>
        )
    }
}

var mapStateToProps = (state, ownProps) => {
    return {
        categorySelected: ownProps.match.params.category,
        categories: state.CategoryReducer.categories,
        loaded: state.CategoryReducer.loaded
    }
}
 
  
export default connect(mapStateToProps)(withRouter(Posts))