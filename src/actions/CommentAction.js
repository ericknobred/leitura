import uuid from 'uuid'
import { 
    FORM_COMMENT_HANDLE_CHANGE, 
    FORM_COMMENT_SAVE, 
    FORM_COMMENT_SHOW_ERRORS,
    LOAD_COMMENT_POST,
    DELETE_COMMENT,
    LOAD_COMMENT_BY_ID,
    CLEAR_COMMENT_FORM,
    UPDATE_SCORE_COMMENT,
    COMMENT_NOT_FOUND
} from './Types'

import * as API from '../LeituraApi'
import { addAlert } from './AlertAction'
import { incrementComment, decrementComment } from './PostAction'

export const formCommentHandleChange = (e, errors) => {
    let inputErrors = []
    if(e.target.value.trim() !== ''){
        inputErrors = errors.filter(text => text !== e.target.name)
    } else {
        inputErrors = [...errors]
        inputErrors.push(e.target.name)
    }

    return {
        type: FORM_COMMENT_HANDLE_CHANGE,
        input: e.target.name,
        value: e.target.value,
        inputErrors: inputErrors
    }
}

export const formCommentSave = (CommentEntity) => {
    
    let inputErrors = []
    let comment = { ...CommentEntity }
    let edit = comment.id !== ''

    comment.id = comment.id || uuid.v1()
    for (let property in comment){
        if(comment[property] === null || comment[property] === ""){
            inputErrors.push(property)
        }
    }
    
    return dispatch => {
        if(inputErrors.length > 0){
            dispatch({ type: FORM_COMMENT_SHOW_ERRORS, inputs: inputErrors })
            dispatch(addAlert('Verifique os campos obrigatórios.','warning'))
        } else {
            if(edit) {
                API.editComment(comment)
                .then(data => {
                    commentSuccessHandler(data, dispatch)
                })
                .catch(e=> {
                    dispatch(addAlert('Ocorreu um erro ao salvar este comentário.','error'))
                })
            } else {
                comment.timestamp = Date.now()
                API.addComment(comment)
                .then(data => {
                    commentSuccessHandler(data, dispatch)
                    dispatch(incrementComment(comment.parentId))
                })
                .catch(e => {
                    dispatch(addAlert('Ocorreu um erro ao salvar este comentário.','error'))
                })
            }
        }
    }
}

const commentSuccessHandler = (data, dispatch) => {
    if(data.id){
        dispatch({ type: FORM_COMMENT_SAVE, comment: data })               
        dispatch(addAlert('Comentário salvo com sucesso!','success')) 
    } else {
        dispatch(addAlert('Ocorreu um erro ao salvar este comentário.','error'))
    }
}

export const loadCommentsByPost = (postId) => {
    return dispatch => {
        if(!postId){
            dispatch(addAlert('Você precisa especificar o id do post para carregar os posts','error'))
        }
        API.getAllCommentsByPostId(postId)
        .then(comments => {
            dispatch({ type: LOAD_COMMENT_POST, comments: comments })
            
        })
        .catch(() => {
            dispatch(addAlert(`Ocorreu um erro ao carregar os comentários.`,'error'))
        })
    }
}



export const deleteComment = commentEntity => {
    return dispatch => {
        commentEntity.deleted = true
        API.deleteComment(commentEntity)
        .then(data => {
            if(data.deleted){
                dispatch({ type: DELETE_COMMENT, id: commentEntity.id })
                dispatch(decrementComment(data.parentId))
                dispatch(addAlert(`O comentário foi deletado com sucesso.`,'success'))
            } else {
                dispatch(addAlert(`Ocorreu um erro ao deletar o comentário.`,'error'))
            }
        })
        .catch(() => {
            dispatch(addAlert(`Ocorreu um erro ao deletar o comentário.`,'error'))
        })
    }
}

export const loadCommentById = id => {
    return dispatch => {
        API.getCommentById(id)
        .then(data => {
            if(data.error){
                dispatch({type: COMMENT_NOT_FOUND})
            } else {
                dispatch({type: LOAD_COMMENT_BY_ID, CommentEntity: data})
            }
        })
    }
}

export const clearCommentForm = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_COMMENT_FORM
        })
    }
}

export const voteUp = (id) => {
    return dispatch => {
        API.updateScoreComment(id, {option: 'upVote'})
        .then(data => {
            dispatch({type: UPDATE_SCORE_COMMENT, comment: data})
        })
        .catch(() => {
            dispatch(addAlert(`Ocorreu um erro ao votar positivo no comentário.`,'error'))
        })
    }
}

export const voteDown = (id) => {
    return dispatch => {
        API.updateScoreComment(id, {option: 'downVote'})
        .then(data => {
            dispatch({type: UPDATE_SCORE_COMMENT, comment: data})
        })
        .catch(() => {
            dispatch(addAlert(`Ocorreu um erro ao votar negativo no comentário.`,'error'))
        })
    }
}