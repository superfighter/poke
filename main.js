import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Mock from 'mockjs';
import Event from './lib/EventEmitter';
import Boss from './asserts/B';
import P from './asserts/P';
import './asserts/app.css';
const SHAPES = {
    '0': 'Heart',
    '1': 'Club',
    '2': 'Diamond',
    '3': 'Loyalty'
} 
class App extends Component{
    constructor() {
        super();
        this.state= {
            'player': [{
                pokes: []
            }, 
            {
                pokes: []
            }, 
            {
                pokes: []
            }, 
            {
                pokes: []
            }, 
            {
                pokes: []
            }]
        }
        this.B = new Boss();
        this.E = new Event();
        this.E.on('init', () => {
            this.B.initCards();
            this.handleDealCards();
        })
        this.dealCards = this.dealCards.bind(this);
        this.initCards = this.initCards.bind(this);
    }
    componentDidMount() {
        this.E.emit('init');
    }
    handleDealCards() {
        this.setState({
            player: this.B.player
        })
    }
    dealCards(to) {
        this.B.dealCards(to);
        this.handleDealCards();
    }
    sum(ary) {
        return this.B.sum(ary);
    }
    initCards() {
        this.E.emit('init');
    }
    render() {
        console.log(this.B);
        return (<div>
                <div className="pannel">
                    {/* <P shape="Heart" className="p1 animate1" num="3"/>*/}
                    <div className="banker">
                        <div className="name">
                            {this.B.player[0].name}
                        </div>
                        <div className="points">
                            {this.B.player[0].points}
                        </div>
                        <div className="img">
                            {this.sum(this.state.player[0].pokes)}
                        </div>
                        <div className="position" data-index="B">
                                {this.state.player[0].pokes && 
                                    this.state.player[0].pokes.map((data, index) => {
                                        return <P shape={SHAPES[data.substr(0, 1)]} className={'p' + ++index} num={data.substr(1)}/>
                                    })
                                }
                        </div>
                    </div>
                    {/*<div className="timer" />*/}
                    <div className="customer">
                        <div className="wrapper">
                            <div className="img">
                                {this.sum(this.state.player[1].pokes)}
                            </div>
                            <div className="position" data-index="1">
                                {this.state.player[1].pokes && 
                                    this.state.player[1].pokes.map((data, index) => {
                                        return <P shape={SHAPES[data.substr(0, 1)]} className={'p' + ++index} num={data.substr(1)}/>
                                    })
                                }
                            </div>
                            <div className="name">
                                {this.B.player[1].name}
                            </div>
                            <div className="points">
                                {this.B.player[1].points}
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="img">
                                {this.sum(this.state.player[2].pokes)}
                            </div>
                            <div className="position" data-index="2">
                                {this.state.player[2].pokes && 
                                    this.state.player[2].pokes.map((data, index) => {
                                        return <P shape={SHAPES[data.substr(0, 1)]} className={'p' + ++index} num={data.substr(1)}/>
                                    })
                                }
                            </div>
                            <div className="name">
                                {this.B.player[2].name}
                            </div>
                            <div className="points">
                                {this.B.player[2].points}
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="img">
                                {this.sum(this.state.player[3].pokes)}
                            </div>
                            <div className="position" data-index="3">
                                {this.state.player[3].pokes && 
                                    this.state.player[3].pokes.map((data, index) => {
                                        return <P shape={SHAPES[data.substr(0, 1)]} className={'p' + ++index} num={data.substr(1)}/>
                                    })
                                }
                            </div>
                            <div className="name">
                                {this.B.player[3].name}
                            </div>
                            <div className="points">
                                {this.B.player[3].points}
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="img">
                                {this.sum(this.state.player[4].pokes)}
                            </div>
                            <div className="position" data-index="4">
                                {this.state.player[4].pokes && 
                                    this.state.player[4].pokes.map((data, index) => {
                                        return <P shape={SHAPES[data.substr(0, 1)]} className={'p' + ++index} num={data.substr(1)}/>
                                    })
                                }
                            </div>
                            <div className="name">
                                {this.B.player[4].name}
                            </div>
                            <div className="points">
                                {this.B.player[4].points}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="heart" />
                <div className="heart heart2" />
                <div className="diamond" />
                <P shape="Diamond" num="9"/> */}
                {/*
                    <div className="pokeman shapeClub">
                        <div className="numTop">A</div>
                        <div className="shape">
                            <div className="bing" />
                            <div className="club" />
                        </div>
                        <div className="numBtm">A</div>
                    </div>
                    <div className="pokeman shapeDiamond">
                        <div className="numTop">3</div>
                        <div className="shape">
                            <div className="diamond" />
                        </div>
                        <div className="numBtm">3</div>
                    </div>
                    <div className="pokeman shapeLoyalty animate1">
                        <div className="numTop">4</div>
                        <div className="shape">
                            <div className="loyalty" />
                        </div>
                        <div className="numBtm">4</div>
                    </div>
                    <div className="pokeman shapeHeart">
                        <div className="numTop">2</div>
                        <div className="shape">
                            <div className="bing" />
                            <div className="heart heart2" />
                        </div>
                        <div className="numBtm">2</div>
                    </div>
                */}
                {/*
                    <div>
                        <a href="javascript: void 0" onClick={this.initCards}>庄发初始牌</a>
                    </div>
                    <div>
                        <a href="javascript: void 0" onClick={this.dealCards.bind(this, 0)}>庄家要牌</a>
                        <span>庄家牌面:<span>{this.state.player[0].pokes.join(',')}</span></span>
                        <span style={{
                            color: this.sum(this.state.player[0].pokes) > 21 ? 'red' : 'blue'}}>总值: {this.sum(this.state.player[0].pokes)}</span>
                        </div>
                    <div>
                        <a href="javascript: void 0" onClick={this.dealCards.bind(this, 1)}>1号要牌</a>
                        <span>1号牌面:<span>{this.state.player[1].pokes.join(',')}</span></span>
                        <span style={{
                            color: this.sum(this.state.player[1].pokes) > 21 ? 'red' : 'blue'}}>总值: {this.sum(this.state.player[1].pokes)}</span>
                    </div>
                    <div>
                        <a href="javascript: void 0" onClick={this.dealCards.bind(this, 2)}>2号要牌</a>
                        <span>2号牌面:<span>{this.state.player[2].pokes.join(',')}</span></span>
                        <span style={{
                            color: this.sum(this.state.player[2].pokes) > 21 ? 'red' : 'blue'}}>总值: {this.sum(this.state.player[2].pokes)}</span>
                    </div>
                    <div>
                        <a href="javascript: void 0" onClick={this.dealCards.bind(this, 3)}>3号要牌</a>
                        <span>3号牌面:<span>{this.state.player[3].pokes.join(',')}</span></span>
                        <span style={{
                            color: this.sum(this.state.player[3].pokes) > 21 ? 'red' : 'blue'}}>总值: {this.sum(this.state.player[3].pokes)}</span>
                    </div>
                    <div>
                        <a href="javascript: void 0" onClick={this.dealCards.bind(this, 4)}>4号要牌</a>
                        <span>4号牌面:<span>{this.state.player[4].pokes.join(',')}</span></span>
                        <span style={{
                            color: this.sum(this.state.player[4].pokes) > 21 ? 'red' : 'blue'}}>总值: {this.sum(this.state.player[4].pokes)}</span>
                    </div>
                */}
            </div>);
    }
}
ReactDOM.render(<App />, document.querySelector('#content'));

if (module.hot) {
    module.hot.accept();
}