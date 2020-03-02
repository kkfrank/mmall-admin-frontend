import connection from '../api/http'
import { showLoading, hideLoading, setErrorMsg } from "./loading_error";
import { GET_STATISTIC_SUCCESS, CLEAR_STATISTIC } from '../action_type/statistic'

export function getStatistic(){
    return (dispatch)=>{
        dispatch(showLoading())
        connection.get("/manage/statistic/base_count.do")
            .then(res => {
                dispatch({
                    type: GET_STATISTIC_SUCCESS,
                    data: res.data
                })
                dispatch(hideLoading())
            })
            .catch(err=>{
                dispatch(setErrorMsg(err.message))
            })
    }
}

export function clearStatistic(){
    return { type : CLEAR_STATISTIC }
}