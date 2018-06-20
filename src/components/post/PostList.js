import React, { Component } from 'react'
import {connect} from 'react-redux';

import PostItem from './PostItem'

import {loadPostsByCategory, sortPosts} from '../../actions/PostAction'

class PostList extends Component {

  componentDidMount(){
    if(this.props.categoryLoaded){
        this.props.loadPostsByCategory(this.props.category, this.props.sort)
    }
  }
  
  componentDidUpdate(prevProps){
    
    if(this.props.categoryLoaded !== prevProps.categoryLoaded || this.props.category !== prevProps.category){
      this.props.loadPostsByCategory(this.props.category, this.props.sort)
    }
  }

  render() {
    
    let { posts } = this.props
      return (
        <div>
        <select className="order-select" defaultValue={this.props.sort} onChange={e=> this.props.sortPosts(e.target.value)}>
            <option value="newer">Newer</option>
            <option value="older">Older</option>
            <option value="most_voted">Most Voted</option>
            <option value="least_voted">Least Voted</option>
          </select>
        <div className="app-box">  
          {(this.props.loaded && posts.length === 0) && 
            (<p>Não existe nenhum post para carregar nesta categoria.</p>)
          }
          {this.props.loaded && (
            posts
            .map(item => (<PostItem key={item.id} post={item} editPost={this.props.editPost} editComment={this.props.editComment} />))
          )}
        </div>
        </div>
      ) 
  }
}

var mapStateToProps = (state) => {
    return {
      posts: state.PostReducer.Posts,
      loaded: state.PostReducer.loaded,
      categoryLoaded: state.CategoryReducer.loaded,
      sort: state.PostReducer.sort
    }
  }
  
var mapDispatchToProps = (dispatch) => {
  return {
    loadPostsByCategory: (category,sort) => {dispatch(loadPostsByCategory(category, sort))},
    sortPosts: (condition) => {dispatch(sortPosts(condition))}
  }
}

PostList.propTypes = {
  
}
  
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
