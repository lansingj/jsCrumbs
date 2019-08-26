Page({
  data: {
   sorts: [{id:0,name:"全部"},{id:1,name:"住宅家具"},{id:2,name:"家装主材"},{id:3, name:"灯饰五金"},{id:4, name:"全屋定制"},{id:5, name:"居家布艺"},{id:6, name:"家居饰品"}],
   tab: [{id:0,name:"精选"},{id:1,name:"发现"}],
   activeIndex:0
  },
  /**
   * tab 切换
   */
  tabClick: function(e) {
    // console.log(e.currentTarget,e.target);
    // console.log(this.data.activeIndex);
    this.setData({
      activeIndex: e.target.dataset.id,
    });
  },

})