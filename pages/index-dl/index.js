const config = require('../../utils/config.js')
const common = require('../../utils/common-dl.js').CmsConfig

Page({

    /**
     * 页面的初始数据
     */
    data: {
        server: config.server,
        fx: "left",
        tongjiList: [{
            color: 'small-M',
            name: '账户余额',
            data: '￥1000.00'
        }, {
            color: 'small-M1',
            name: '已提现余额',
            data: '￥1000.00'
        }, {
            color: 'small-M2',
            name: '昨日新增服务商',
            data: '0'
        }, {
            color: 'small-M3',
            name: '昨日新增商户',
            data: '2'
        }],

        modelList: [{
            img: '../img/sh.png',
            name: '商户管理',
            tap: 'sh'
        }, {
            img: '../img/dl.png',
            name: '服务商管理',
            tap: 'dl'
        }, {
            img: '../img/xs.png',
            name: '销售管理',
            tap: 'sale'
        }, {
            img: '../img/tx.png',
            name: '提现管理',
            tap: 'tx'
        }, {
            img: '../img/dxzd.png',
            name: '服务商账单',
            tap: 'dlzhangdan'
        }, {
            img: '../img/xszd.png',
            name: '销售账单',
            tap: 'salezhangdan'
        }],
        dataList: [
			{
				name: '交易',
				name1: '交易汇总',
				data1: '1232.00',
				name2: '昨日交易金额',
				data2: '1231.00',
				name3: '本月交易金额',
				data3: '1884.00'
			}, {
				name: '商户',
				name1: '商户总数(个)',
				data1: '123',
				name2: '昨日新增商户',
				data2: '123',
				name3: '本月新增商户',
				data3: '1834'
			}, {
				name: '服务商',
				name1: '服务商总数(个)',
				data1: '456',
				name2: '昨日新增服务商',
				data2: '23',
				name3: '本月新增服务商',
				data3: '56'
			}
		],
		yue:0,
		jiaoyi:0,
		tixian:0,
		yitixian:0,
		headData:{},
		rotate:-50
    },
    getData: function() {
        wx.showLoading({
            title: '加载中...',
        })
        var nOData = new Object()
        nOData.agentNumber = wx.getStorageSync('shopInfo').Number
        nOData.agentLevel = wx.getStorageSync('shopInfo').agentLevel
        var that = this
        wx.request({
            url: this.data.server + common.getHeadData, //仅为示例，并非真实的接口地址
            data: nOData,
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function(res) {
                wx.hideLoading()
                console.log(res)
                if (res.data.code == 1000) {
					var newOb = new Object()
					newOb.yue = res.data.data.balance
					newOb.yitixian = res.data.data.cashoutMoney
					wx.setStorageSync('dlMoney', newOb)
                    var tongjiList = [{
                        color: 'small-M',
                        name: '账户余额',
                        data: '￥' + res.data.data.balance
                    }, {
                        color: 'small-M1',
                        name: '已提现余额',
                        data: '￥' + res.data.data.cashoutMoney
                    }, {
                        color: 'small-M2',
                        name: '昨日新增服务商',
                        data: '￥' + res.data.data.agentCount
                    }, {
                        color: 'small-M3',
                        name: '昨日新增商户',
                        data: '￥' + res.data.data.merchantCount
                    }]
					var rotate1
					
					
					if (res.data.data.dealMoney < 10000) {
						rotate1 = that.data.rotate + Math.ceil(res.data.data.dealMoney / 100) * 1
					}
					if (res.data.data.dealMoney > 10000 && res.data.data.dealMoney < 50000){
						rotate1 = that.data.rotate + 100 + Math.ceil(res.data.data.dealMoney / 10000) * 10
					}
					if(rotate1>=150){
						rotate1 = 150
					}
                    that.setData({
                        tongjiList: tongjiList,
                        yesMoney: res.data.data.dealMoney,
						fx: res.data.data.dealMoney > 10000 ? 'right':'left',
						rotate: rotate1,
						keyitixian: res.data.data.balance
                    })
                } else {

                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            }
        })
        wx.request({
            url: this.data.server + common.getDataTj, //仅为示例，并非真实的接口地址
            data: nOData,
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function(res) {
                wx.hideLoading()
                if (res.data.code == 1000) {
					var dataList =  [
						{
							name: '交易',
							name1: '交易汇总',
							data1: that.data.jiaoyi,
							name2: '昨日交易金额',
							data2: res.data.data.dealMoney1,
							name3: '本月交易金额',
							data3: res.data.data.dealMoney2,
						}, {
							name: '商户',
							name1: '商户总数(个)',
							data1: res.data.data.merchantCount,
							name2: '昨日新增商户',
							data2: res.data.data.merchantCount1,
							name3: '本月新增商户',
							data3: res.data.data.merchantCount2,
						}, {
							name: '服务商',
							name1: '服务商总数(个)',
							data1: res.data.data.agentCount,
							name2: '昨日新增服务商',
							data2: res.data.data.agentCount1,
							name3: '本月新增服务商',
							data3: res.data.data.agentCount2,
						}
					]
					that.setData({
						dataList: dataList,
						
					})
                } else {

                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            }
        })
        wx.request({
            url: this.data.server + common.getAccountTj, //仅为示例，并非真实的接口地址
            data: nOData,
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function(res) {
                wx.hideLoading()
                console.log(res)
                if (res.data.code == 1000) {
					var mony
					if(res.data.data.dealMoney > 100000){
						mony = (res.data.data.dealMoney/10000).toFixed(2) + ' 万'
					}else{
						mony = res.data.data.dealMoney
					}
					that.setData({
						yue: res.data.data.balances,
						jiaoyi: mony,
						tixian: res.data.data.cashoutMoney2,
						yitixian: res.data.data.cashoutMoney1,
					})
				} else {

                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            }
        })
    },
    sh: function() {
        wx.navigateTo({
            url: '../dl-merchant/index',
        })
    },
    dl: function() {
        wx.navigateTo({
            url: '../dl-manage/index',
        })
    },
    sale: function() {
        wx.navigateTo({
            url: '../dl-sale/index',
        })
    },
    tx: function() {
        wx.navigateTo({
			url: '../dl-tixian/index?keyitixian=' + this.data.keyitixian,
        })
    },
    dlzhangdan: function() {
        wx.navigateTo({
            url: '../dl-zhangdan/index',
        })
    },
    salezhangdan: function() {
        wx.navigateTo({
            url: '../dl-sale-zhangdan/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
		
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
		this.getData()
		this.setData({
			rotate: -50
		})
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})