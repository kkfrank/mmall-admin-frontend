import React, { Component } from 'react';
import './Index.scss';

export default class NotFound extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <h1 className='not-found'>404</h1>
        )
    }
}
