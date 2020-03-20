import React from 'react';
import FullPage from '../components/FullPage';
 
export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.blockDom1 = React.createRef()
        this.blockDom2 = React.createRef()
        this.blockDom3 = React.createRef()
        this.blockDom4 = React.createRef()
    }
    componentDidMount() {
        
    }


    render() {

        const styleObj = {
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            fontSize: 50,
            color: 'skyblue',
            width: '100%',
            height: '100%',
            backgroundColor: "blue"
        }

        const full1Style = {
            backgroundColor: "red",
            height: "auto",
            width: "auto"
        }

        const full2Style = {
            backgroundColor: "blue",
            height: "auto",
            width: "auto"
        }

        const fullObject = {
            width: '100%',
            height: '100%'
        }

        return (
            <FullPage style={fullObject} verticalCentered={true} verticalLoop={true}  >
                <div ref={this.blockDom1} style={{backgroundColor:"red"}}>第一屏</div>
                <div ref={this.blockDom2} style={{backgroundColor:"blue"}}>第二屏</div>
                <div ref={this.blockDom3} style={{backgroundColor:"skyblue"}}>第三屏</div>
                <div ref={this.blockDom4} style={{backgroundColor:"yellow"}}>第四屏</div>
            </FullPage>
        )
    }
}