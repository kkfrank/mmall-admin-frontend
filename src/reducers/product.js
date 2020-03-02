import { SEARCH_PRODUCT_SUCCESS, SET_STATUS_SUCCESS, SEARCH_INPUT_CHANGE, CLEAR_PRODUCT
} from '../action_type/product'

const INITIAL_STATE = {
    searchType: 'id',
    searchValue: '',
    productList: [],
    productListStatus: [],
    total: 0,
    pageSize: 10,
    pageNum: 1
}

function updateProductStatus(list, productId, status){
    return list.map(item=>{
        if(item.id === productId){
            return{
                ...item,
                status:status
            }
        }else{
            return item;
        }
    })
}

export default function product(state = INITIAL_STATE, action){
    switch (action.type){
        case SEARCH_PRODUCT_SUCCESS:
            return {
                ...state,
                productList: action.productList,
                pageSize: action.pageSize,
                pageNum: action.pageNum,
                total:action.total
            }
        case SET_STATUS_SUCCESS:
            return {
                ...state,
                productList: updateProductStatus(state.productList, action.id, action.status)
            }
        case SEARCH_INPUT_CHANGE:
           if(['searchType', 'searchValue'].indexOf(action.byType) < 0){
               return state;
           }
            return{
                ...state,
                [action.byType]: action.value
            }
        case CLEAR_PRODUCT:
            return INITIAL_STATE
        default:
            return state
    }
}
