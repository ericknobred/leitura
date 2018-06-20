import uuid from 'uuid';
import { ADD_ALERT, REMOVE_ALERT } from '../actions/Types'

let initialState = {
    alerts: [],
    autoCloseTime: 5000
}

let AlertReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALERT:
        return {
            ...state,
            alerts: [
                ...state.alerts,          
                {
                    text: action.text,
                    style: action.style,
                    id: uuid.v1()
                }
            ]
        }
        case REMOVE_ALERT:
        return {
            ...state,
            alerts: state.alerts.filter((alert) => alert.id !== action.id )
        }

        default:
        return state;
    }
};

export default AlertReducer