import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Mock from 'mockjs';
import Event from './lib/EventEmitter';
import Boss from './asserts/B';
import P from './asserts/P';
import './asserts/app.css';
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
        // this.E.emit('init');
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
        let styles = {

        }
        return (<div>
                <div className="pannel">
                    <div className="banker">
                        <div className="name" />
                        <div className="points" />
                        <div className="img" />
                        <div className="position" data-index="B">
                                <P shape="Diamond" className="p1" num="9"/>
                                <P shape="Diamond" className="p2" num="10"/>
                                <P shape="Diamond" className="p3" num="3"/>
                                <P shape="Diamond" className="p4" num="2"/>
                                <P shape="Diamond" className="p5" num="7"/>
                        </div>
                    </div>
                    {/*<div className="timer" />*/}
                    <div className="customer">
                        <div className="wrapper">
                            <div className="img" />
                            <div className="position" data-index="1">
                                <P shape="Diamond" className="p1" num="9"/>
                                <P shape="Diamond" className="p2" num="10"/>
                                <P shape="Diamond" className="p3" num="3"/>
                                <P shape="Diamond" className="p4" num="2"/>
                                <P shape="Diamond" className="p5" num="7"/>
                            </div>
                            <div className="name" />
                            <div className="points" />
                        </div>
                        <div className="wrapper">
                            <div className="img" />
                            <div className="position" data-index="2" />
                            <div className="name" />
                            <div className="points" />
                        </div>
                        <div className="wrapper">
                            <div className="img" />
                            <div className="position" data-index="3" />
                            <div className="name" />
                            <div className="points" />
                        </div>
                        <div className="wrapper">
                            <div className="img" />
                            <div className="position" data-index="4" />
                            <div className="name" />
                            <div className="points" />
                        </div>
                        {/*
                        <div className="position" data-index="2">
                        </div>
                        <div className="position" data-index="3">
                        </div>

                        <div className="position" data-index="4">
                        </div>

                        <div className="position" data-index="5">
                        </div>
                        */}
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