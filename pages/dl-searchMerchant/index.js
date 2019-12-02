// pages/dl-searchMerchant/index.js
const config = require('../../utils/config1.js')
const common = require('../../utils/common-dl.js').CmsConfig
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		server: config.server,
		merType: 0,
		merchantList: [],
		status: 0,
		page: 1,
		limit: 20,
		searchText:''
	},
	lower: function () {

		if (this.data.page <= Math.round(this.data.count / this.data.limit)) {
			// wx.showToast({
			// 	title:'没有更多商户了',
			// 	icon:'none'
			// })
			return
		}
		this.setData({
			page: this.data.page + 1
		})
		this.getData()
	},
	search:function(){
		this.getData()
	},
	wxSearchinput:function(e){
		this.setData({
			searchText:e.detail.value
		})
	},
	getData: function () {
		wx.showLoading({
			title: '加载中...',
		})
		var nOData = new Object()
		nOData.agentNumber = wx.getStorageSync('shopInfo').Number
		nOData.institutionNumber = wx.getStorageSync('shopInfo').institutionNumber
		nOData.merchantName = this.data.searchText
		nOData.saleName = ''
		nOData.merchantStatus = '0'
		nOData.agentName = ''
		nOData.agentLevel = wx.getStorageSync('shopInfo').agentLevel
		nOData.page = this.data.page
		nOData.limit = this.data.limit
		var that = this
		wx.request({
			url: this.data.server + common.getMerchantlist, //仅为示例，并非真实的接口地址
			data: nOData,
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			method: 'POST',
			success: function (res) {
				wx.hideLoading()
				console.log(res)
				if (res.data.code == 1000) {
					if (that.data.page == 1) {
						that.setData({
							merchantList: res.data.data.agentmerchants,
							count: res.data.data.count
						})
					} else {
						that.setData({
							merchantList: that.data.merchantList.concat(res.data.data.agentmerchants),
							count: res.data.data.count
						})
					}

				} else {
					wx.showToast({
						title: res.data.msg
					})
				}
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

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