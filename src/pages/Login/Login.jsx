import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading/Loading.jsx'
import Modal from '../../components/Modal/Index'
import { doLogin } from '../../actions/login'
import { clearErrorMsg, hideLoading } from '../../actions/loading_error'
import './Login.scss';

@connect(state=>({
    login: state.login,
    loadingError: state.loadingError
}),dispatch=>({
    doLoginFunc(username, password){
        dispatch(doLogin(username, password))
    },
    clearErrorMsgFunc(){
        dispatch(clearErrorMsg())
    },
    hideLoadingFunc(){
        dispatch(hideLoading())
    }
}))
export default class Login extends Component {
    static propTypes = {
        login: PropTypes.object,
        loadingError: PropTypes.object,
        doLoginFunc: PropTypes.func,
        hideLoadingFunc: PropTypes.func
    }

    constructor(props){
        super(props)
        //没有props?
        this.handleLogin = this.handleLogin.bind(this)
        this.handelChange = this.handelChange.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.state={
            usernameField:{
                value: 'admin',
                error: ''
            },
            passwordField:{
                value: 'admin',
                error: ''
            }
        }
    }

    componentDidMount(){
        // const {user} = this.props.login;
        this.props.hideLoadingFunc()
        const user = JSON.parse(window.localStorage.getItem('current_user'));
        if(user){
            this.props.history.push('/');
        }
    }

    handleLogin(){
        const isValid = this.validateAndSet('usernameField', this.state.usernameField.value) &&
            this.validateAndSet('passwordField', this.state.passwordField.value)
        if(!isValid){
            return;
        }
        const { usernameField, passwordField } = this.state;
        this.props.doLoginFunc(usernameField.value, passwordField.value);
    }

    handleKeyDown(e){
        if(e.keyCode === 13){
            this.handleLogin()
        }
    }

    validateAndSet(key, value){
        let msg = '';
        if(!value){
            msg = '不能为空'
        }else{
            if(key === 'usernameField'){
                if(value.length < 3 || value.length > 60){
                    msg = "用户名长度为3-60"
                }
            }else if(key === 'passwordField'){
                if(value.length < 5 || value.length > 60){
                    msg = "密码长度为5-60"
                }
            }
        }
        this.setState({
            [key]:{
                value:value,
                error: msg
            }
        })
        return !msg
    }

    handelChange(key, event){
        const value = event.target.value;
        this.validateAndSet(key, value);
    }
    // componentWillReceiveProps(nextProps){
    //     const {user} = nextProps.login;
    //     if(user){
    //         this.props.history.push('/');
    //     }
    // }
    render() {
        const { isLoading, errorMsg } = this.props.loadingError;
        const {usernameField, passwordField} = this.state;
        const username = usernameField.value;
        const password = passwordField.value;
        const usernameError = usernameField.error;
        const passwordError = passwordField.error;

        return (
          <div className="container">
              <div className='notice'>注意：线上存在缺陷，因为使用的跨域代理网站并不支持cookie，所以即使登录成功也不会保存cookie，导致下次call api的时候还是认为没有登录。欲查看完整效果，可下载到本地，自行配置反向代理。</div>
              <h1>后台管理系统</h1>
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
                  isLoading && <Loading isFull = {true}/>
              }
              <div className="form-item">
                  <input type="text" value={username}
                         onChange={(e)=>this.handelChange('usernameField', e)}
                         onKeyDown={this.handleKeyDown}
                         placeholder="用户名"
                         className={usernameError ? 'error' :''}/>
                  {
                      usernameError && <div className="form-error">{usernameError}</div>
                  }
              </div>
              <div className="form-item">
                  <input type="password" value={password}
                         onChange={(e)=>this.handelChange('passwordField', e)}
                         onKeyDown={this.handleKeyDown}
                         placeholder="密码"
                         className={passwordError ? 'error' : ''}/>
                  {
                      passwordError && <div className="form-error">{passwordError}</div>
                  }
              </div>
              <div className="form-item mt20">
                  <button type="submit" onClick={this.handleLogin} className="btn">登录</button>
              </div>
          </div>
        );
    }
}
