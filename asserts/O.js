/**
 * 参与者
 */
class Owner {
  constructor(option) {
    console.info('===<加载参与者>===');
    this.name = option && option.name || 'robots';
    this.points = option && option.points || 0;
    this.pokes = [];
    this.warState = '0'; // 0:没结算 1:结算赢 2:结算输
    this.init();
  }
  init() {
    console.info('===~初始化参与者~===');
    console.info(this.name);
  }
}

module.exports = Owner;
