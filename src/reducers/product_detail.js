import { GET_PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_CHANGE, CLEAR_PRODUCT_DETAIL } from '../action_type/product_detail'

const INITIAL_STATE = {
    id: null,
    name:'',
    subtitle:'',
    imageHost:'',
    subImages: '',
    detail: '',
    price: '',
    stock: '',
    categoryId:'',
    parentCategoryId:'',
    category:{},
    categoryList:[],
    categorySelected:[]
}

export default function productDetail(state = INITIAL_STATE, action){
    switch (action.type){
        case GET_PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                ...action.product
            }
        case PRODUCT_DETAIL_CHANGE:
            return {
                ...state,
                [action.filed]: action.value
            }
        case CLEAR_PRODUCT_DETAIL:
            return{
                ...INITIAL_STATE
            }
        default:
            return state
    }
}
