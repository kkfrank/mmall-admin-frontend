import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Table from '../../components/Table/Index'
import Loading from '../../components/Loading/Loading.jsx'
import Modal from '../../components/Modal/Index'

import { getDetail, clearDetail } from '../../actions/order_detail'
import { setErrorMsg, clearErrorMsg } from '../../actions/loading_error'
import './Detail.scss'


@connect((state)=>({
    order: state.orderDetail,
    loadingError: state.loadingError
}),(dispatch)=>({
    setErrorMsgFunc(msg){
        dispatch(setErrorMsg(msg))
    },
    clearErrorMsgFunc(){
        dispatch(clearErrorMsg())
    },
    getDetailFunc(params){
        dispatch(getDetail(params))
    },
    clearDetailFunc(){
        dispatch(clearDetail())
    }
}))
export default class OrderDetail extends Component{
    static propTypes = {
        setErrorMsgFunc: PropTypes.func,
        clearErrorMsgFunc: PropTypes.func,
        getDetailFunc: PropTypes.func,
        clearDetailFunc: PropTypes.func,
        order: PropTypes.object,
        loadingError: PropTypes.object
    }

    constructor(props){
        super(props)
    }

    componentDidMount(){
        const orderNo = this.props.match.params.id;
        this.props.getDetailFunc({orderNo})
    }

    componentWillUnmount(){
        this.props.clearDetailFunc()
    }

    render(){
        const { order } = this.props.order
        const { isLoading, errorMsg } = this.props.loadingError;
        return(
            <div>
                <h1>订单详情</h1>
                {
                    errorMsg && (
                        <Modal
                            onOk={()=> this.props.clearErrorMsgFunc()}
                            onCancel={()=> this.props.clearErrorMsgFunc()}
                            title='对话框'
                            visible={ !!errorMsg }>
                            <p>{errorMsg}</p>
                        </Modal>
                    )
                }
                {
                    isLoading && <Loading/>
                }
                <div className='g12 p0 pb20'>
                    <label className='left'>订单号:</label>
                    <div className='g8 p0'>
                        <input defaultValue={order.orderNo} key={order.orderNo} readOnly={true}/>
                    </div>
                </div>

                <div className='g12 p0 pb20'>
                    <label className='left'>创建时间:</label>
                    <div className='g8 p0'>
                        <input defaultValue={order.createTime} readOnly key={order.createTime}/>
                    </div>
                </div>
                <div className='g12 p0 pb20'>
                    <label className='left'>收件人:</label>
                    <div className='g8 p0'>
                        <input defaultValue={order.receiverName} readOnly key={order.receiverName}/>
                    </div>
                </div>
                <div className='g12 p0 pb20'>
                    <label className='left'>订单状态:</label>
                    <div className='g8 p0'>
                        <input defaultValue={order.statusDesc} readOnly key={order.statusDesc}/>
                    </div>
                </div>
                <div className='g12 p0 pb20'>
                    <label className='left'>支付方式:</label>
                    <div className='g8 p0'>
                        <input defaultValue={order.paymentTypeDesc} readOnly key={order.paymentTypeDesc}/>
                    </div>
                </div>
                <div className='g12 p0 pb20'>
                    <label className='left'>支付金额:</label>
                    <div className='g8 p0'>
                        <input defaultValue={'￥'+order.payment} readOnly key={order.payment}/>
                    </div>
                </div>
                <Table tableHeaders={['商品图片','商品信息','单价','数量','合计']}>
                    {
                        order.orderItemVoList && order.orderItemVoList.map(item=>(
                            <tr key={item.productId}>
                                <td><img src={order.imageHost + item.productImage}/></td>
                                <td>{item.productName}</td>
                                <td>{item.currentUnitPrice}</td>
                                <td>{item.quantity}</td>
                                <td>{item.totalPrice}</td>
                            </tr>
                        ))
                    }
                </Table>
            </div>
        )
    }
}