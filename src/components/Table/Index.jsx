import React, { Component } from 'react'
import './Index.scss'

export default class Table extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let Header = this.props.tableHeaders.map((item, index)=> {
            if (typeof item === 'object') {
                return <th key={index} width={item.width} className={item.class}>{item.name}</th>
            } else if (typeof item === 'string') {
                return <th key={index}>{item}</th>
            }
        })

        let tableBody = this.props.children;
        // if(this.props.isLoading){
        //     tableBody = (
        //         <tr>
        //             <td colSpan={this.props.tableHeaders.length}>正在加载数据...</td>
        //         </tr>
        //     )
        // }
        if(!this.props.isLoading && (!tableBody || tableBody.length === 0)){
            tableBody = (
                <tr>
                    <td colSpan={this.props.tableHeaders.length}>没有找到相应的结果</td>
                </tr>
            )
        }
        return(
            <div>
                <table>
                    <thead>
                        <tr>{Header}</tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
            </div>
        )
    }
}