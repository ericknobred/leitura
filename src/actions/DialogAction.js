import { SHOW_DIALOG, HIDE_DIALOG } from './Types'

export const showDialog = (text, action, payload, options = {}) => {
    return {
        type: SHOW_DIALOG,
        text,
        action,
        payload,
        options
    }
}

export const hideDialog = () => {
    return {
        type: HIDE_DIALOG
    }
}