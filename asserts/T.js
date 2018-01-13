import Event from '../lib/EventEmitter';
/**
 * 审判者 Trial
 * 判别胜负，清算points
 */
class T extends Event{
  constructor() {
    super();
    this.on('trial', (arg) => {
      this.trial(arg);
    })
  }
  trial(arg) {
    // if (arg.toString() === '0') {
      // console.group('~~~~');
      // console.log(this);
      // console.groupEnd('~~~~');
      console.error('fuck?', arg);
      this.expropriate();
      if (typeof arg[1] === 'function') {
        arg[1]();
      }
    // }
  }
  /**
   * 和 Boss 的sum方法一样，要提取到公共类
   * @param {Array} ary 
   */
  sum(ary) {
      if (!ary.length) return 0;
      let materialAry = ary.map(data => data.substr(1) * 1 > 10 ? 10 : data.substr(1) * 1);
      console.log(materialAry);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      return materialAry.reduce(reducer);
  }
  expropriate() {
    const bosser = this.player[0];
    this.player.map((player) => {
      if (player.operate && player.operate === '3' && player.warState === '0') {
        const sp = this.sum(player.pokes);
        const sb = this.sum(this.player[0].pokes);
        if (sb > 21) {
          player.warState = '1';
        } else if (sp - sb === 0) {
          player.warState = '2';
        } else if (sb - sp < 0) {
          player.warState = '1';
        } else if (sb - sp > 0) {
          player.warState = '2';
        }
        // console.log(player.name + ' sum==>' + sp);
        // console.log('Boss sum==>' + sb);
        // console.log(sb - sp);
      }
    })
  }
}

module.exports = T;
