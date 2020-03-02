import { SHOW_LOADING, HIDE_LOADING, SET_ERROR_MESSAGE, CLAER_ERROR_MESSAGE } from '../action_type/loading_error'

export function showLoading(){
    return{
        type: SHOW_LOADING
    }
}

export function hideLoading(){
    return{
        type: HIDE_LOADING
    }
}

export function setErrorMsg(message){
    return{
        type: SET_ERROR_MESSAGE,
        message
    }
}

export function clearErrorMsg(){
    return{
        type: CLAER_ERROR_MESSAGE
    }
}

