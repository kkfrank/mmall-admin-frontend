import { LOGIN_SUCCESS } from '../action_type/login'

const INITIAL_STATE = {
    user: null
}
export default function login(state = INITIAL_STATE, action){
    switch (action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}
