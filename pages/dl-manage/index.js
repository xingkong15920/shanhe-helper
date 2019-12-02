// pages/dl-manage/index.js
const config = require('../../utils/config1.js')
const common = require('../../utils/common-dl.js').CmsConfig

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		dataList:[],
		server: config.server,
		page: 1,
		limit: 20,
		name:'',
		tel:''
	},
	sub:function(){
		this.setData({
			page:1
		})
		this.getData()
	},
	wxSearchinput:function(e){
		var reg = new RegExp('^[0-9]*$' )
		if(reg.test(e.detail.value)){
			this.setData({
				name: '',
				tel: e.detail.value
			})
		}else{
			this.setData({
				name: e.detail.value,
				tel: ''
			})
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
		nOData.agentName = this.data.name
		nOData.registerCell = this.data.tel
		
		nOData.agentLevel = wx.getStorageSync('shopInfo').agentLevel
		nOData.page = this.data.page
		nOData.limit = this.data.limit
		var that = this
		wx.request({
			url: this.data.server + common.getAgentList, //仅为示例，并非真实的接口地址
			data: nOData,
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			method: 'POST',
			success: function (res) {
				wx.hideLoading()
				console.log(res)
				if (res.data.code == 1000) {
					if(res.data.data == null){
						that.setData({
							dataList:[],
							count:0,
							page:1
						})
						wx.showToast({
							title: '暂无数据',
							icon:'none'
						})
					}
					if (that.data.page == 1) {
						that.setData({
							dataList: res.data.data.list,
							count: res.data.data.count
						})
					} else {
						that.setData({
							dataList: that.data.dataList.concat(res.data.data.list),
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
		this.getData()
	},
	check:function(e){
		console.log(e)
		wx.navigateTo({
			url: '../dl-detail/index?info=' + JSON.stringify(this.data.dataList[e.currentTarget.dataset.id]),
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