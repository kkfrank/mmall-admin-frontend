import { SEARCH_USER_SUCCESS, CLEAR_USER } from '../action_type/user'

const INITIAL_STATE = {
    userList:[],
    total: 0,
    pageSize: 10,
    pageNum: 1
}

export default function user(state = INITIAL_STATE, action){
    switch (action.type){
        case SEARCH_USER_SUCCESS:
            return {
                ...state,
                userList: action.userList,
                pageSize: action.pageSize,
                pageNum: action.pageNum,
                total: action.total
            }
        case CLEAR_USER:
            return INITIAL_STATE
        default:
            return state
    }
}
