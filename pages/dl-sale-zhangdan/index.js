// pages/dl-zhangdan/index.js
const config = require('../../utils/config1.js')
const common = require('../../utils/common-dl.js').CmsConfig
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		server: config.server,
		type: 0,
		saleList: [],
		status: 0,
		page: 1,
		limit: 20,
		startTime: '',
		endTime: '',
		periodType: 0
	},
	checkType:function(e){
		this.setData({
			type:e.currentTarget.dataset.type
		})
		if (e.currentTarget.dataset.type != 3) {
			this.setData({
				periodType: e.currentTarget.dataset.type,
				page: 1
			})

			this.getData()
		}
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
		nOData.startTime = this.data.startTime + ' 00:00:00'
		nOData.endTime = this.data.endTime + ' 23:59:59'
		nOData.saleName = ''
		nOData.billType = this.data.periodType
		nOData.page = this.data.page
		nOData.limit = this.data.limit
		var that = this
		wx.request({
			url: this.data.server + common.getSaleBillList, //仅为示例，并非真实的接口地址
			data: nOData,
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			method: 'POST',
			success: function (res) {
				wx.hideLoading()
				console.log(res)
				
				if (res.data.code == 1000) {
					if (res.data.data == null) {
						wx.showToast({
							title: '暂无数据',
							icon: 'none'
						})
						that.setData({
							saleList: [],
							count: 0
						})
						return
					}
					
					if (that.data.page == 1) {

						that.setData({
							saleList: res.data.data.bills,
							count: res.data.data.count
						})
					} else {
						that.setData({
							saleList: that.data.saleList.concat(res.data.data.bills),
							count: res.data.data.count
						})
					}

				} else {
					wx.showToast({
						title: res.data.msg,
						icon:'none'
					})
				}
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var timestamp = Date.parse(new Date());
		var date = new Date(timestamp);
		//获取年份  
		var Y = date.getFullYear();
		//获取月份  
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
		//获取当日日期 
		var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		this.setData({
			startTime: Y + '-' + M + '-' + '01',
			endTime: Y + '-' + M + '-' + D
		})
		
	},
	chooseTime: function () {
		wx.navigateTo({
			url: '../dl-sale-zhangdan-search/index',
		})
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
		this.getData()
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