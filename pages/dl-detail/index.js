// pages/dl-detail/index.js
const config = require('../../utils/config1.js')
const common = require('../../utils/common-dl.js').CmsConfig

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		server: config.server,
		infoList:[],
			changeRate:false,
			changePass:false,
		pass: '',
		repass: ''
	},
	rate:function(){
		this.setData({
			changeRate:!this.data.changeRate
		})
	},
	rateC:function(){
		wx.navigateTo({
			url: '../dl-rate/index?info=' + JSON.stringify(this.data.infoData),
		})
	},
	pass: function () {
		this.setData({
			changePass: !this.data.changePass
		})
	},
	hide: function (e) {
		console.log(e.target)
		if (e.target.dataset.hide == 'no') {
			this.setData({
				changeRate: false,
				changePass: false
			})
		}

	},
	pass1: function (e) {
		this.setData({
			pass: e.detail.value
		})
	},
	repass: function (e) {
		this.setData({
			repass: e.detail.value
		})
	},
	changePass: function (e) {
		if (this.data.pass.length < 6 || this.data.pass.length > 12) {
			wx.showToast({
				title: '密码为6-12位',
				icon: 'none'
			})
			return
		}
		if (this.data.repass == '') {
			wx.showToast({
				title: '请重复输入密码',
				icon: 'none'
			})
			return
		}
		if (this.data.pass != this.data.repass) {
			wx.showToast({
				title: '两次密码不相同',
				icon: 'none'
			})
			return
		}
		var addData = new Object()
		addData.agentNumber = this.data.infoData.agentNumber
		addData.agentLevel = this.data.infoData.agentLevel
		addData.registerCell = this.data.infoData.registerCell
		addData.password = this.data.repass
		addData.agentName = this.data.infoData.agentName
		var that = this
		wx.request({
			url: this.data.server + common.upAgentInfo, //仅为示例，并非真实的接口地址
			data: addData,
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			method: 'POST',
			success: function (res) {
				wx.hideLoading()
				console.log(res)
				if (res.data.code == 1000) {
					wx.showToast({
						title: res.data.msg,
						icon: 'none'
					})
					that.setData({
						changePass: !that.data.changePass
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
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var da = JSON.parse(options.info)
		this.setData({
			infoData:JSON.parse(options.info),
			infoList:[
				{
					key:'代理名称',
					value: da.agentName
				},
				{
					key: '级别',
					value: da.agentLevel
				},
				{
					key: '联系人',
					value: da.userName
				},
				{
					key: '联系电话',
					value: da.registerCell
				},
				{
					key: '区域',
					value: da.address
				},
				{
					key: '添加时间',
					value: da.insertTime
				},
			]
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