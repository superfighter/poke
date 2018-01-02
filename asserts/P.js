import React, {Component} from 'react';
import ReactDOM from 'react-dom';
/**
 * 老K牌
 * Club Diamond Heart Loyalty
 */
class P extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    let {num, shape = 'Club'} = this.props;
    let bing = shape === 'Heart' || shape === 'Club';
    let subClassName = shape.toLowerCase();
    if (shape === 'heart') {
      subClassName = subClassName + ' heart2';
    }
    return (
      <div className={'pokeman shape' + shape + ' ' + this.props.className}>
          <div className="numTop">{num}</div>
          <div className="shape">
              {bing === true &&
                <div className="bing" />
              }
              <div className={subClassName} />
          </div>
          <div className="numBtm">{num}</div>
      </div>
    )
  }
}

module.exports = P;
