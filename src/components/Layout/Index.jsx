import React, {Component} from 'react'
import NavTop from '../NavTop/'
import NavSlide from '../NavSlide/'
import './Index.scss'

export default class Layout extends Component{
    constructor(props){
        super(props)
        this.state = {
            clickShowLeftMenu: true
        }
        this.toggleClickState = this.toggleClickState.bind(this)
    }

    componentDidMount(){
        this.mainContainerRef.addEventListener('click',()=>{
            if(!this.state.clickShowLeftMenu){
                this.setState({
                    clickShowLeftMenu: true
                })
            }
        })
    }

    toggleClickState(){
        this.setState({
            clickShowLeftMenu: !this.state.clickShowLeftMenu
        })
    }

    render(){
        return(
            <div>
                <NavTop user={this.props.user}/>
                <NavSlide clickShowLeftMenu = {this.state.clickShowLeftMenu} toggleClickState={this.toggleClickState}/>
                <div className="main-container" ref={(el)=>{this.mainContainerRef = el}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}