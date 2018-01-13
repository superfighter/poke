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
class Operates extends Component{
    constructor() {
        super();
    }
    dealCards(index) {
        this.props.dealCards(index);
    }
    giveup(index) {
        this.props.giveup(index);
    }
    render() {
        return (
            <div>
                {this.props.operate === '3' &&
                    <button >不能要了</button>
                }
                {(this.props.operate !== '3' || this.props.sum == 21 || this.props.pokes.length === 5) &&
                    <div>
                        <button onClick={this.dealCards.bind(this, this.props.index)}>要</button>
                        <button onClick={this.giveup.bind(this, this.props.index)}>不要</button>
                    </div>
                }
            </div>
        );
    }
}
class App extends Component{
    constructor() {
        super();
        this.B = new Boss();
        // 这里有点别扭，最好不要这么做
        let player = [];
        this.B.player.map(data => {
            player.push({
                pokes: [],
                name: data.name,
                operate: '1' // 1[准备] 2[要牌] 3[停牌] 4[双倍]
            })
        })
        this.state= {
            player
        }
        this.E = new Event();
        this.E.on('init', () => {
            this.B.initCards();
            this.handleDealCards();
        });
        this.dealCards = this.dealCards.bind(this);
        this.initCards = this.initCards.bind(this);
        this.giveup = this.giveup.bind(this);
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
        debugger;
        this.B.emit('trial', [to, () => {
            let trialResult = [];
            this.B.player.map((player, index) => {
                index > 0 &&
                trialResult.push(player.warState);
            });
            let end = trialResult.every(data => {
                return data === '2';
            });
            if (end) {
                console.group('after trial');
                console.log(this);
                debugger;
                console.groupEnd('after trial');
                // this.setState({
                //     player: 
                // });
            }
        }]);
        this.handleDealCards();
    }
    sum(ary) {
        return this.B.sum(ary);
    }
    initCards() {
        this.E.emit('init');
    }
    giveup(index) {
        let player = this.state.player;
        player.map((data, key) => {
            if (key === index) {
                data.operate = '3';
            }
        })
        this.setState({
            player
        })
    }
    render() {
        // console.log(this.B);
        let sumBossClassName = 'img ';
        let sumBoss = this.sum(this.state.player[0].pokes);
        if (sumBoss > 21) {
            sumBossClassName = sumBossClassName + 'boom';
        }
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
                        <div className="operate">
                            {sumBoss < 21 &&
                                <Operates pokes={this.B.player[0].operate} sum={sumBoss} operate={this.B.player[0].operate} index={0} dealCards={this.dealCards} giveup={this.giveup}/>
                            }
                        </div>
                        <div className={sumBossClassName}>
                            {sumBoss}
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
                        {this.state.player &&
                            this.state.player.map((data, index) => {
                                let sumClassName = 'img ';
                                let sum = this.sum(data.pokes);
                                if (sum > 21 || data.warState === '2') {
                                    sumClassName = sumClassName + 'boom';
                                }
                                return index > 0 && (<div className="wrapper">
                                            <div className="operate">
                                                {sum < 21 &&
                                                    <Operates pokes={data.pokes} sum={sum} operate={data.operate} index={index} dealCards={this.dealCards} giveup={this.giveup}/>
                                                }
                                            </div>
                                            <div className={sumClassName}>
                                                {sum}
                                            </div>
                                            <div className="position" data-index="1">
                                                {data.pokes && 
                                                    data.pokes.map((data, key) => {
                                                        return <P shape={SHAPES[data.substr(0, 1)]} className={'p' + (++key)} num={data.substr(1)}/>
                                                    })
                                                }
                                            </div>
                                            <div className="name">
                                                {this.B.player[index].name}
                                            </div>
                                            <div className="points">
                                                {this.B.player[index].points}
                                            </div>
                                        </div>)
                            })}
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