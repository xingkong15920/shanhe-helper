Page({
    data: {
        rjlx: [{
            name: '企业入件',
            imgUrl: '../../img/registr_choose_bg01.png',
            rjlxType: 1,
        }, {
            name: '个体工商户',
            imgUrl: '../../img/registr_choose_bg02.png',
            rjlxType: 2,
        }, {
            name: '个体入件',
            imgUrl: '../../img/registr_choose_bg03.png',
            rjlxType: 3,
        }],
        tdlx: [{
            name: '直连通道',
            imgUrl: '../../img/registr_choose_bg04.png',
            tdlxType: 4,
        }, {
            name: '间联通道',
            imgUrl: '../../img/registr_choose_bg05.png',
            tdlxType: 5,
        }],
        active_rj: 10000,
        active_td: 10000,
        type_rj: 0,
        type_td: 0,
		merNumber:'',
    },
    chooseRJ: function(e) {
        var that = this,
            i = e.currentTarget.dataset.idx,
            lxtype = e.currentTarget.dataset.type;
        that.setData({
            active_rj: i,
            type_rj: lxtype,
        })
    },
    chooseTD: function(e) {
        var that = this,
            i = e.currentTarget.dataset.idx,
            lxtype = e.currentTarget.dataset.type;
        that.setData({
            active_td: i,
            type_td: lxtype,
        })
    },
    toRegisterNew: function toRegisterNew() {
        var that = this
        if (!that.data.type_rj) {
            wx.showToast({
                title: '请选择入件类型',
                icon: 'none',
            })
            return
        }
        if (!that.data.type_td) {
            wx.showToast({
                title: '请选择通道类型',
                icon: 'none',
            })
            return
        }
        wx.navigateTo({
			url: '../register-new/index?rjlx=' + that.data.type_rj + '&tdlx=' + that.data.type_td + '&merNumber=' + that.data.merNumber,
        })
    },
    onLoad: function(options) {
        var options = options
        this.setData({
            merNumber: options.merchantNumber,
        })
    }
})