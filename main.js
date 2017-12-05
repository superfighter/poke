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
            this.B.dealCards();
        })
        this.dealCards = this.dealCards.bind(this);
    }
    componentDidMount() {
        this.E.emit('init');
    }
    dealCards () {
        this.B.dealCards();
    }
    render() {
        return (<div>
            <div >
                <a href="javascript: void 0" onClick={this.dealCards}>Fire~</a>
            </div>
            </div>);
    }
}
ReactDOM.render(<App />, document.querySelector('#content'));

if (module.hot) {
    module.hot.accept();
}