import connection from '../api/http'
import { SEARCH_ORDER_SUCCESS, ORDER_INPUT_CHANGE, CLEAR_ORDER } from '../action_type/order'
import { showLoading, hideLoading, setErrorMsg } from "./loading_error";

export function listOrders(params){
    return (dispatch, getState)=> {
        dispatch(showLoading())
        connection.get('/manage/order/list.do', params)
            .then(res=>{
                dispatch({
                    type: SEARCH_ORDER_SUCCESS,
                    list: res.data.list,
                    total: res.data.total,
                    pageNum: res.data.pageNum,
                    pageSize: res.data.pageSize,
                })
                dispatch(hideLoading())
            })
            .catch(err=>{
                dispatch(setErrorMsg(err.message))
            })
    }
}

export function searchOrders(params){
    return (dispatch, getState) => {
        dispatch(showLoading())
        connection.get('/manage/order/search.do', params)
            .then(res=>{
                dispatch({
                    type: SEARCH_ORDER_SUCCESS,
                    list: res.data.list,
                    total: res.data.total,
                    pageNum: res.data.pageNum,
                    pageSize: res.data.pageSize,
                })
                dispatch(hideLoading())
            })
            .catch(err=>{
                dispatch(setErrorMsg(err.message))
            })
    }
}

export function inputChange(type, value){
    return (dispatch) => {
        dispatch({
            type: ORDER_INPUT_CHANGE,
            inputType: type,
            inputValue: value
        })
    }
}

export function clearOrder(){
    return (dispatch, getState)=>{
        dispatch({type: CLEAR_ORDER})
    }
}