import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading/Loading.jsx'
import Modal from '../../components/Modal/Index'
import Table from '../../components/Table/Index'
import { setCategoryName, showSetNameModal, hideSetNameModal, showAddCategoryModal,
    hideAddCategoryModal, addCategory, categoryForward, categoryGoback, clearCategory,
    changeTempCategoryName
} from '../../actions/category'
import { clearErrorMsg } from '../../actions/loading_error'
import './Category.scss'

@connect(({category, loadingError})=>({
    category,
    loadingError
}), dispatch =>({
    categoryForwardFunc(id, parentId){
        dispatch(categoryForward(id, parentId))
    },
    categoryGobackFunc(){
        dispatch(categoryGoback())
    },
    showSetNameModalFunc(id, name){
        dispatch(showSetNameModal(id, name))
    },
    hideSetNameModalFunc(){
        dispatch(hideSetNameModal())
    },
    setCategoryNameFunc(){
        dispatch(setCategoryName())
    },
    showAddCategoryModalFunc(){
        dispatch(showAddCategoryModal())
    },
    hideAddCategoryModalFunc(){
        dispatch(hideAddCategoryModal())
    },
    addCategoryFunc(){
        dispatch(addCategory())
    },
    changeTempCategoryNameFunc(name){
        dispatch(changeTempCategoryName(name))
    },
    clearErrorMsgFunc(){
        dispatch(clearErrorMsg())
    },
    clearCategoryFunc(){
        dispatch(clearCategory())
    }
}))
export default class Category extends Component{
    static propTypes = {
        category: PropTypes.object,
        loadingError: PropTypes.object,

        categoryForwardFunc: PropTypes.func,
        categoryGobackFunc: PropTypes.func,

        showSetNameModalFunc: PropTypes.func,
        hideSetNameModalFunc: PropTypes.func,
        setCategoryNameFunc: PropTypes.func,

        showAddCategoryModalFunc: PropTypes.func,
        hideAddCategoryModalFunc: PropTypes.func,
        addCategoryFunc: PropTypes.func,

        changeTempCategoryNameFunc:PropTypes.func,
        clearErrorMsgFunc: PropTypes.func,
        clearCategoryFunc: PropTypes.func
    }

    constructor(props){
        super(props)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentDidMount(){
        this.props.categoryForwardFunc(0, null);
    }

    componentWillUnmount(){
        this.props.clearCategoryFunc()
    }

    handleKeyDown(type, e){
        if(e.keyCode === 13){
            if(type === 'CHANGE_NAME'){
                this.props.setCategoryNameFunc()
            }else if(type === 'ADD_CATEGORY'){
                this.props.addCategoryFunc()
            }
        }
    }

    render() {
        const { parentIds, currentCategoryId, list, isShowSetNameModal, isSetNameLoading, isAddLoading, isShowAddModal, tempCategoryName, setNameCategoryId } = this.props.category
        const { isLoading, errorMsg } = this.props.loadingError;

        return (
            <div>
                <h1>分类管理</h1>
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

                <Modal visible={isShowSetNameModal}
                       confirmLoading={isSetNameLoading}
                       onOk={this.props.setCategoryNameFunc}
                       onCancel={this.props.hideSetNameModalFunc}>
                    <div>
                        <label className='mr10'>请输入新的分类名称:</label>
                        <input value={tempCategoryName}
                               onChange={(e) => this.props.changeTempCategoryNameFunc(e.target.value)}
                               onKeyDown={(event)=>this.handleKeyDown('CHANGE_NAME', event)}/>
                    </div>
                </Modal>

                <Modal visible={isShowAddModal}
                       title='添加分类'
                       confirmLoading={isAddLoading}
                       onOk={this.props.addCategoryFunc}
                       onCancel={this.props.hideAddCategoryModalFunc}>
                    <div>
                        <div>
                            <label className='mr10'>分类名称:</label>
                            <input value={tempCategoryName}
                                   onChange={(e)=>this.props.changeTempCategoryNameFunc(e.target.value)}
                                   onKeyDown={(event)=> this.handleKeyDown('ADD_CATEGORY', event)}/>
                        </div>
                    </div>
                </Modal>

                <div className='mb20'>
                    <span>当前商品分类ID：{currentCategoryId}</span>
                    { parentIds.length > 0 && (
                        <a className='ml10' onClick={()=>this.props.categoryGobackFunc()}>返回上一分类</a>
                    )}
                    <a className="btn right" onClick={this.props.showAddCategoryModalFunc}>添加分类</a>
                </div>
                <Table tableHeaders={[{
                                        name: '分类ID',
                                        width:'20%'

                                    },{
                                        name: '分类名称',
                                        width:'40%'
                                    },{
                                        name: '操作',
                                        width:'40%'
                                    }]}>
                    {
                        list.map(item=>(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <a className='mr10' onClick={() => this.props.showSetNameModalFunc(item.id, item.name)}>修改名称</a>
                                    <a onClick={()=>{this.props.categoryForwardFunc(item.id, currentCategoryId)}}>查看子分类</a>
                                </td>
                            </tr>
                        ))
                    }
                </Table>
            </div>
        )
    }
}