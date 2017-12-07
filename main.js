import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Mock from 'mockjs';
import Event from './lib/EventEmitter';
import Boss from './asserts/B';
class App extends Component{
    constructor() {
        super();
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
    }
    initCards() {
        this.B.initCards();
    }
    render() {
        return (<div>
            <div >
                <a href="javascript: void 0" onClick={this.initCards}>庄发初始牌</a>
                <a href="javascript: void 0" onClick={this.dealCards.bind(this, 0)}>1号要牌</a>
                <a href="javascript: void 0" onClick={this.dealCards.bind(this, 1)}>2号要牌</a>
                <a href="javascript: void 0" onClick={this.dealCards.bind(this, 2)}>3号要牌</a>
                <a href="javascript: void 0" onClick={this.dealCards.bind(this, 3)}>4号要牌</a>
            </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.querySelector('#content'));

if (module.hot) {
    module.hot.accept();
}