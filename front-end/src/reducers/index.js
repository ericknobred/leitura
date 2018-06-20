import { combineReducers } from 'redux'
import PostReducer from './PostReducer'
import CommentReducer from './CommentReducer'
import AlertReducer from './AlertReducer'
import DialogReducer from './DialogReducer'
import CategoryReducer from './CategoryReducer'
import { routerReducer } from 'react-router-redux'
export default combineReducers({
    PostReducer,
    CommentReducer,
    AlertReducer, 
    DialogReducer, 
    CategoryReducer, 
    routing: routerReducer})