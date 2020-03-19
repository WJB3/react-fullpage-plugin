import React  from 'react';
import FullPage from '../components/FullPage';
import imgURL from '@/assets/icon.jpg';
export default class Test extends React.Component{
    constructor(props){
        super(props);
        this.blockDom1=React.createRef()
        this.blockDom2=React.createRef()
    }
    
    render(){

        const styleObj={
            display:'flex',
            justifyContent:"center",
            alignItems:"center",
            fontSize:50,
            color:'skyblue',
            width:'100%',
            height:'100%',
            backgroundColor:"blue"
        }

        const full1Style={
            backgroundColor:"red",
            height:"auto",
            width:"auto"
        }

        const full2Style={
            backgroundColor:"blue",
            height:"auto",
            width:"auto"
        }

        const fullObject={
            width:'100%',
            height:'100%'
        }
    
        return(
            <FullPage style={fullObject}>
                <img src={imgURL}  ref={this.blockDom1} />
                <img src={imgURL} ref={this.blockDom2} />
            </FullPage>
        )
    }
}