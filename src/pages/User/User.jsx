import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import { connect } from 'react-redux'
import { searchUsers, clearUser } from '../../actions/user'
import { clearErrorMsg } from '../../actions/loading_error'
import 'rc-pagination/assets/index.css';
import Loading from '../../components/Loading/Loading.jsx'
import Table from '../../components/Table/Index'
import Modal from '../../components/Modal/Index'
import './User.scss';

@connect(state=>({
    user: state.user,
    loadingError: state.loadingError
}), dispatch=>({
    searchUsersFunc(pageSize, pageNum){
        dispatch(searchUsers(pageSize, pageNum))
    },
    clearErrorMsgFunc(){
        dispatch(clearErrorMsg())
    },
    clearUserFunc(){
        dispatch(clearUser())
    }
}))
export default class User extends Component {
    static propTypes = {
        searchUsersFunc: PropTypes.func,
        clearUserFunc: PropTypes.func,
        user:PropTypes.object,
        loadingError: PropTypes.object
    }

    constructor(props){
        super(props)
        this.handelPageChange = this.handelPageChange.bind(this);
        this.state={
            showErrorModal: false
        }
    }

    componentDidMount(){
        const { pageNum, pageSize } = this.props.user;
        this.props.searchUsersFunc(pageSize, pageNum);
    }

    componentWillUnmount(){
        this.props.clearUserFunc()
    }

    handelPageChange(current, pageSize){
        this.props.searchUsersFunc(pageSize, current);
    }

    render() {
        const { userList, total, pageNum, pageSize } = this.props.user;
        const { isLoading, errorMsg } = this.props.loadingError;

        return (
            <div>
                <h1>用户列表</h1>
                {
                    errorMsg && (
                        <Modal
                            onOk={() => this.props.clearErrorMsgFunc()}
                            onCancel={() => this.props.clearErrorMsgFunc()}
                            title='对话框'
                            visible={ !!errorMsg }>
                            <p>{ errorMsg }</p>
                        </Modal>
                    )
                }

                {
                    isLoading && <Loading/>
                }
                <Table tableHeaders={['ID','用户名','邮箱','电话','注册时间']}>
                    {userList.map(user=>(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.createTime}</td>
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
