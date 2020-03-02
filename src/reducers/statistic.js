import { GET_STATISTIC_SUCCESS, CLEAR_STATISTIC } from '../action_type/statistic'

const INITIAL_STATE = {
    userCount: 0,
    productCount: 0,
    orderCount: 0
}

export default function statistic(state = INITIAL_STATE, action){
    switch (action.type){
        case GET_STATISTIC_SUCCESS:
            return {
                ...state,
                userCount: action.data.userCount,
                productCount: action.data.productCount,
                orderCount: action.data.orderCount,
            }
        case CLEAR_STATISTIC:
            return INITIAL_STATE
        default:
            return state
    }
}