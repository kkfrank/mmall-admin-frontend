import connection from '../api/http'

import { GET_CATEGORY_SUCCESS, SET_CATEGORY_NAME_SUCCESS, SHOW_SET_CATEGORY_NAME_MODAL,
    SET_CATEGORY_NAME_LOADING, HIDE_SET_CATEGORY_NAME_MODAL, SET_CATEGORY_NAME_FAIL,
    ADD_CATEGORY_FAIL, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_LOADING, SHOW_ADD_CATEGORY_MODAL,
    HIDE_ADD_CATEGORY_MODAL, CATEGORY_FORWARD, CATEGORY_GOBACK, CLEAR_CATEGORY, CHANGE_TEMP_CATEGORY_NAME
} from '../action_type/category'
import { showLoading, hideLoading, setErrorMsg } from "./loading_error";


export function categoryForward(id, parentId){
    return (dispatch) => {
        dispatch({
            type: CATEGORY_FORWARD,
            id,
            parentId
        })
        dispatch(getCategoryById(id))
    }
}

export function categoryGoback(){
    return (dispatch, getState) => {
        let parentId = getState().category.parentIds.slice().pop()
        dispatch({ type: CATEGORY_GOBACK})
        dispatch(getCategoryById(parentId))
    }
}

export function getCategoryById(id){
    return (dispatch, getState) => {
        dispatch(showLoading())
        connection.get('/manage/category/get_category.do', { categoryId: id })
            .then(res=>{
                dispatch({
                    type: GET_CATEGORY_SUCCESS,
                    currentCategoryId: id,
                    list: res.data
                })
                dispatch(hideLoading())
            })
            .catch(err=>{
                dispatch(setErrorMsg(err.message))
            })
    }
}

export function setCategoryName(){
    return (dispatch, getState) => {
        const {setNameCategoryId, tempCategoryName} = getState().category

        dispatch({ type: SET_CATEGORY_NAME_LOADING })
        connection.post('/manage/category/set_category_name.do', null, {categoryId: setNameCategoryId, categoryName: tempCategoryName})
            .then(res=>{
                dispatch({
                    type: SET_CATEGORY_NAME_SUCCESS,
                    categoryId: setNameCategoryId,
                    categoryName: tempCategoryName
                })
                dispatch(hideSetNameModal())
            })
            .catch(err=>{
                dispatch({type: SET_CATEGORY_NAME_FAIL})
                dispatch(setErrorMsg(err.message))
            })
    }
}

export function showSetNameModal(id, name){
    return {
        type: SHOW_SET_CATEGORY_NAME_MODAL,
        id,
        name
    }
}

export function hideSetNameModal(){
    return {
        type: HIDE_SET_CATEGORY_NAME_MODAL
    }
}

export function showAddCategoryModal(){
    return {
        type: SHOW_ADD_CATEGORY_MODAL
    }
}

export function hideAddCategoryModal(){
    return {
        type: HIDE_ADD_CATEGORY_MODAL
    }
}

export function addCategory(){
    return (dispatch, getState)=>{
        const {currentCategoryId, tempCategoryName} = getState().category

        dispatch({type: ADD_CATEGORY_LOADING})
        connection.post('/manage/category/add_category.do', null, {parentId: currentCategoryId , categoryName: tempCategoryName})
            .then(res => {
                dispatch({type: ADD_CATEGORY_SUCCESS})
                dispatch(hideAddCategoryModal())
                dispatch(getCategoryById(currentCategoryId))
            })
            .catch(err => {
                dispatch({type: ADD_CATEGORY_FAIL})
                dispatch(setErrorMsg(err.message))
            })
    }
}

export function changeTempCategoryName(name){
    return{
        type: CHANGE_TEMP_CATEGORY_NAME,
        name
    }
}

export function clearCategory() {
    return (dispatch, getState) => {
        dispatch({ type: CLEAR_CATEGORY })
    }
}