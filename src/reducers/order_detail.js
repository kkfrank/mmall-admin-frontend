import { GET_ORDER_DETAIL_SUCCESS, CLEAR_ORDER_DETAIL } from '../action_type/order_detail'

const INITIAL_STATE ={
    order: {}
}

export default function orderDetail(state = INITIAL_STATE, action){
    switch (action.type){
        case GET_ORDER_DETAIL_SUCCESS:
            return {
                order: action.order
            }
        case CLEAR_ORDER_DETAIL:
            return INITIAL_STATE
        default:
            return state
    }
}
