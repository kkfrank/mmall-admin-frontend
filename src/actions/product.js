import connection from '../api/http'
import { SEARCH_PRODUCT_SUCCESS, CLEAR_PRODUCT, SET_STATUS_LOGINING, SET_STATUS_SUCCESS,
    SEARCH_INPUT_CHANGE } from '../action_type/product'
import {showLoading, hideLoading, setErrorMsg} from "./loading_error";

export function searchProducts(params){
    return (dispatch, getState)=>{
        dispatch(showLoading())

        connection.get("/manage/product/search.do", params)
            .then(res=>{
                dispatch({
                    type: SEARCH_PRODUCT_SUCCESS,
                    productList: res.data.list,
                    total:res.data.total,
                    pageSize:res.data.pageSize,
                    pageNum:res.data.pageNum
                })
                dispatch(hideLoading())
            })
            .catch(err=>{
                dispatch(setErrorMsg(err.message))
            })
    }
}

export function updateSaleStatus(productId, status){
    return (dispatch, getState)=> {
        dispatch({
            type: SET_STATUS_LOGINING
        })

        connection.post('/manage/product/set_sale_status.do',null, {productId:productId, status: status})
            .then(res=>{
                dispatch({
                    type: SET_STATUS_SUCCESS,
                    id: productId,
                    status: status
                })
            })
            .catch(err=>{
                dispatch(setErrorMsg(err.message))
            })
    }
}

export function searchInputChange(byType, value){
    return (dispatch, getState)=>{
        dispatch({
            type: SEARCH_INPUT_CHANGE,
            byType,
            value
        })
    }
}

export function clearProduct(){
    return {
        type: CLEAR_PRODUCT
    }
}