import React, { Component } from 'react'
import Simditor from 'simditor';

import PropTypes from 'prop-types'
import Modal from '../../components/Modal/Index'
import FileUploader from '../../components/file-uploader/index'
import './Detail.scss'
import 'simditor/styles/simditor.scss';
export default class ProductForm extends Component{
    static propTypes = {
        product: PropTypes.object,
        readOnly: PropTypes.bool,
        isEdit: PropTypes.bool,

        handleInputChange: PropTypes.func,
        handleChangeCategory: PropTypes.func,
        handleImageDelete: PropTypes.func,
        onUploadSuccess: PropTypes.func,
        onError: PropTypes.func,
        clearErrorMsgFunc: PropTypes.func,
        setErrorMsgFunc: PropTypes.func,
        handleSave: PropTypes.func,
    }

    constructor(props){
        super(props)
        this.handleCancelChangeCategoryEdit = this.handleCancelChangeCategoryEdit.bind(this)
        this.handleShowChangeCategoryEdit = this.handleShowChangeCategoryEdit.bind(this)
        this.handleConfirmChangeCategoryEdit = this.handleConfirmChangeCategoryEdit.bind(this)
        this.initEditor=this.initEditor.bind(this)
        this.state = {
            showChangeCategory: false,
            prevCategoryList: [],
            prevCategorySelected: []
        }
    }

    componentDidMount(){
        const { readOnly } = this.props
        !readOnly && this.initEditor()

        this.setState({
            prevCategoryList: this.props.product.categoryList,
            prevCategorySelected: this.props.product.categorySelected
        })
    }

    componentWillReceiveProps(nextProps){
        const { readOnly } = this.props
        if(this.props.product.detail !== nextProps.product.detail && !readOnly){
            this.simditor.setValue(nextProps.product.detail);
        }
    }

    handleShowChangeCategoryEdit(){
        this.setState({
            showChangeCategory: true
        })
    }

    handleCancelChangeCategoryEdit(){
        this.setState({
            showChangeCategory: false
        })
        const categoryList =  this.state.prevCategoryList
        this.props.handleInputChange('categoryList', categoryList)
        this.props.handleInputChange('categorySelected', this.state.prevCategorySelected)
        this.props.handleInputChange('category', categoryList[categoryList.length-1] || {})
    }

    handleConfirmChangeCategoryEdit() {
        this.setState({
            showChangeCategory: false
        })
    }

    initEditor(){
        let element = this.editorRef;
        this.simditor = new Simditor({
            textarea: element,
            defaultValue: this.props.product.detail || '请输入内容',
            upload: {
                url             : '/manage/product/richtext_img_upload.do',
                defaultImage    : '',
                fileKey         : 'upload_file'
            }
        });
        this.simditor.on('valuechanged', e => {
            this.props.handleInputChange('detail', this.simditor.getValue());
        })
    }

    render(){
        const { name, subtitle, detail, price, stock, categoryList, categorySelected, imageHost, category} = this.props.product
        const { readOnly, isEdit, isNew } = this.props
        let { subImages } = this.props.product
        if(subImages && subImages.length > 0){
            subImages = subImages.split(',').map(imgUri => ({
                uri: imgUri,
                url: imageHost + imgUri
            }))
        }else{
            subImages = []
        }

        return(
            <div>
                <Modal
                    onOk={()=> this.handleConfirmChangeCategoryEdit()}
                    onCancel={()=> this.handleCancelChangeCategoryEdit()}
                    title='修改分类'
                    visible={ this.state.showChangeCategory }>
                    <div>
                        {
                            categoryList.map((category, i)=>(
                                <select onChange={(e)=>this.props.handleChangeCategory(i ,e)}
                                        value={categorySelected[i]} key={i} readOnly={readOnly} className='mb10'>
                                    <option value=''>请选择{ i + 1 }级分类</option>
                                    {
                                        category.map(item=>(
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            ))
                        }
                    </div>
                </Modal>

                <div className='g12 p0 pb20'>
                    <label className='left'>商品名称:</label>
                    <div className='g8 p0'>
                        <input value={name} onChange={(e)=>{this.props.handleInputChange('name', e)}} readOnly={readOnly}/>
                    </div>
                </div>
                <div className='g12 p0 pb20'>
                    <label className='left'>商品描述</label>
                    <div className='g8 p0'>
                        <input value={subtitle} onChange={(e)=>{this.props.handleInputChange('subtitle', e)}} readOnly={readOnly}/>
                    </div>
                </div>
                <div className='g12 p0 pb20'>
                    <label className='left'>所属分类:</label>
                    {
                        !isNew && (category && <div className={`${isEdit? 'g6' : 'g8'} p0 mr10`}><input value={category.name} readOnly={true} onChange={ ()=>{} }/></div>)
                    }
                    {
                        !readOnly && isEdit && (
                            <div className='g2 p0'><button className='btn' onClick={this.handleShowChangeCategoryEdit}>修改分类</button></div>
                        )
                    }
                    {
                        !readOnly && isNew && (
                            <div className='category-box'>
                                {
                                    categoryList.map((category, i)=>(
                                        <select onChange={(e)=>this.props.handleChangeCategory(i ,e)} value={categorySelected[i]} key={i} readOnly={readOnly}>
                                            <option value=''>请选择{ i + 1 }级分类</option>
                                            {
                                                category.map(item=>(
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                <div className='g12 p0 pb20'>
                    <label className='left'>商品价格</label>
                    <div className='g8 p0 unit'>
                        <input value={price} type='number' onChange={(e)=>{this.props.handleInputChange('price', e)}} readOnly={readOnly}/>
                        <span className='ml10'>元</span>
                    </div>
                </div>
                <div className='g12 p0 pb20'>
                    <label className='left'>商品库存</label>
                    <div className='g8 p0 unit'>
                        <input value={stock} type='number' onChange={(e)=>{this.props.handleInputChange('stock', e)}} readOnly={readOnly}/>
                        <span className='ml10'>件</span>
                    </div>
                </div>

                <div className="g12 p0 pb20 sub-images">
                    <label className='left'>商品图片</label>
                    <div>
                    {
                        subImages.map((img, i)=>(
                            <div key={img.url} className='upload-img-item'>
                                <img src={img.url}/>
                                <i className={ `close ${readOnly ? 'hide': ''}` } onClick={ () => {this.props.handleImageDelete(i)} }>x</i>
                            </div>
                        ))
                    }
                    {
                        !readOnly&&(
                            <FileUploader onSuccess={(res) => this.props.onUploadSuccess(res)}
                                          onError={(errMsg) => this.props.onUploadError(errMsg)}/>
                        )
                    }
                    </div>
                </div>
                <div className='g12 p0 pb20'>
                    <label className='mb10 left'>商品详情</label>
                    {
                        readOnly && (
                            <div className='detail-raw g8 p0' dangerouslySetInnerHTML={{__html: detail}}/>
                        )
                    }
                    {
                        !readOnly && (
                            <div className='g8 p0'>
                                <textarea ref = {(el)=>{this.editorRef = el}} onChange={()=>{}}/>
                            </div>
                        )
                    }

                </div>
                {
                    !readOnly && (
                        <div className='g12 p0 pb20 txt-r'>
                            <a className='btn' onClick={this.props.handleSave}>提交</a>
                        </div>
                    )
                }
            </div>
        )
    }
}
