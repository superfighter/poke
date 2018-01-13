import POKE from './K';
import Owner from './O';
import T from './T';
/**
 * 老板【管理者昵称】
 */
class Boss extends T{
  constructor(option) {
    super();
    console.info('===<加载老板>===');
    this.K = new POKE();
    this.player = [1,2,3]; // [1,2,3,4];
    this.init();
  }
  init() {
    console.info('===~初始化老板~===');
    this.player = this.player.map((data, index) => {
      return new Owner({
        name: 'robots' + data,
        points: (index + 1) * 100
      });
    });
    this.player.unshift(new Owner({
      name: 'Boss'
    }))
    console.log(this.player);
  }
  initCards() {
    this.player.map(data => {
      data.pokes = []
    })
    console.log('庄发初始牌了~~~');
    this.roulette(2);
  }
  roulette(num) {
    if (num === 0 || isNaN(num)) {
      console.warn('无效的发牌轮次');
      return false;
    } else {
      let i = 0;
      for (;i < num; i++) {
        this.player.map((data, key) => {
          this.dealCards(key);
        })
      }
    }
  }
  sum(ary) {
      if (!ary.length) return 0;
      let materialAry = ary.map(data => data.substr(1) * 1 > 10 ? 10 : data.substr(1) * 1);
      console.log(materialAry);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      return materialAry.reduce(reducer);
  }
  dealCards(to) {
    if (this.player[to].pokes.length === 5) {
      console.warn('玩家['+ to +']手中的牌达到5张上限无法再获取更多牌！');
      return false;
    }
    if (this.sum(this.player[to].pokes) > 21) {
      console.warn('玩家['+ to +']手牌总值暴点21了无法再获取更多牌！');
      return false;
    }
    const poke = this.K.dealCards();
    this.player[to].pokes.push(poke);
    console.log('发「' + poke + '」牌给' + to);
  }

}

module.exports = Boss;
