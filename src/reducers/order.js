import { SEARCH_ORDER_SUCCESS, ORDER_INPUT_CHANGE, CLEAR_ORDER } from '../action_type/order'

const INITIAL_STATE = {
    pageNum: 1,
    pageSize: 10,
    total: 0,
    list: [],
    searchBy: 'orderNo',
    searchValue: ''
}

export default function order(state = INITIAL_STATE, action){
    switch (action.type){
        case SEARCH_ORDER_SUCCESS:
            return{
                ...state,
                list: action.list,
                pageNum: action.pageNum,
                pageSize: action.pageSize,
                total: action.total,
            }
      
        case ORDER_INPUT_CHANGE:
            return {
                ...state,
                [action.inputType]: action.inputValue
            }

        case CLEAR_ORDER:
            return INITIAL_STATE
        default:
            return state
    }
}