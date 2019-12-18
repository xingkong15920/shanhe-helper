// pages/dl-manage/index.js

const config = require('../../utils/config1.js')
const common = require('../../utils/common-dl.js').CmsConfig
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		server: config.server,
		dataList: [],
		status: 0,
		page: 1,
		limit: 20,
		name:'',
		tel:''
	},
	sub: function () {
		this.setData({
			page: 1
		})
		this.getData()
	},
	wxSearchinput: function (e) {
		var reg = new RegExp('^[0-9]*$')
		if (reg.test(e.detail.value)) {
			this.setData({
				name: '',
				tel: e.detail.value
			})
		} else {
			this.setData({
				name: e.detail.value,
				tel: ''
			})
		}
	},
	check: function (e) {
		console.log(e)
		wx.navigateTo({
			url: '../dl-sale-detail/index?info=' + JSON.stringify(this.data.dataList[e.currentTarget.dataset.id]),
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getData()
	},
	
	addSale:function(){
		wx.navigateTo({
			url: '../dl-sale-add/index',
		})
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
		nOData.registerCell = this.data.tel
		nOData.saleName = this.data.name
		nOData.page = this.data.page
		nOData.limit = this.data.limit
		var that = this
		wx.request({
			url: this.data.server + common.getSaleList, //仅为示例，并非真实的接口地址
			data: nOData,
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			method: 'POST',
			success: function (res) {
				wx.hideLoading()
				console.log(res)
				if (res.data.code == 1000) {
					for (let i = 0; i < res.data.data.saleRegisterInfoList.length;i++ ){
						res.data.data.saleRegisterInfoList[i].saleName1 = that.lengthMore(res.data.data.saleRegisterInfoList[i].saleName)
						
					}
					if (that.data.page == 1) {
						that.setData({
							dataList: res.data.data.saleRegisterInfoList,
							count: res.data.data.count
						})
					} else {
						that.setData({
							dataList: that.data.dataList.concat(res.data.data.saleRegisterInfoList),
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
	 * 生命周期函数--监听页面初次渲染完成
	 */
	lengthMore:function(res){
		if(res.length >=6 ){
			return res.substring(0,6) + '...';
		}else{
			return res
		}
	},
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