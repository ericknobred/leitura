import { LOAD_CATEGORIES } from './Types'

import { addAlert } from './AlertAction'
import * as API from '../LeituraApi'

export const getAllCategories = () => {
    return dispatch => {
        API.getAllCategories()
        .then(categories => {
            dispatch({type: LOAD_CATEGORIES, categories})
        })
        .catch(e => {
            dispatch(addAlert('Ocorreu um erro ao carregar as categorias', 'error'))
        })
    }
}