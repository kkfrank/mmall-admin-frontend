import connection from '../api/http'
import { GET_ORDER_DETAIL_SUCCESS, CLEAR_ORDER_DETAIL } from '../action_type/order_detail'
import { showLoading, hideLoading, setErrorMsg } from "./loading_error";

export function getDetail(params){
    return (dispatch, getState) => {
        dispatch(showLoading())
        connection.get('/manage/order/detail.do', params)
            .then(res => {
                dispatch({
                    type: GET_ORDER_DETAIL_SUCCESS,
                    order: res.data
                })
                dispatch(hideLoading())
            })
            .catch(err=>{
                dispatch(setErrorMsg(err.message))
            })
    }
}

export function clearDetail(){
    return (dispatch, getState) => {
        dispatch({ type: CLEAR_ORDER_DETAIL })
    }
}