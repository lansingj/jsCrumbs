Page({
    data: {
        couponInfo: [
            { id: 0, amount:"50", name: "新用户专享优惠券", des:"新用户专享", end_time: "2019-12-30"},
            { id: 1, amount:"100", name: "家装建材节优惠券", des:"满800减100", end_time: "2019-6-12"},
            { id: 2, amount:"30", name: "无门槛优惠券", des:"", end_time: "2019-8-8"},
        ],
        tab: [{ id: 0, name: "精选" }, { id: 1, name: "发现" }],
        activeIndex: 0
    },
    /**
     * tab 切换
     */
    tabClick: function(e) {
        this.setData({
            activeIndex: e.target.dataset.id
        });
    }
});
