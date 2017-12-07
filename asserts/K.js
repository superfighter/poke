/**
 * 老K牌
 */
class POKE {
  constructor() {
    console.info('===<加载扑克资源>===');
    this.poke = {
      '0': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      '1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      '2': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      '3': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    };
    this.color = 4;
    this.seed = {
      '0': 13,
      '1': 13,
      '2': 13,
      '3': 13
    };
    this.noPoke = false;
    this.total = 52;
    // 空牌花色
    this.emptyColor = [];
  }
  init() {
    console.info('===~初始化扑克资源~===');
  }
  dealCards() {
    if (!this.noPoke) {
      console.log('发牌了');
      // 0-3, 0-12
      let curColor = this.getRand(this.color);
      if (this.emptyColor.indexOf(curColor) > -1) {
        console.warn('没有' + curColor + '花色牌了，重新选择花色');
        return setTimeout(() => {
          this.dealCards()
        }, 1500);
      }
      const curSeed = this.getRand(this.seed[curColor]);
      if (this.poke[curColor][curSeed]) {
        console.log('发了' + curColor + '花色的' + this.poke[curColor][curSeed]);
        const out = this.poke[curColor].splice(curSeed, 1);
        this.calcTotal(-1);
        this.calcSeed(curColor, -1);
        console.log(this.seed);
        console.log(this.poke[curColor]);
        console.log('剩余' + this.total + '张');
        return out[0];
      } else {
        console.log('要发的牌没有了');
      }
    }
  }
  getRand(threshold) {
    return Math.floor(Math.random() * threshold);
  }
  calcTotal(n) {
    if (this.total !== 0) {
      this.total = this.total + n;
      if (this.total === 0) {
        this.done();
      }
    }
  }
  calcSeed(target, n) {
    if (this.seed[target] !== 0) {
      this.seed[target] = this.seed[target] + n;
      if (this.seed[target] === 0) {
        this.emptyColor.push(target);
      }
    }
  }
  done() {
    console.info('没有更多的扑克牌了，游戏结束');
    this.noPoke = true;
    return false;
  }
  getLeft() {
    console.log(this.total);
  }
}

module.exports = POKE;
