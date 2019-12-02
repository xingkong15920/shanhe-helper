// pages/dl-merchant/index.js
const config = require('../../utils/config1.js')
const common = require('../../utils/common-dl.js').CmsConfig
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		server:config.server,
		merType:'',
		merchantList:[],
		status:0,
		page:1,
		limit:20
	},
	choose:function(e){
		this.setData({
			merType:e.target.dataset.type,
			page:1
		})
		this.getData()
	},
	lower:function(){
		console.log(this.data.page)
		console.log(Math.round(this.data.count / this.data.limit))
		console.log(this.data.page >= Math.ceil(this.data.count / this.data.limit))
		if(this.data.page >= Math.ceil(this.data.count/this.data.limit)){
			// wx.showToast({
			// 	title:'没有更多商户了',
			// 	icon:'none'
			// })
			return
		}
		this.setData({
			page:this.data.page+1
		})
		console.log(this.data.page)
		this.getData()
	},
	search:function(){
		wx.navigateTo({
			url: '../dl-searchMerchant/index',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	getData:function(){
		wx.showLoading({
			title: '加载中...',
		})
		var nOData = new Object()
		nOData.agentNumber = wx.getStorageSync('shopInfo').Number
		nOData.institutionNumber = wx.getStorageSync('shopInfo').institutionNumber
		nOData.merchantName = ''
		nOData.saleName =''
		nOData.merchantType = this.data.merType
		nOData.merchantStatus = ''
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
				if(res.data.code == 1000){
					
					if(res.data.data == null){
						that.setData({
							merchantList: [],
							count: 0,
							page: 1
						})
						wx.showToast({
							title: '暂无数据',
							icon: 'none'
						})
						return
					}
					if(that.data.page == 1){
						that.setData({
							merchantList: res.data.data.agentmerchants,
							count:res.data.data.count
						})
					}else{
						that.setData({
							merchantList: that.data.merchantList.concat(res.data.data.agentmerchants),
							count: res.data.data.count
						})
					}
					
				}else{
					
					that.setData({
						merchantList: [],
						count: 0,
						page:1
					})
					wx.showToast({
						title: '暂无数据',
						icon: 'none'
					})
					return
				}
			}
		})
	},
	onLoad: function (options) {
		console.log(wx.getStorageSync('shopInfo'))
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