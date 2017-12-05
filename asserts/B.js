import POKE from './K';
import Owner from './O';
import Event from '../lib/EventEmitter';
/**
 * 老板【管理者昵称】
 */
class Boss {
  constructor(option) {
    console.info('===<加载老板>===');
    this.K = new POKE();
    this.player = [1,2,3,4];
    this.init();
  }
  init() {
    console.info('===~初始化老板~===');
    this.player = this.player.map(data => {
      return new Owner({
        name: 'robots' + data
      });
    });
    console.log(this.player);
  }
  dealCards() {
    this.K.dealCards();
  }
}

module.exports = Boss;
