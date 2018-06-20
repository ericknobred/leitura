import {SHOW_DIALOG, HIDE_DIALOG} from '../actions/Types'

const initialState = {
    showDialog: false,
    title: 'Atenção!',
    buttonOkText: 'Sim',
    buttonCancelText: 'Não'
}

export default (state = initialState, action) => {
    switch(action.type){
        case SHOW_DIALOG: 
            return {
                ...state,
                ...action.options,
                text: action.text,
                action: action.action,
                payload: action.payload,
                showDialog: true
            }
        case HIDE_DIALOG:
            return initialState
        default: 
            return state
    }
}