import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Mock from 'mockjs';
import Event from './lib/EventEmitter';
import POKE from './asserts/K';
class App extends Component{
    constructor() {
        super();
        this.K = new POKE();
        this.E = new Event();
        this.E.on('see', () => {
            this.K.dealCards();
        })
        this.dealCards = this.dealCards.bind(this);
    }
    componentDidMount() {
        this.E.emit('see');
    }
    dealCards () {
        this.K.dealCards();
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