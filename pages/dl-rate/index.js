// pages/dl-rate/index.js
const config = require('../../utils/config1.js')
const common = require('../../utils/common-dl.js').CmsConfig

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		server: config.server,
wecharRate:'0',
aliRate:'0',
fuyouRateT1:'0',
fuyouRateD1:'0',
fuyouRateD0:'0',
yrmRateT1:'0',
yrmRateD1:'0',
yrmRateD0:'0',
xdlRateT1:'0',
xdlRateD1:'0',
xdlRateD0:'0',
sxfRateT1:'0',
sxfRateD1:'0',
sxfRateD0:'0',
	},
	rateInput:function(e){
		switch (e.currentTarget.dataset.type) {
			case 'wecharRate':
				this.setData({
					wecharRate:e.detail.value
				})
				break;
			case 'aliRate':
				this.setData({
					aliRate: e.detail.value
				})
				break;
			case 'fuyouRateT1':
				this.setData({
					fuyouRateT1: e.detail.value
				})
				break;
			case 'fuyouRateD1':
				this.setData({
					fuyouRateD1: e.detail.value
				})
				break;
			case 'fuyouRateD0':
				this.setData({
					fuyouRateD0: e.detail.value
				})
				break;
			case 'yrmRateT1':
				this.setData({
					yrmRateT1: e.detail.value
				})
				break;
			case 'yrmRateD1':
				this.setData({
					yrmRateD1: e.detail.value
				})
				break;
			case 'yrmRateD0':
				this.setData({
					yrmRateD0: e.detail.value
				})
				break;
			case 'xdlRateT1':
				this.setData({
					xdlRateT1: e.detail.value
				})
				break;
			case 'xdlRateD1':
				this.setData({
					xdlRateD1: e.detail.value
				})
				break;
			case 'xdlRateD0':
				this.setData({
					xdlRateD0: e.detail.value
				})
				break;
			case 'sxfRateT1':
				this.setData({
					sxfRateT1: e.detail.value
				})
				break;
			case 'sxfRateD1':
				this.setData({
					sxfRateD1: e.detail.value
				})
				break;
			case 'sxfRateD0':
				this.setData({
					sxfRateD0: e.detail.value
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
								aliRate: (dataList[i].rate*100).toFixed(3)
							})
						}
						if (dataList[i].paymentChanneltype == 1) {
							that.setData({
								wecharRate: (dataList[i].rate * 100).toFixed(3)
							})
						}
						if (dataList[i].paymentChanneltype == 2) {
							switch (dataList[i].rateType) {
								case 'D0':
									that.setData({
										fuyouRateD0: (dataList[i].rate * 100).toFixed(3)
									})
									break;
								case 'T1':
									that.setData({
										fuyouRateT1: (dataList[i].rate * 100).toFixed(3)
									})
									break;
								case 'D1':
									that.setData({
										fuyouRateD1: (dataList[i].rate * 100).toFixed(3)
									})
									break;
							}
						}
						if (dataList[i].paymentChanneltype == 3) {
							switch (dataList[i].rateType) {
								case 'D0':
									that.setData({
										yrmRateD0: (dataList[i].rate * 100).toFixed(3)
									})
									break;
								case 'T1':
									that.setData({
										yrmRateT1: (dataList[i].rate * 100).toFixed(3)
									})
									break;
								case 'D1':
									that.setData({
										yrmRateD1: (dataList[i].rate * 100).toFixed(3)
									})
									break;
							}
						}
						if (dataList[i].paymentChanneltype == 4) {
							switch (dataList[i].rateType) {
								case 'D0':
									that.setData({
										xdlRateD0: (dataList[i].rate * 100).toFixed(3)
									})
									break;
								case 'T1':
									that.setData({
										xdlRateT1: (dataList[i].rate * 100).toFixed(3)
									})
									break;
								case 'D1':
									that.setData({
										xdlRateD1: (dataList[i].rate * 100).toFixed(3)
									})
									break;
							}
						}
						if (dataList[i].paymentChanneltype == 5) {
							switch (dataList[i].rateType) {
								case 'D0':
									that.setData({
										sxfRateD0: (dataList[i].rate * 100).toFixed(3)
									})
									break;
								case 'T1':
									that.setData({
										sxfRateT1: (dataList[i].rate * 100).toFixed(3)
									})
									break;
								case 'D1':
									that.setData({
										sxfRateD1: (dataList[i].rate * 100).toFixed(3)
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
		nOData.aliRate = (this.data.aliRate/10000*100).toFixed(5)
		nOData.wecharRate = (this.data.wecharRate/10000*100).toFixed(5)
		nOData.fuyouRateD1 = (this.data.fuyouRateD1/10000*100).toFixed(5)
		nOData.fuyouRateD0 = (this.data.fuyouRateD0/10000*100).toFixed(5)
		nOData.fuyouRateT1 = (this.data.fuyouRateT1/10000*100).toFixed(5)
		nOData.yrmRateD1 = (this.data.yrmRateD1/10000*100).toFixed(5)
		nOData.yrmRateD0 = (this.data.yrmRateD0/10000*100).toFixed(5)
		nOData.yrmRateT1 = (this.data.yrmRateT1/10000*100).toFixed(5)
		nOData.xdlRateD1 = (this.data.xdlRateD1/10000*100).toFixed(5)
		nOData.xdlRateD0 = (this.data.xdlRateD0/10000*100).toFixed(5)
		nOData.xdlRateT1 = (this.data.xdlRateT1/10000*100).toFixed(5)
		nOData.sxfRateD0 = (this.data.sxfRateD0/10000*100).toFixed(5)
		nOData.sxfRateD1 = (this.data.sxfRateD1/10000*100).toFixed(5)
		nOData.sxfRateT1 = (this.data.sxfRateT1/10000*100).toFixed(5)	
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