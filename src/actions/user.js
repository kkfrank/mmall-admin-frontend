import connection from '../api/http'
import { showLoading, hideLoading, setErrorMsg } from "./loading_error";
import { SEARCH_USER_SUCCESS, CLEAR_USER } from '../action_type/user'

export function searchUsers(pageSize, pageNum){
    return(dispatch, getState) => {
        dispatch(showLoading());

        connection.get('/manage/user/list.do',{ pageSize:pageSize, pageNum:pageNum }).then(res=>{
            dispatch({
                type: SEARCH_USER_SUCCESS,
                userList: res.data.list,
                pageSize: res.data.pageSize,
                total: res.data.total,
                pageNum: res.data.pageNum
            })
            dispatch(hideLoading())
        })
        .catch(err=>{
            dispatch(setErrorMsg(err.message))
        })
    }
}

export function clearUser(){
    return (dispatch, getState) => {
        dispatch({ type: CLEAR_USER })
    }
}