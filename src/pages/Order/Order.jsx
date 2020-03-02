import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Loading from '../../components/Loading/Loading.jsx'
import Modal from '../../components/Modal/Index'
import Table from '../../components/Table/Index'
import { setErrorMsg, clearErrorMsg } from '../../actions/loading_error'
import { listOrders, searchOrders, inputChange, clearOrder } from '../../actions/order'
import 'rc-pagination/assets/index.css';
import './Order.scss';


@connect( state => ({
    order: state.order,
    loadingError: state.loadingError
}), dispatch => ({
    setErrorMsgFunc(msg){
        dispatch(setErrorMsg(msg))
    },
    clearErrorMsgFunc(){
        dispatch(clearErrorMsg())
    },
    searchOrdersFunc(params){
        dispatch(searchOrders(params))
    },
    listOrdersFunc(params){
        dispatch(listOrders(params))
    },
    inputChangeFunc(type, value){
        dispatch(inputChange(type, value))
    },
    clearOrderFunc(){
        dispatch(clearOrder())
    }
}))
export default class Order extends Component {
    static propTypes = {
        setErrorMsgFunc: PropTypes.func,
        clearErrorMsgFunc: PropTypes.func,
        searchOrdersFunc: PropTypes.func,
        listOrdersFunc: PropTypes.func,
        inputChangeFunc: PropTypes.func,
        clearOrderFunc: PropTypes.func,
        order:PropTypes.object,
        loadingError: PropTypes.object
    }

    constructor(props){
        super(props)
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handelPageChange = this.handelPageChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount(){
        const { pageNum, pageSize } = this.props.order;
        this.props.listOrdersFunc({ pageSize, pageNum });
    }

    componentWillUnmount(){
        this.props.clearOrderFunc();
    }

    handelPageChange(current, pageSize){
        this.props.listOrdersFunc({ pageSize, pageNum: current });
    }

    handleInputChange(type, event){
        const value = event.target.value;
        this.props.inputChangeFunc(type, value);
    }

    handleSearch(){
        const { searchBy, searchValue } = this.props.order;
        if(!searchBy || !searchValue){
            this.props.setErrorMsgFunc('查询参数不能为空')
            return
        }
        this.props.searchOrdersFunc({ [searchBy]: searchValue })
    }

    handleKeyDown(e){
        if(e.keyCode === 13){
            this.handleSearch();
        }
    }
    render() {
        const { list, total, pageNum, pageSize, searchBy, searchValue} = this.props.order;
        const { isLoading, errorMsg } = this.props.loadingError;

        return (
            <div>
                <h1>订单管理</h1>
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
                <div className='mb20'>
                    <div className='g3 pl0 pt0 pr10'>
                        <select value={searchBy} onChange={(event) => this.handleInputChange('searchBy', event)} className='mr10'>
                            <option value="orderNo">按订单号查询</option>
                        </select>
                    </div>
                    <div className='g3 pl0 pt0 pr10'>
                        <input value={searchValue}
                               onKeyDown={this.handleKeyDown}
                               onChange={(event) => this.handleInputChange('searchValue', event)}
                               className='mr10 v-middle'/>
                    </div>
                    <button type="button" onClick={this.handleSearch} className='btn'>查询</button>
                </div>
                <Table tableHeaders={['订单号','收件人','订单状态','订单总价','创建时间', '操作']}>
                    {list.map(item => (
                        <tr key={item.orderNo}>
                            <td>
                                <Link to ={`/orders/${item.orderNo}`}> {item.orderNo}</Link>
                            </td>
                            <td>{item.receiverName}</td>
                            <td>{item.statusDesc}</td>
                            <td>{item.payment}</td>
                            <td>{item.createTime}</td>
                            <td><Link to ={`/orders/${item.orderNo}`}>详情</Link></td>
                        </tr>
                    ))}
                </Table>
                <Pagination
                    className="mt20"
                    showSizeChanger
                    showQuickJumper={{ goButton: <button>确定</button> }}
                    pageSize={pageSize}
                    current={pageNum}
                    onChange={this.handelPageChange}
                    total={total}/>
            </div>
        )

    }
}



