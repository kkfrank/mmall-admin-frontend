import React, { Component } from 'react';
import Pagination from 'rc-pagination';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Table from '../../components/Table/Index'
import Modal from '../../components/Modal/Index'
import Loading from '../../components/Loading/Loading'
import { searchProducts, updateSaleStatus, searchInputChange, clearProduct } from '../../actions/product'
import { clearErrorMsg } from '../../actions/loading_error'
import 'rc-pagination/assets/index.css';
import './Product.scss';


@connect((state)=>({
    product: state.product,
    loadingError: state.loadingError
}), (dispatch)=>({
    clearErrorMsgFunc(){
        dispatch(clearErrorMsg())
    },
    handleInputChangeFunc(type, value){
        dispatch(searchInputChange(type, value))
    },
    searchFunc(params){
        dispatch(searchProducts(params))
    },
    updateSaleStatusFunc(productId, status){
        dispatch(updateSaleStatus(productId, status))
    },
    clearProductFunc(){
        dispatch(clearProduct())
    }
}))
export default class Product extends Component {
    static propTypes = {
        product: PropTypes.object,
        loadingError: PropTypes.object,
        clearErrorMsgFunc: PropTypes.func,
        handleInputChangeFunc: PropTypes.func,
        searchFunc: PropTypes.func,
        updateSaleStatusFunc: PropTypes.func,
        clearProductFunc: PropTypes.func
    }

    constructor(props){
        super(props)
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSearchFunc = this.handleSearchFunc.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentDidMount(){
        this.handleSearchFunc()
    }

    componentWillMount(){
        this.props.clearProductFunc()
    }

    handlePageChange(current, pageSize){
        this.handleSearchFunc({
            pageSize,
            pageNum: current
        })
    }

    handleSearchFunc(defaultParams){
        const { pageNum, pageSize, searchType, searchValue } = this.props.product;
        let params = defaultParams || { pageSize, pageNum }

        if(searchValue){
            if(searchType === 'id'){
                params['productId'] = searchValue
            }else if(searchType === 'name'){
                params['productName'] = searchValue
            }
        }
        this.props.searchFunc(params);
    }

    handleInputChange(type, e){
        const value = e.target.value
        this.props.handleInputChangeFunc(type, value)
    }

    handleKeyDown(e){
        if(e.keyCode === 13){
            this.handleSearchFunc();
        }
    }

    updateProductSaleStatus(productId, status){
        this.props.updateSaleStatusFunc(productId, status)
    }

    render() {
        const { isLoading, errorMsg } = this.props.loadingError;
        const { productList, total, pageNum, pageSize, searchType, searchValue } = this.props.product;

        return (
            <div>
                <h1>商品管理</h1>
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
                <div className="right hide">
                    <Link to="/products/new" className="btn">添加商品</Link>
                </div>
                <div className="mb20">
                    <div className='g4 pl0 pt0 pr10'>
                        <select value={ searchType } onChange={(event)=>this.handleInputChange('searchType', event)}>
                            <option value="id">按商品ID查询</option>
                            <option value="name">按商品名称查询</option>
                        </select>
                    </div>
                    <div className='g4 pl0 pt0 pr10'>
                        <input placeholder="关键词"
                               value={ searchValue }
                               onKeyDown={ this.handleKeyDown }
                               onChange={ (event)=>this.handleInputChange('searchValue', event) }
                               className=""/>
                    </div>
                    <button onClick={()=>this.handleSearchFunc({ pageSize, pageNum: 1})} className="btn">查询</button>
                    <Link to="/products/new" className="btn mr10 right">添加商品</Link>
                </div>
                <Table tableHeaders={[{
                                name: 'ID',
                                width:'15%'
                            },{
                                name: '信息',
                                width:'30%'
                            },{
                                name: '价格',
                                width:'15%'
                            },{
                                name: '状态',
                                width: '20'
                            },{
                                name: '操作',
                                width:'20%'
                            }]}>
                    {productList.map(item=>(
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <h4>{item.name}</h4>
                                <div>{item.subtitle}</div>
                            </td>
                            <td>￥{item.price}</td>
                            <td>{
                                    item.status === 1 && (
                                        <div className="status-box">
                                            <span className='mb5'>在售</span>
                                            <a onClick={()=>this.updateProductSaleStatus(item.id, 2)} className="btn s bg-yellow">下架</a>
                                        </div>
                                )}

                                {
                                    item.status === 2 && (
                                        <div className="status-box">
                                            <span className='mb5'>已下架</span>
                                            <a onClick={()=> this.updateProductSaleStatus(item.id, 1)} className="btn s">上架</a>
                                        </div>
                                )}
                            </td>
                            <td>
                                <div>
                                    <Link to={`/products/${item.id}`} className="mr5">详情</Link>
                                    <Link to={`/products/${item.id}/edit`} className="mr5">编辑</Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </Table>
                <Pagination
                    className="mt20"
                    showSizeChanger
                    showQuickJumper={{ goButton: <button>确定</button> }}
                    pageSize={pageSize}
                    current={pageNum}
                    onChange={this.handlePageChange}
                    total={total}/>
            </div>
        )
    }
}
