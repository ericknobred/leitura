import uuid from 'uuid'
import { 
    FORM_POST_HANDLE_CHANGE, 
    FORM_POST_SAVE, 
    FORM_POST_SHOW_ERRORS,
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
} from './Types'

import * as API from '../LeituraApi'
import { addAlert } from './AlertAction'

export const formPostHandleChange = (e, errors) => {
    let inputErrors = []
    if(e.target.value.trim() !== ''){
        inputErrors = errors.filter(text => text !== e.target.name)
    } else {
        inputErrors = [...errors]
        inputErrors.push(e.target.name)
    }

    return {
        type: FORM_POST_HANDLE_CHANGE,
        input: e.target.name,
        value: e.target.value,
        inputErrors: inputErrors
    }
}

export const formPostSave = (PostEntity, sort) => {
    
    let inputErrors = []
    let post = { ...PostEntity }
    let edit = post.id !== ''

    post.id = post.id || uuid.v1()
    for (let property in post){
        if(post[property] === null || post[property] === ""){
            inputErrors.push(property)
        }
    }
    
    return dispatch => {
        if(inputErrors.length > 0){
            dispatch({ type: FORM_POST_SHOW_ERRORS, inputs: inputErrors })
            dispatch(addAlert('Verifique os campos obrigatórios.','warning'))
        } else {
            if(edit) {
                API.editPost(post)
                .then(data => {
                    postSuccessHandler(data, dispatch)
                })
                .catch(e=> {
                    dispatch(addAlert('Ocorreu um erro ao salvar este Post.','error'))
                })
            } else {
                post.timestamp = Date.now()
                API.addPost(post)
                .then(data => {
                    postSuccessHandler(data, dispatch)
                })
                .catch(e => {
                    dispatch(addAlert('Ocorreu um erro ao salvar este Post.','error'))
                })
            }
        }
    }
}

const postSuccessHandler = (data, dispatch) => {
    if(data.id){
        dispatch({ type: FORM_POST_SAVE, post: data })               
        dispatch(addAlert('Post salvo com sucesso!','success')) 
    } else {
        dispatch(addAlert('Ocorreu um erro ao salvar este Post.','error'))
    }
}

export const loadAllPosts = (sort) => {
    return dispatch => {
        API.getAllPost()
        .then(posts => {
            dispatch({ type: LOAD_POST_CATEGORY, posts: posts })
            dispatch(sortPosts(sort))            
        })
        .catch(() => {
            dispatch(addAlert(`Ocorreu um erro ao carregar os posts.`,'error'))
        })
    }
}

export const loadPostsByCategory = (category, sort) => {
    return dispatch => {
        if(!category){
            dispatch(addAlert('Você precisa especificar a categoria para carregar os posts','error'))
        }
        API.getAllPostByCategory(category)
        .then(posts => {
            dispatch({ type: LOAD_POST_CATEGORY, posts: posts })
            dispatch(sortPosts(sort))
            
        })
        .catch(() => {
            dispatch(addAlert(`Ocorreu um erro ao carregar os posts da categoria este ${category}.`,'error'))
        })
    }
}

export const sortPosts = condition => {
    let sort = condition
    switch (sort){
        case "newer":
            condition = (a,b) => a.timestamp < b.timestamp
          break;
        case "older":
            condition = (a,b) => a.timestamp > b.timestamp
          break;
        case "most_voted":
            condition = (a,b) => a.voteScore < b.voteScore
          break;
        case "least_voted":
            condition = (a,b) => a.voteScore > b.voteScore
          break;
        default:
            condition = (a,b) => a.timestamp < b.timestamp
    }
    
    return {
        type: SORT_POSTS,
        condition,
        sort
    }
}

export const deletePost = postEntity => {
    return dispatch => {
        postEntity.deleted = true
        API.deletePost(postEntity)
        .then(data => {
            if(data.deleted){
                dispatch({ type: DELETE_POST, id: postEntity.id })
                dispatch(addAlert(`O post foi deletado com sucesso.`,'success'))
            } else {
                dispatch(addAlert(`Ocorreu um erro ao deletar o post.`,'error'))
            }
        })
        .catch(() => {
            dispatch(addAlert(`Ocorreu um erro ao deletar o post.`,'error'))
        })
    }
}

export const loadPostById = id => {
    return dispatch => {
        API.getPostById(id)
        .then(data => {
            if(data.error){
                dispatch({type: POST_NOT_FOUND})
            } else {
                dispatch({type: LOAD_POST_BY_ID, PostEntity: data})
            }
        })
    }
}

export const loadPostDetailById = id => {
    return dispatch => {
        API.getPostById(id)
        .then(data => {
            if(data.error){
                dispatch({type: POST_NOT_FOUND})
            } else {
                dispatch({type: LOAD_POST_DETAIL_BY_ID, postDetail: data})
            }
        })
    }
}

export const clearPostForm = () => {

    return dispatch => {
        dispatch({
            type: CLEAR_POST_FORM
        })
    }


}

export const voteUp = (id) => {
    return dispatch => {
        API.updateScore(id, {option: 'upVote'})
        .then(data => {
            dispatch({type: UPDATE_SCORE, post: data})
        })
        .catch(() => {
            dispatch(addAlert(`Ocorreu um erro ao votar positivo no post.`,'error'))
        })
    }
}

export const voteDown = (id) => {
    return dispatch => {
        API.updateScore(id, {option: 'downVote'})
        .then(data => {
            dispatch({type: UPDATE_SCORE, post: data})
        })
        .catch(() => {
            dispatch(addAlert(`Ocorreu um erro ao votar negativo no post.`,'error'))
        })
    }
}

export const toggleCommentsBox = (id) => {
    return {
        type: TOGGLE_COMMENTS_BOX,
        id
    }
}

export const incrementComment = (id) => {
    return {
        type: INCREMENT_COMMENT,
        id
    }
}

export const decrementComment = (id) => {
    return {
        type: DECREMENT_COMMENT,
        id
    }
}