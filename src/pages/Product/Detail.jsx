import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal/Index'
import Loading from '../../components/Loading/Loading'
import { setErrorMsg, clearErrorMsg } from '../../actions/loading_error'
import { getProductDetail, clearProductDetail, saveProduct, productDetailChange, deleteSubImgs, uploadSubImgsSuccess }  from '../../actions/product_detail'
import connection from "../../api/http";
import ProductForm from './ProductForm'
import './Detail.scss'


@connect((state)=>({
    productDetail: state.productDetail,
    loadingError: state.loadingError
}), (dispatch)=>({
    setErrorMsgFunc(msg){
        dispatch(setErrorMsg(msg))
    },
    clearErrorMsgFunc(){
        dispatch(clearErrorMsg())
    },
    getProductDetailFunc(productId){
        dispatch(getProductDetail(productId));
    },
    clearProductDetailFunc(){
        dispatch(clearProductDetail())
    },
    saveProductFunc(product){
        dispatch(saveProduct(product));
    },
    handleProductDetailChangeFunc(field, value){
        dispatch(productDetailChange(field, value));
    },
    deleteSubImgsFunc(index){
        dispatch(deleteSubImgs(index))
    },
    uploadSubImgsSuccessFunc(data){
        dispatch(uploadSubImgsSuccess(data))
    },

}))
export default class Detail extends Component{
    static propTypes = {
        productDetail: PropTypes.object,
        loadingError: PropTypes.object,
        clearErrorMsgFunc: PropTypes.func,
        setErrorMsgFunc: PropTypes.func,
        saveProductFunc: PropTypes.func,
        deleteSubImgsFunc: PropTypes.func,
        uploadSubImgsSuccessFunc: PropTypes.func
    }

    constructor(props){
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleImageDelete = this.handleImageDelete.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)

        this.onUploadError = this.onUploadError.bind(this)
        this.onUploadSuccess = this.onUploadSuccess.bind(this)

        const { path } = this.props.match
        this.state={
            readOnly: path === '/products/:id',
            isEdit: false,
            isNew: false,
            title: ''
        }
    }

    componentDidMount(){
        const {path} = this.props.match
        const id = this.props.match.params.id;
        if(path === '/products/:id'){//show
            this.setState({
                title: '商品详情'
            })
        }else if(path === '/products/:id/edit'){//edit
            this.setState({
                title: '商品编辑',
                isEdit: true
            })
        }else if(path === '/products/new'){
            this.setState({
                title: '添加商品',
                isNew: true
            })
        }

        if(path !== '/products/new'){
            this.props.getProductDetailFunc(id)
        }
        connection.get('/manage/category/get_category.do', { categoryId: 0 })
            .then(res=>{
                this.props.handleProductDetailChangeFunc('categoryList', [res.data])
            })
    }

    componentWillReceiveProps(nextProps){
        if(this.props.defaultDetail !== nextProps.defaultDetail){
            this.simditor.setValue(nextProps.defaultDetail);
        }
    }

    componentWillUnmount(){
        this.props.clearProductDetailFunc()
    }

    onUploadSuccess(res){
        this.props.uploadSubImgsSuccessFunc(res)
    }

    handleImageDelete(index){
        this.props.deleteSubImgsFunc(index)
    }

    onUploadError(errMsg){
        this.props.setErrorMsgFunc(errMsg)
    }

    handleInputChange(field, e){
        let value = e
        if(field !== 'detail'){
            value = e.target.value
        }
        this.props.handleProductDetailChangeFunc(field, value)
    }

    handleChangeCategory(level, e) {
        const id = e.target.value
        const { categoryList, categorySelected } = this.props.productDetail
        if(id === ''){// clear this level
            let categoryListNew = categoryList.slice(0, level+1)
            let categorySelectedNew = categorySelected.slice(0, level)
            this.props.handleProductDetailChangeFunc('categoryList', categoryListNew)
            this.props.handleProductDetailChangeFunc('categorySelected', categorySelectedNew)

            if(categoryListNew.length >= 2){
                let newCategory = categoryListNew[categoryListNew.length-2].filter(item=>item.id == categorySelectedNew[categorySelectedNew.length-1])[0]
                this.props.handleProductDetailChangeFunc('category', newCategory || {})
            }
            return;
        }

        let categorySelectedNew = categorySelected.slice(0, level)
        categorySelectedNew.push(id)
        let categoryListNew = categoryList.slice(0, level + 1)

        this.props.handleProductDetailChangeFunc('categoryList', categoryListNew)
        this.props.handleProductDetailChangeFunc('categorySelected', categorySelectedNew)

        if(categoryListNew.length >= 1){
            let newCategory = categoryListNew[categoryListNew.length-1].filter(item=>item.id == categorySelectedNew[categorySelectedNew.length-1])[0]
            this.props.handleProductDetailChangeFunc('category', newCategory || {})
        }

        connection.get('/manage/category/get_category.do', {categoryId: id})
            .then(res=>{
                if(res.data.length === 0){
                    return
                }
                let categoryListNew = categoryList.slice(0, level+1)
                categoryListNew.push(res.data)
                this.props.handleProductDetailChangeFunc('categoryList', categoryListNew)
            })
    }

    handleSave(){
        const {id, name, subtitle, subImages, detail, price, stock, categorySelected, categoryId } = this.props.productDetail;
        const product = {
            id,
            name,
            subtitle,
            categoryId: categorySelected[categorySelected.length-1] || categoryId,
            subImages,//:subImages.map(item=>item.uri).join(','),
            price,
            stock,
            status: 1,
            detail
        }
        const nameMap = {
            name: '商品名称',
            subtitle: '商品描述',
            categoryId: '所属分类',
            subImages: '商品图片',
            price: '商品价格',
            stock: '商品库存',
            detail: '商品详情'
        }

        for(let prop in product){
            if((prop === 'categorySelected') && product[prop].length === 0 || !product[prop]){
                this.props.setErrorMsgFunc(nameMap[prop] + ' 不能为空')
                return;
            }
        }
        this.props.saveProductFunc(product)
    }

    render(){
        const { isLoading, errorMsg } = this.props.loadingError;
        return(
            <div>
                <h1>{ this.state.title }</h1>
                {
                    errorMsg && (
                        <Modal
                            onOk={()=> this.props.clearErrorMsgFunc()}
                            onCancel={()=> this.props.clearErrorMsgFunc()}
                            title='对话框'
                            visible={ !!errorMsg }>
                            <p>{ errorMsg }</p>
                        </Modal>
                    )
                }

                {
                    isLoading && <Loading/>
                }
                <ProductForm
                    readOnly={this.state.readOnly}
                    isEdit={this.state.isEdit}
                    isNew={this.state.isNew}
                    product={this.props.productDetail}
                    handleSave={this.handleSave}
                    handleInputChange={this.handleInputChange}
                    handleChangeCategory={this.handleChangeCategory}
                    handleImageDelete={this.handleImageDelete}
                    onUploadSuccess={this.onUploadSuccess}
                    onUploadError={this.onUploadError}/>
            </div>
        )
    }
}
