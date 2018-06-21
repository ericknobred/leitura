import { 
    FORM_POST_HANDLE_CHANGE, 
    FORM_POST_SHOW_ERRORS, 
    FORM_POST_SAVE, 
    LOAD_POST_CATEGORY,
    DELETE_POST,
    SORT_POSTS,
    LOAD_POST_BY_ID,
    CLEAR_POST_FORM,
    UPDATE_SCORE,
    TOGGLE_COMMENTS_BOX,
    INCREMENT_COMMENT,
    DECREMENT_COMMENT,
    POST_NOT_FOUND,
    LOAD_POST_DETAIL_BY_ID
} from '../actions/Types'

import {PostEntity} from '../entities'

const initialState = {
    PostEntity,
    inputErrors: [],
    Posts: [],
    loaded: false,
    sort: 'newer',
    saved: false,
    notFound: false,
    openedComments: [],
    postDetail: PostEntity
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FORM_POST_HANDLE_CHANGE:
            return {
                ...state,
                PostEntity: {
                    ...state.PostEntity,
                    [action.input]: action.value
                },
                inputErrors: action.inputErrors

            }
        case FORM_POST_SHOW_ERRORS: 
            return {
                ...state,
                inputErrors: action.inputs
            }
        case FORM_POST_SAVE: {
            return {
                ...state,
                PostEntity,
                inputErrors: [],
                Posts: [
                    ...state.Posts.filter(item => item.id !== action.post.id),
                    {...action.post}
                ],
                saved: true
            }
        }
        case LOAD_POST_CATEGORY: {
            return {                
                ...state,
                PostEntity: {
                    ...initialState.PostEntity
                },
                Posts: action.posts,
                loaded: true
            }
        }
        case SORT_POSTS : {
            return {
                ...state,
                Posts: [...state.Posts.sort(action.condition)],
                sort: action.sort
            }
        }
        case DELETE_POST : {
            return {
                ...state,
                Posts: state.Posts.filter(item => item.id !== action.id)
            }
        }
        case LOAD_POST_BY_ID: {
            return {
                ...state,
                PostEntity: action.PostEntity,
                saved: false
            }
        }

        case LOAD_POST_DETAIL_BY_ID: {
            return {
                ...state,
                postDetail: action.postDetail
            }
        }
        case CLEAR_POST_FORM: {
            return {
                ...state,
                PostEntity: {
                    ...initialState.PostEntity
                },
                inputErrors: []
            }
        }
        case UPDATE_SCORE : {
            return {
                ...state,
                Posts: state.Posts.map(item => item.id === action.post.id ? {...action.post } : item),
                postDetail: state.postDetail.id !== "" ? {...action.post} : state.postDetail
            }
        }       
        case TOGGLE_COMMENTS_BOX : {

            let openedComments = []           
            let i = state.openedComments.indexOf(action.id)
            if (i === -1) {
                openedComments = [...state.openedComments.concat(action.id)]
            } else {
                openedComments = [...state.openedComments.filter(i => i !== action.id)]
            }                         

            return {
                ...state,
                openedComments: openedComments
            }
        }
        case INCREMENT_COMMENT: {
            return {
                ...state,
                Posts: state.Posts.map(item => item.id === action.id ? {...item, commentCount: item.commentCount + 1 } : item)
            }
        }

        case DECREMENT_COMMENT: {
            return {
                ...state,
                Posts: state.Posts.map(item => item.id === action.id ? {...item, commentCount: item.commentCount - 1 } : item)
            }
        }
        case POST_NOT_FOUND : {
            return {
                ...state,
                notFound: true
            }
        }
        default:
            return state
    }
}