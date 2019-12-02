// pages/dl-tixian/index.js
const config = require('../../utils/config1.js')
const common = require('../../utils/common-dl.js').CmsConfig
Page({

    /**
     * 页面的初始数据
     */
	data: {
		server: config.server,
		tixianList: [],
		tixian: false,
		status: 0,
		page: 1,
		limit: 20
	},
	lower: function () {
		console.log(this.data.page)
		console.log(Math.round(this.data.count / this.data.limit))
		console.log(this.data.page >= Math.ceil(this.data.count / this.data.limit))
		if (this.data.page >= Math.ceil(this.data.count / this.data.limit)) {
			// wx.showToast({
			// 	title:'没有更多商户了',
			// 	icon:'none'
			// })
			return
		}
		this.setData({
			page: this.data.page + 1
		})
		console.log(this.data.page)
		this.getData()
	},
	getData: function () {
		wx.showLoading({
			title: '加载中...',
		})
		var nOData = new Object()
		nOData.agentNumber = wx.getStorageSync('shopInfo').Number

		nOData.page = this.data.page
		nOData.limit = this.data.limit
		var that = this
		wx.request({
			url: this.data.server + common.getAgentWithdrawCash, //仅为示例，并非真实的接口地址
			data: nOData,
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			method: 'POST',
			success: function (res) {
				wx.hideLoading()
				console.log(res)
				if (res.data.code == 1000) {
					for (let i = 0; i < res.data.data.data.length; i++) {
						res.data.data.data[i].date = res.data.data.data[i].insertTime.split(' ')[0]
						res.data.data.data[i].time = res.data.data.data[i].insertTime.split(' ')[1]
						if (res.data.data.data[i].orderType == 0) {
							res.data.data.data[i].type1 = '审核中'
						}
						if (res.data.data.data[i].orderType == 1) {
							res.data.data.data[i].type1 = '已审核'
						}
						if (res.data.data.data[i].orderType == -1) {
							res.data.data.data[i].type1 = '已拒绝'
						}
					}
					if (that.data.page == 1) {
						that.setData({
							tixianList: res.data.data.data,
							count: res.data.data.count
						})
					} else {
						that.setData({
							tixianList: that.data.tixianList.concat(res.data.data.data),
							count: res.data.data.count
						})
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
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getData()
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