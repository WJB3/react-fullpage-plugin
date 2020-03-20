import React,{Component} from 'react';
import classNames from '../utils/classNames';
class FullPage extends Component{

    constructor(props){
        super(props);
        this.state={
            fullPage:{
                //当前处于第几页
                current:1,
                isScrolling:false,
                //返回鼠标滚轮的垂直滚动量
                deltaY:0
            },
            //显示滚动盒子
            isShow:false,
            //是否允许滚动
            isAllowScroll:true
        }
        this.fullPageRef=React.createRef();
        this.scrollPageRef=React.createRef();
    }

    static defaultProps={
        direction:"vertical",//垂直方向
        verticalCentered:false,//垂直时内容是否垂直居中
        verticalLoop:false,//垂直时是否循环
    }

    componentDidMount(){
        this.initFullPage();
        //窗口resize变化时重新设计大小
        window.addEventListener("resize",this.resizeEventHandler);
    }

    componentWillUnmount(){
        window.removeEventListener("resize",this.resizeEventHandler, false);
    }

    handleMouseWheel=(event)=>{
        const {isAllowScroll,fullPage}=this.state;
        //添加冒泡阻止
        let evt=event||window.event;
        if(evt.stopPropagation){
            evt.stopPropagation();
        }else{
            evt.returnValue=false;
        }
        if(!isAllowScroll){//是否可以滚动
            return
        }
        if (fullPage.isScrolling) {// 加锁部分
            return false;
        }
        let e = event.originalEvent || event;
        this.setState({
            fullPage:{
                ...this.state.fullPage,
                deltaY:e.deltaY|| e.detail//Firefox使用detail
            }
        },()=>{
            if(this.state.fullPage.deltaY>0){
                this.next()
            }else if(this.state.fullPage.deltaY<0){
                this.prev()
            }
        })
    }

    next=()=>{
 
        let len=this.props.children.length;
     
        if((this.state.fullPage.current+1)<=len){
            this.setState({
                fullPage:{
                    ...this.state.fullPage,
                    current:this.state.fullPage.current+1
                }
            },()=>{
                this.move(this.state.fullPage.current);
            })
        }
        if(this.props.verticalLoop){
            if((this.state.fullPage.current+1)>len){
                this.scrollPageRef.current.style.transitionDuration="0s";
                this.move(0); 
                setTimeout(() => {  
                    this.scrollPageRef.current.style.transitionDuration ="700ms";
                    this.move(1); 
                    this.setState({
                        fullPage:{
                            ...this.state.fullPage,
                            current:1
                        }
                    })
                }, 0);
            }
        }
        
    }

    prev=()=>{
        if(this.state.fullPage.current -1 > 0) {
            this.setState({
                fullPage:{
                    ...this.state.fullPage,
                    current:this.state.fullPage.current-1
                }
            },()=>{
                this.move(this.state.fullPage.current);
            })    
        }
    }

    move=(index)=>{
        // 为了防止滚动多次滚动，需要通过一个变量来控制是否滚动
        this.setState({
            fullPage:{
                ...this.state.fullPage,
                isScrolling:true
            }
        },()=>{
            this.directToMove(index)
            if(this.props.onLeaveSlide){
                this.props.onLeaveSlide({currentIndex:this.state.fullPage.current})
            }
            //这里的动画是1s执行完，使用setTimeout延迟1s后解锁
            setTimeout(()=>{
                this.setState({
                    fullPage:{
                        ...this.state.fullPage,
                        isScrolling:false
                    }
                })
            }, 1000);
        })
    }
    
    directToMove=(index)=>{
        let height=this.fullPageRef.current.clientHeight;
        let width=this.fullPageRef.current.clientWidth;
        //位移多少
        let displacement;
        //判断是垂直滚动还是横向滚动
        if(this.props.direction==="vertical"){//垂直
            displacement=-(index-1)*height+'px';
            this.scrollPageRef.current.style.transform=`translate3d(0px,${displacement},0px)`
        }else{
            displacement=-(index-1)*width+'px';
            this.scrollPageRef.current.style.transform=`translateX(${displacement})`
        }
        this.setState({
            fullPage:{
                ...this.state.fullPage,
                current:index,
            }
        })
    }

    initFullPage=()=>{
        //初始化容器宽高度
        this.setState({
            isShow:false
        })
        let height=this.fullPageRef.current.clientHeight;
        let width=this.fullPageRef.current.clientWidth;
        //手动写容器的高度
        this.props.direction==="horizontal"?this.scrollPageRef.current.style.width=`${width*this.props.children.length}px`:null;
 
        this.props.children.forEach((item)=>{
            item.ref.current.style.height=`${height}px`;
            item.ref.current.style.width=`${width}px`;
            if(this.props.verticalCentered){
                item.ref.current.style.display="flex";
                item.ref.current.style.alignItems="center";
                item.ref.current.style.justifyContent="center";
            }
        })
        //显示滚动盒子
        this.setState({
            isShow:true
        })

    }

    render(){
        const {style}=this.props;
        const {isShow}=this.state;
    

        const scrollDomStyle={
            "display":this.state.isShow?"auto":"none"
        }

        return(
            <div style={style} 
                className="react-fullpage-container"
                ref={this.fullPageRef}
                onWheel={this.handleMouseWheel}
          
            >
                <div className={classNames(
                    'react-scroll-container',
                    isShow?"":"displaynone",
                )} ref={this.scrollPageRef} >
                    {this.props.children}
                </div>
            </div>
        )
    }
}   

export default FullPage;