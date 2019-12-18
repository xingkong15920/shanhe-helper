// pages/dl-rate/index.js
const config = require('../../utils/config1.js')
const common = require('../../utils/common-dl.js').CmsConfig

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		server: config.server,
		xdlaliRate:'0.30',
		xdlweChatRate:'0.30',
		xdlUnionPayRate:'0.30',
		xdlJDWallet:'0.30',
		xdlQQWallet:'0.30',
		fyweChatRate:'0.30',
		fyaliRate:'0.30',
		fyUnionPayRate:'0.30',
		fyJDWallet:'0.30',
		fyQQWallet:'0.30',
		sxfweChatRate:'0.30',
		sxfaliRate:'0.30',
		sxfUnionPayRate:'0.30',
		sxfJDWallet:'0.30',
		sxfQQWallet:'0.30',
		gfAliRate:'0.30',
		gfWeChatRate:'0.30',
		lsUnionPayRatetwo:'0.30',
		sxfUnionPayRatetwo:'0.30',
		fyUnionPayRatetwo:'0.30',
		XdlUnionPayRatetwo:'0.30',
		lsweChatRate:'0.30',
		lsaliRate:'0.30',
		lsUnionPayRate:'0.30',
		lsJDWallet:'0.30',
		lsQQWallet:'0.30',
		lsWingPayRate:'0.30',
		sxfWingPayRate:'0.30',
		fyWingPayRate:'0.30',
		xdlWingPayRate:'0.30',
	},
	rateInput:function(e){
		switch (e.currentTarget.dataset.type) {
			//官方支付宝
			case 'gfAliRate':
				this.setData({
					gfAliRate:e.detail.value
				})
				break;
			//官方微信
			case 'gfWeChatRate':
				this.setData({
					gfWeChatRate: e.detail.value
				})
				break;
			//富友
			case 'fyweChatRate':
				this.setData({
					fyweChatRate: e.detail.value
				})
				break;
			case 'fyaliRate':
				this.setData({
					fyaliRate: e.detail.value
				})
				break;
			case 'fyUnionPayRate':
				this.setData({
					fyUnionPayRate: e.detail.value
				})
				break;
			case 'fyUnionPayRatetwo':
				this.setData({
					fyUnionPayRatetwo: e.detail.value
				})
				break;
			//新大陆通道
			case 'xdlweChatRate':
				this.setData({
					xdlweChatRate: e.detail.value
				})
				break;
			case 'xdlaliRate':
				this.setData({
					xdlaliRate: e.detail.value
				})
				break;
			case 'xdlUnionPayRate':
				this.setData({
					xdlUnionPayRate: e.detail.value
				})
				break;
			case 'XdlUnionPayRatetwo':
				this.setData({
					XdlUnionPayRatetwo: e.detail.value
				})
				break;
			//随行付通道
			case 'sxfweChatRate':
				this.setData({
					sxfweChatRate: e.detail.value
				})
				break;
			case 'sxfaliRate':
				this.setData({
					sxfaliRate: e.detail.value
				})
				break;
			case 'sxfUnionPayRate':
				this.setData({
					sxfUnionPayRate: e.detail.value
				})
				break;
			case 'sxfUnionPayRatetwo':
				this.setData({
					sxfUnionPayRatetwo: e.detail.value
				})
				break;
			default:
				wx.showToast({
					title: '输入出错，请返回重试',
					icon:'none'
				})
		} 
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			info:JSON.parse(options.info)
		})
		this.getData()
	},		

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},
	getData:function(){
		wx.showLoading({
			title: '加载中...',
		})
		var nOData = new Object()
		nOData.agentNumber = this.data.info.agentNumber
		var that = this
		wx.request({
			url: this.data.server + common.getAgentRate, //仅为示例，并非真实的接口地址
			data: nOData,
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			method: 'POST',
			success: function (res) {
				wx.hideLoading()
				console.log(res)
				if (res.data.code == 1000) {
					var dataList = res.data.data
					if(dataList == null){
						wx.showToast({
							title: '查询费率失败，请联系管理员',
							icon:'none'
						})
						return 
					}
					for (var i = 0; i < dataList.length;i++){
						if(dataList[i].paymentChanneltype == 0){
							that.setData({
								gfAliRate: (dataList[i].rate*100).toFixed(2)
							})
						}
						if (dataList[i].paymentChanneltype == 1) {
							that.setData({
								gfWeChatRate: (dataList[i].rate * 100).toFixed(2)
							})
						}
						if (dataList[i].paymentChanneltype == 2) {
							switch (dataList[i].onePaymentTypeINT) {
								case 0:
									that.setData({
										fyaliRate: (dataList[i].rate * 100).toFixed(2)
									})
									break;
								case 1:
									that.setData({
										fyweChatRate: (dataList[i].rate * 100).toFixed(2)
									})
									break;
								case 3:
									that.setData({
										fyUnionPayRate: (dataList[i].rate * 100).toFixed(2)
									})
									that.setData({
										fyUnionPayRatetwo: (dataList[i].ysfrate * 100).toFixed(2)
									})
									break;
							}
						}
						
						if (dataList[i].paymentChanneltype == 4) {
							switch (dataList[i].onePaymentTypeINT) {
								case 0:
									that.setData({
										xdlaliRate: (dataList[i].rate * 100).toFixed(2)
									})
									break;
								case 1:
									that.setData({
										xdlweChatRate: (dataList[i].rate * 100).toFixed(2)
									})
									break;
								case 3:
									that.setData({
										xdlUnionPayRate: (dataList[i].rate * 100).toFixed(2)
									})
									that.setData({
										XdlUnionPayRatetwo: (dataList[i].ysfrate * 100).toFixed(2)
									})
									break;
							}
						}
						if (dataList[i].paymentChanneltype == 5) {
							switch (dataList[i].onePaymentTypeINT) {
								case 0:
									that.setData({
										sxfaliRate: (dataList[i].rate * 100).toFixed(2)
									})
									break;
								case 1:
									that.setData({
										sxfweChatRate: (dataList[i].rate * 100).toFixed(2)
									})
									break;
								case 3:
									that.setData({
										sxfUnionPayRate: (dataList[i].rate * 100).toFixed(2)
									})
									that.setData({
										sxfUnionPayRatetwo: (dataList[i].ysfrate * 100).toFixed(2)
									})
									break;
							}
						}
					}
				} else {

					wx.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				}
			}
		})

	},
	sub:function(){
		wx.showLoading({
			title: '加载中...',
		})
		var nOData = new Object()
		nOData.institutionNumber = wx.getStorageSync('shopInfo').institutionNumber,
		nOData.deletionFlag = '0'
		nOData.agentNumber = this.data.info.agentNumber
		nOData.agentLevel = this.data.info.agentLevel
		nOData.pAgentNumber = wx.getStorageSync('shopInfo').Number
		nOData.pAgentLevel = wx.getStorageSync('shopInfo').agentLevel
		nOData.xdlaliRate = (this.data.xdlaliRate/10000*100).toFixed(4)
		nOData.xdlweChatRate = (this.data.xdlweChatRate/10000*100).toFixed(4)
		nOData.xdlUnionPayRate = (this.data.xdlUnionPayRate/10000*100).toFixed(4)
		nOData.xdlJDWallet = (this.data.xdlJDWallet/10000*100).toFixed(4)
		nOData.xdlQQWallet = (this.data.xdlQQWallet/10000*100).toFixed(4)
		nOData.fyweChatRate = (this.data.fyweChatRate/10000*100).toFixed(4)
		nOData.fyaliRate = (this.data.fyaliRate/10000*100).toFixed(4)
		nOData.fyUnionPayRate = (this.data.fyUnionPayRate/10000*100).toFixed(4)
		nOData.fyJDWallet = (this.data.fyJDWallet/10000*100).toFixed(4)
		nOData.fyQQWallet = (this.data.fyQQWallet/10000*100).toFixed(4)
		nOData.sxfweChatRate = (this.data.sxfweChatRate/10000*100).toFixed(4)
		nOData.sxfaliRate = (this.data.sxfaliRate/10000*100).toFixed(4)
		nOData.sxfUnionPayRate = (this.data.sxfUnionPayRate/10000*100).toFixed(4)
		nOData.sxfJDWallet = (this.data.sxfJDWallet/10000*100).toFixed(4)
		nOData.sxfQQWallet = (this.data.sxfQQWallet/10000*100).toFixed(4)
		nOData.gfAliRate = (this.data.gfAliRate/10000*100).toFixed(4)
		nOData.gfWeChatRate = (this.data.gfWeChatRate/10000*100).toFixed(4)
		nOData.lsUnionPayRatetwo = (this.data.lsUnionPayRatetwo/10000*100).toFixed(4)
		nOData.sxfUnionPayRatetwo = (this.data.sxfUnionPayRatetwo/10000*100).toFixed(4)
		nOData.fyUnionPayRatetwo = (this.data.fyUnionPayRatetwo/10000*100).toFixed(4)
		nOData.XdlUnionPayRatetwo = (this.data.XdlUnionPayRatetwo/10000*100).toFixed(4)
		nOData.lsweChatRate = (this.data.lsweChatRate/10000*100).toFixed(4)
		nOData.lsaliRate = (this.data.lsaliRate/10000*100).toFixed(4)
		nOData.lsUnionPayRate = (this.data.lsUnionPayRate/10000*100).toFixed(4)
		nOData.lsJDWallet = (this.data.lsJDWallet/10000*100).toFixed(4)
		nOData.lsQQWallet = (this.data.lsQQWallet/10000*100).toFixed(4)
		nOData.lsWingPayRate = (this.data.lsWingPayRate/10000*100).toFixed(4)
		nOData.sxfWingPayRate = (this.data.sxfWingPayRate/10000*100).toFixed(4)
		nOData.fyWingPayRate = (this.data.fyWingPayRate/10000*100).toFixed(4)
		nOData.xdlWingPayRate = (this.data.xdlWingPayRate/10000*100).toFixed(4)
		var that = this	
		wx.request({
			url: this.data.server + common.updataAgentRate, //仅为示例，并非真实的接口地址
			data: nOData,
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			method: 'POST',
			success: function (res) {
				wx.hideLoading()
				console.log(res)
				if (res.data.code == 1000) {
					wx.showToast({
						title:res.data.msg,
						icon:'none'
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
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})