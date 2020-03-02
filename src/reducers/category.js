import { GET_CATEGORY_SUCCESS, SET_CATEGORY_NAME_SUCCESS, SET_CATEGORY_NAME_FAIL,
    SHOW_SET_CATEGORY_NAME_MODAL, SET_CATEGORY_NAME_LOADING, HIDE_SET_CATEGORY_NAME_MODAL,
    ADD_CATEGORY_FAIL, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_LOADING, HIDE_ADD_CATEGORY_MODAL,
    SHOW_ADD_CATEGORY_MODAL, CATEGORY_FORWARD, CATEGORY_GOBACK, CLEAR_CATEGORY, CHANGE_TEMP_CATEGORY_NAME
} from '../action_type/category'

const INITIAL_STATE = {
    currentCategoryId: 0 ,
    setNameCategoryId: null,
    tempCategoryName: '',
    parentIds: [],
    list: [],
    isShowSetNameModal: false,
    isSetNameLoading: false,
    isShowAddModal: false,
    isAddLoading: false,
}

export default function category(state = INITIAL_STATE, action){
    switch (action.type){
        case CATEGORY_FORWARD:
            if(action.parentId === null){
                return INITIAL_STATE
            }else{
                return {
                    ...state,
                    parentIds: [...state.parentIds,  action.parentId],
                }
            }
        case CATEGORY_GOBACK:
            return {
                ...state,
                parentIds: state.parentIds.slice(0, state.parentIds.length - 1)
            }
        case GET_CATEGORY_SUCCESS:
            return{
                ...state,
                currentCategoryId: action.currentCategoryId,
                list: action.list
            }
        case SHOW_SET_CATEGORY_NAME_MODAL:
            return {
                ...state,
                setNameCategoryId: action.id,
                tempCategoryName: action.name,
                isShowSetNameModal: true
            }
        case HIDE_SET_CATEGORY_NAME_MODAL:
            return {
                ...state,
                setNameCategoryId: null,
                tempCategoryName: '',
                isShowSetNameModal: false
            }
        case SET_CATEGORY_NAME_LOADING:
            return{
                ...state,
                isSetNameLoading: true
            }
        case SET_CATEGORY_NAME_SUCCESS:
            return{
                ...state,
                isSetNameLoading: false,
                list: state.list.map(item=>{
                    if(item.id !== action.categoryId){
                        return item
                    }else{
                        return{
                            ...item,
                            // id: action.categoryId,
                            name: action.categoryName
                        }
                    }
                })
            }
        case SET_CATEGORY_NAME_FAIL:
            return {
                ...state,
                isShowSetNameModal: false,
                isSetNameLoading: false,
            }
        case SHOW_ADD_CATEGORY_MODAL:
            return {
                ...state,
                tempCategoryName: '',
                isShowAddModal: true
            }
        case HIDE_ADD_CATEGORY_MODAL:
            return{
                ...state,
                isShowAddModal: false
            }
        case ADD_CATEGORY_LOADING:
            return {
                ...state,
                isAddLoading: true
            }
        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                isAddLoading: false
            }
        case ADD_CATEGORY_FAIL:
            return {
                ...state,
                isAddLoading: false,
                isShowAddModal: false
            }
        case CHANGE_TEMP_CATEGORY_NAME:
            return {
                ...state,
                tempCategoryName: action.name
            }
        case CLEAR_CATEGORY:
            return INITIAL_STATE
        default:
            return state
    }
}