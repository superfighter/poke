/**
 * 参与者
 */
class Owner {
  constructor(option) {
    console.info('===<加载参与者>===');
    this.name = option && option.name || 'robots';
    this.points = 0;
    this.pokes = [];
    this.init();
  }
  init() {
    console.info('===~初始化参与者~===');
    console.info(this.name);
  }
}

module.exports = Owner;
