const config_jg = require('../../../utils/config-organ.js')
const common = require('../../../utils/common.js').CmsConfig

Page({
    data: {
        server_jg: config_jg.server,
        rjlx: [{
            name: '企业入件',
            imgUrl: '../../img/registr_choose_bg01.png',
            rjlxType: 1,
        }, {
            name: '个体工商户',
            imgUrl: '../../img/registr_choose_bg02.png',
            rjlxType: 2,
        }, {
            name: '个人入件',
            imgUrl: '../../img/registr_choose_bg03.png',
            rjlxType: 3,
        }],
        tdlx: [{
            name: '直连通道',
            imgUrl: '../../img/registr_choose_bg04.png',
            tdlxType: 1,
        }, {
            name: '间联通道',
            imgUrl: '../../img/registr_choose_bg05.png',
            tdlxType: 2,
        }],
        active_rj: 10000,
        active_td: 10000,
        type_rj: 0,
        type_td: 0,
    },
    chooseRJ: function(e) {
        var that = this,
            i = e.currentTarget.dataset.idx,
            rjtype = e.currentTarget.dataset.type;
        that.setData({
            active_rj: i,
            type_rj: rjtype,
        })
    },
    chooseTD: function(e) {
        var that = this,
            i = e.currentTarget.dataset.idx,
            tdtype = e.currentTarget.dataset.type;
        that.setData({
            active_td: i,
            type_td: tdtype,
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
            url: '../register-new/index?rjlx=' + that.data.type_rj + '&tdlx=' + that.data.type_td,
        })
    },
    onLoad: function(options) {
        var options = options,
            that = this,
            payment_zl = new Array,
            payment_jl = new Array;

        wx.request({
            url: that.data.server_jg + 'InsMer/getInstitutionPayments',
            method: 'post',
            data: {
                institutionNumber: wx.getStorageSync('saleInfo').institutionNumber
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
                // 'content-type': 'application/json' // json
            },
            success: function(data) {
                if (data.data.code != 1000) {
                    wx.showToast({
                        title: data.data.msg,
                        icon: 'none',
                    })
                } else {
                    var data = data.data.data
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].paymentType < 2) {
                            payment_zl.push(data[i])
                        } else {
                            payment_jl.push(data[i])
                        }
                    }
                    console.log(payment_zl)
                    console.log(payment_jl)
                    wx.setStorageSync('payment_zl', payment_zl);
                    wx.setStorageSync('payment_jl', payment_jl);
                }
            }
        })
    }
})