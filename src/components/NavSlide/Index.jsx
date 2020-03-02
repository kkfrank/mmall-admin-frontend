import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './Index.scss'

export default class NavSlide extends Component{
    static propTypes = {
        clickShowLeftMenu: PropTypes.bool
    }
    constructor(props){
        super(props)
        // this.state = {
        //     clickShowLeftMenu: true
        // }
    }

    render(){
        return(
            <div className={`nav-slide ${this.props.clickShowLeftMenu ? '': 'open'}`}>
                <a className="mobile-menu-opener"
                   onClick={this.props.toggleClickState}
                   >
                    <i className="fa fa-bars"/>
                </a>
                <ul>
                    <li className="sub-menu">
                        <div className="sub-menu-title no-items">
                            <NavLink to="/"  activeClassName="active" exact>
                                <i className='fa fa-bar-chart-o'/>
                                <span>首页</span>
                            </NavLink>
                        </div>
                    </li>
                    <li className="sub-menu">
                        <div className="sub-menu-title">
                            <i className='fa fa-list'/>
                            <span>商品</span>
                        </div>
                        <ul className="sub-menu-items">
                            <li><NavLink to="/products" activeClassName="active">商品管理</NavLink></li>
                            <li><NavLink to="/categories" activeClassName="active">分类管理</NavLink></li>
                        </ul>
                    </li>
                    <li className="sub-menu">
                        <div className="sub-menu-title">
                            <i className='fa fa-check-square-o'/>
                            <span>订单</span>
                        </div>
                        <ul className="sub-menu-items">
                            <li><NavLink to="/orders" activeClassName="active">订单管理</NavLink></li>
                        </ul>
                    </li>
                    <li className="sub-menu">
                        <div className="sub-menu-title">
                            <i className='fa fa-user-o'/>
                            <span>用户</span>
                        </div>
                        <ul className="sub-menu-items">
                            <li><NavLink to="/users" activeClassName="active">用户管理</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}