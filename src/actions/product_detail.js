import connection from '../api/http'
import { GET_PRODUCT_DETAIL_SUCCESS, SAVE_PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_CHANGE,CLEAR_PRODUCT_DETAIL } from '../action_type/product_detail'
import { showLoading, hideLoading, setErrorMsg } from "./loading_error";
import { createHashHistory } from 'history';
const history = createHashHistory();

export function getProductDetail(productId){
    return (dispatch, getState) => {
        dispatch(showLoading())
        connection.get("/manage/product/detail.do", {productId:productId})
            .then(res=>{
                const product = res.data
                const parentId = product.parentCategoryId

                connection.get('/manage/category/get_category.do', { categoryId: parentId })
                    .then(res2=>{
                        product.category = res2.data.filter(item => {
                            return item.id === product.categoryId
                        })[0]

                        dispatch({
                            type: GET_PRODUCT_DETAIL_SUCCESS,
                            product: product
                        })
                        dispatch(hideLoading())
                    })
            })
            .catch(err=>{
                dispatch(setErrorMsg(err.message))
            })
    }
}

export function clearProductDetail(){
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_PRODUCT_DETAIL
        })
    }
}

export function saveProduct(product){
    return (dispatch, getState) => {
        dispatch(showLoading())
        connection.post('/manage/product/save.do', {}, product)
            .then(res=>{
                dispatch({
                    type: SAVE_PRODUCT_DETAIL_SUCCESS,
                })
                // window.location.href = `${BASE_URL}products`
                history.push('/products')
            })
            .catch(err=>{
                dispatch(setErrorMsg(err.message))
            })
    }
}


export function productDetailChange(filed, value){
    return (dispatch, getState) => {
        dispatch({
            type: PRODUCT_DETAIL_CHANGE,
            filed,
            value
        })
    }
}


export function deleteSubImgs(index){
    return (dispatch, getState) => {
        let subImages  = getState().productDetail.subImages.split(',');
        subImages = subImages.filter((img, i) => {
            return i !== index;
        }).join(',')
        dispatch(productDetailChange('subImages', subImages))
    }
}

export function uploadSubImgsSuccess(data){
    let {url, uri} = data
    return (dispatch, getState) => {
        let { imageHost, subImages } = getState().productDetail;
        if(subImages && subImages.length > 0){
            subImages = subImages.split(',')
            subImages.push(uri)
            subImages = subImages.join(',');
        }else{
            subImages = uri
        }
        dispatch(productDetailChange('subImages', subImages))
        if(!imageHost){
            imageHost = url.slice(0, url.indexOf(uri))
            dispatch(productDetailChange('imageHost', imageHost))
        }
    }
}

