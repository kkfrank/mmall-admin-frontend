import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'
import asyncComponent from '../components/asyncComponent.jsx'
import Layout from '../components/Layout/Index'

const Statistic = asyncComponent(() => import('../pages/Statistic/Statistic'))
const Login = asyncComponent(() => import('../pages/Login/Login'))
const User = asyncComponent(() => import('../pages/User/User'))
const Product = asyncComponent(() => import('../pages/Product/Product'))
const ProductDetail = asyncComponent(() => import('../pages/Product/Detail'))
const Order = asyncComponent(() => import('../pages/Order/Order'))
const OrderDetail = asyncComponent(() => import('../pages/Order/Detail'))
const Category = asyncComponent(() => import('../pages/Category/Category'))
const NotFound = asyncComponent(() => import('../pages/NotFound/'))

export default class RouteConfig extends Component {
    render() {
        let MainLayout =(
            <Layout>
                <Switch>
                    <Route exact path="/" component={Statistic}/>
                    <Route path="/users" component={User}/>
                    <Route exact path="/products" component={Product}/>
                    <Route exact path='/products/new' component={ProductDetail}/>
                    <Route exact path='/products/:id/edit' component={ProductDetail}/>
                    <Route exact path='/products/:id' component={ProductDetail}/>
                    <Route exact path="/orders" component={Order}/>
                    <Route exact path="/orders/:id" component={OrderDetail}/>
                    <Route exact path="/categories" component={Category}/>
                    <Route component={NotFound}/>
                </Switch>
            </Layout>
        );

        return (
                <HashRouter>
                    {/*<Switch>*/}
                        {/*<Route path="/login" component={Login}/>*/}
                        {/*<Route path="/" render={() => (*/}
                            {/*!user ? (*/}
                                {/*<Redirect to={{pathname: '/login', state: {from: this.props.location}}} />*/}
                            {/*) : (*/}
                                {/*MainLayout*/}
                            {/*)*/}
                        {/*)}/>*/}
                    {/*</Switch>*/}
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/" render={() => MainLayout}/>
                    </Switch>
                </HashRouter>
            );
    }
}
