import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Loading from '../../components/Loading/Loading.jsx'
import Modal from '../../components/Modal/Index'
import { getStatistic, clearStatistic } from '../../actions/statistic'
import { clearErrorMsg } from '../../actions/loading_error'
import './Statistic.scss'

@connect((state)=>({
    statistic: state.statistic,
    loadingError: state.loadingError
}), (dispatch)=>({
    getStatisticFunc(){
        dispatch(getStatistic())
    },
    clearStatisticFunc(){
        dispatch(clearStatistic())
    },
    clearErrorMsgFunc(){
        dispatch(clearErrorMsg())
    }
}))
export default class Statistic extends Component{
    static propTypes = {
        getStatisticFunc: PropTypes.func,
        clearStatisticFunc: PropTypes.func,
        clearErrorMsgFunc: PropTypes.func,
        statistic: PropTypes.object,
        loadingError: PropTypes.object
    }

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getStatisticFunc();
    }

    componentWillMount(){
        this.props.clearStatisticFunc()
    }

    render(){
        const { userCount, productCount, orderCount } = this.props.statistic
        const { isLoading, errorMsg } = this.props.loadingError;

        return(
            <div>
                {
                    errorMsg && (
                        <Modal
                            onOk={()=>this.props.clearErrorMsgFunc()}
                            onCancel={()=>this.props.clearErrorMsgFunc()}
                            title='对话框'
                            visible={ !!errorMsg }>
                            <p>{ errorMsg }</p>
                        </Modal>
                    )
                }
                {
                    isLoading && <Loading/>
                }
                <h1 className="mb20">数据统计</h1>
                <div className="count-panel">
                    <div className="g4 p15">
                        <Link to="/users" className="user-panel">
                            <div className='count'>{userCount}</div>
                            <div className='desc'>
                                <i className='fa fa-user-o'/>
                                <span>用户总数</span>
                            </div>
                        </Link>
                    </div>
                    <div className="g4 p15">
                        <Link to="/products" className="product-panel">
                            <div className='count'>{productCount}</div>
                            <div className='desc'>
                                <i className='fa fa-list'/>
                                <span>商品总数</span>
                            </div>
                        </Link>
                    </div>
                    <div className="g4 p15">
                        <Link to="/orders" className="order-panel">
                            <div className='count'>{orderCount}</div>
                            <div className='desc'>
                                <i className='fa fa-check-square-o'/>
                                <span>订单总数</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}