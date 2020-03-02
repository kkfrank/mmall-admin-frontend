import { combineReducers } from 'redux'
import login from './login'
import user from './user'
import product from './product'
import productDetail from './product_detail'
import statistic from './statistic'
import loadingError from './loading_error'
import category from './category'
import order from './order'
import orderDetail from './order_detail'


export default combineReducers({
    login,
    user,
    product,
    productDetail,
    statistic,
    category,
    order,
    orderDetail,
    loadingError
})