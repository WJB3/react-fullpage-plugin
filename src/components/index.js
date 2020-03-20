
import React,{Component} from 'react';    
   

export default class Slides extends Component {

    constructor(){

        super();

        this.state = {

            index: 0

        }

    }

    componentDidMount() {

        setInterval(() => {

            if (this.state.index >= 5) {

                this.ul.style.transitionDuration = '0s';

                this.ul.style.left = 0;

                setTimeout(() => {

                    this.ul.style.transitionDuration = '1s';

                    this.setState({

                        index: 1

                    });

                }, 0);

                return;

            }

            this.setState({

                index: this.state.index + 1

            })

        }, 2000);

    }

    render() {

        let style = {

            left: -800 * this.state.index + 'px'

        };

        return (

            <div className="wrap">

                <div className="box">

                    <ul style={style} className="slide" ref={(ul) => { this.ul = ul; }}>

                        {

                            this.props.imgs.map((item, index) => {

                                return <li key={index}><img src={item} /></li>

                            })

                        }

                        <li><img src={this.props.imgs[0]} /></li>

                    </ul>

                    <ul className="dots">

                        {

                            this.props.imgs.map((item, index) => {

                                return <li className={this.state.index === index || (index === 0 && this.state.index === this.props.imgs.length) ? 'active' : ''} key={index}></li>

                            })

                        }

                    </ul>

                </div>

            </div>

        );

    }

}

