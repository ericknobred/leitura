import { 
    FORM_COMMENT_HANDLE_CHANGE, 
    FORM_COMMENT_SHOW_ERRORS, 
    FORM_COMMENT_SAVE, 
    LOAD_COMMENT_POST,
    DELETE_COMMENT,
    LOAD_COMMENT_BY_ID,
    CLEAR_COMMENT_FORM,
    UPDATE_SCORE_COMMENT,
    COMMENT_NOT_FOUND
} from '../actions/Types'

import {CommentEntity} from '../entities'

const initialState = {
    CommentEntity,
    inputErrors: [],
    Comments: [],
    loaded: false,
    saved: false,
    notFound: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FORM_COMMENT_HANDLE_CHANGE:
            return {
                ...state,
                CommentEntity: {
                    ...state.CommentEntity,
                    [action.input]: action.value
                },
                inputErrors: action.inputErrors

            }
        case FORM_COMMENT_SHOW_ERRORS: 
            return {
                ...state,
                inputErrors: action.inputs
            }
        case FORM_COMMENT_SAVE: {
            return {
                ...state,
                CommentEntity,
                inputErrors: [],
                Comments: [
                    ...state.Comments.filter(item => item.id !== action.comment.id),
                    {...action.comment}
                ],
                saved: true
            }
        }
        case LOAD_COMMENT_POST: {
            return {                
                ...state,
                CommentEntity: {
                    ...initialState.CommentEntity
                },
                Comments: action.comments,
                loaded: true
            }
        }
        
        case DELETE_COMMENT : {
            return {
                ...state,
                Comments: state.Comments.filter(item => item.id !== action.id)
            }
        }
        case LOAD_COMMENT_BY_ID: {
            
            return {
                ...state,
                CommentEntity: {                    
                    ...action.CommentEntity
                
                },
                saved: false
            }
        }
        case CLEAR_COMMENT_FORM: {
            return {
                ...state,
                CommentEntity: {
                    ...initialState.CommentEntity
                },
                inputErrors: []
            }
        }
        case UPDATE_SCORE_COMMENT : {
            return {
                ...state,
                Comments: state.Comments.map(item => item.id === action.comment.id ? {...action.comment } : item)
            }
        }
        case COMMENT_NOT_FOUND : {
            return {
                ...state,
                notFound: true
            }
        }
        default:
            return state
    }
}