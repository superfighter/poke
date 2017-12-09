import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Mock from 'mockjs';
import Event from './lib/EventEmitter';
import Boss from './asserts/B';
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
            }]
        }
        this.B = new Boss();
        this.E = new Event();
        this.E.on('init', () => {
            this.initCards();
        })
        this.dealCards = this.dealCards.bind(this);

    }
    componentDidMount() {
        this.E.emit('init');
    }
    dealCards(to) {
        this.B.dealCards(to);
        this.setState({
            player: this.B.player
        })
    }
    sum(ary) {
        return this.B.sum(ary);
    }
    initCards() {
        this.B.initCards();
    }
    render() {
        return (<div>
            <div >
                <div><a href="javascript: void 0" onClick={this.initCards}>庄发初始牌</a></div>
                <div>
                    <a href="javascript: void 0" onClick={this.dealCards.bind(this, 0)}>1号要牌</a>
                    <span>1号牌面:<span>{this.state.player[0].pokes.join(',')}</span></span>
                    <span style={{
                        color: this.sum(this.state.player[0].pokes) > 21 ? 'red' : 'blue'}}>总值: {this.sum(this.state.player[0].pokes)}</span>
                </div>
                <div>
                    <a href="javascript: void 0" onClick={this.dealCards.bind(this, 1)}>2号要牌</a>
                    <span>2号牌面:<span>{this.state.player[1].pokes.join(',')}</span></span>
                    <span style={{
                        color: this.sum(this.state.player[1].pokes) > 21 ? 'red' : 'blue'}}>总值: {this.sum(this.state.player[1].pokes)}</span>
                </div>
                <div>
                    <a href="javascript: void 0" onClick={this.dealCards.bind(this, 2)}>3号要牌</a>
                    <span>3号牌面:<span>{this.state.player[2].pokes.join(',')}</span></span>
                    <span style={{
                        color: this.sum(this.state.player[2].pokes) > 21 ? 'red' : 'blue'}}>总值: {this.sum(this.state.player[2].pokes)}</span>
                </div>
                <div>
                    <a href="javascript: void 0" onClick={this.dealCards.bind(this, 3)}>4号要牌</a>
                    <span>4号牌面:<span>{this.state.player[3].pokes.join(',')}</span></span>
                    <span style={{
                        color: this.sum(this.state.player[3].pokes) > 21 ? 'red' : 'blue'}}>总值: {this.sum(this.state.player[3].pokes)}</span>
                </div>
            </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.querySelector('#content'));

if (module.hot) {
    module.hot.accept();
}