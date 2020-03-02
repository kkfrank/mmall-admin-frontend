import { SHOW_LOADING, HIDE_LOADING, SET_ERROR_MESSAGE, CLAER_ERROR_MESSAGE } from '../action_type/loading_error'

const INITIAL_STATE = {
    isLoading: false,
    errorMsg:''
}
export default function loadingError(state = INITIAL_STATE, action){
    switch (action.type){
        case SHOW_LOADING:
            return {
                ...state,
                isLoading: true,
                errorMsg: ''
            }
        case HIDE_LOADING:
            return {
                ...state,
                isLoading: false,
            }
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                isLoading:false,
                errorMsg: action.message
            }
        case CLAER_ERROR_MESSAGE:
            return {
                ...state,
                errorMsg: ''
            }
        default:
            return state
    }
}
