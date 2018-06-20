import {LOAD_CATEGORIES} from '../actions/Types'

const initialState ={
    loaded: false,
    categories: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case LOAD_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories],
                loaded: true
            }
        default:
            return state
    }
}