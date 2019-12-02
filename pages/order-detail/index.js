// pages/dl-detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        infoList: [{
            key: '商户编号',
            value: '193213731928319829',
        }, {
            key: '商户名称',
            value: '石家庄迈峰健身'
        }, {
            key: '商户订单号',
            value: '183921782193712892'
        }, {
            key: '交易金额',
            value: '￥200.00'
        }, {
            key: '手续费',
            value: '￥0.84'
        }, {
            key: '实收金额',
            value: '￥199.16'
			}, {
				key: '成功时间',
				value: '2019-09-09 09:12:12'
			}, {
				key: '支付方式',
				value: '支付宝',
			}],
        changeRate: false,
        changePass: false,
		orderType:'0',
		typeName:'交易成功'
    },
    rate: function() {
        this.setData({
            changeRate: !this.data.changeRate
        })
    },
    pass: function() {
        this.setData({
            changePass: !this.data.changePass
        })
    },
    hide: function(e) {
        console.log(e)
        if (e.currentTarget.dataset.hide == 'no') {
            this.setData({
                changeRate: false,
                changePass: false
            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
		var da = JSON.parse(options.info)
		console.log(da)
		var infoList =  [{
			key: '商户编号',
			value: da.merchantNumber,
		}, {
				key: '商户名称',
				value: da.merchantName
			}, {
				key: '商户订单号',
				value: da.batch
			}, {
				key: '交易金额',
				value: da.transactionAmount
			}, {
				key: '手续费',
				value: da.shopPoundage
			}, {
				key: '实收金额',
				value: da.settlementAmount
			}, {
				key: '成功时间',
				value: da.transactionTime
			}, {
				key: '支付方式',
				value: da.onePaymentTypeName==1?'微信':'支付宝'
			}]
			var orderName;
			if(da.orderState == 1){
				orderName='交易成功'
			}
		if (da.orderState == 5) {
			orderName= '部分退款'
		}
		if (da.orderState == 4) {
			orderName= '全部退款'
		}
			this.setData({
				orderType: da.onePaymentTypeName,
				infoList:infoList,
				orderName:orderName,
				money: da.transactionAmount
			})
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