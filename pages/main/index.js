// pages/main/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		changeRate:false,
		changePass:false,
		name:'',
		tel:'',
		pass: '',
		repass: ''
	},
	qiehuan: function () {
		this.setData({
			changeRate: !this.data.changeRate
		})
	},
	pass: function () {
		this.setData({
			changePass: !this.data.changePass
		})
	},
	hide: function (e) {
		console.log(e)
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
	changeType:function(){
		wx.showModal({
			title: '',
			content: '是否确认切换为销售登录',
			showCancel: true,//是否显示取消按钮
			cancelText: "取消",//默认是“取消”
			cancelColor: '#333333',//取消文字的颜色
			confirmText: "切换",//默认是“确定”
			confirmColor: '#EB4B3E',//确定文字的颜色
			success: function (res) {
				if (res.cancel) {
					//点击取消,默认隐藏弹框
				} else {
					//点击确定
					wx.reLaunch({
						url: '../login/index?login=1&type=sale&tel=' + wx.getStorageSync('shopInfo').login
					})
				}
			}
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
		addData.agentNumber = wx.getStorageSync('shopInfo').Number
		addData.institutionNumber = wx.getStorageSync('shopInfo').institutionNumber
		addData.passWord = this.data.repass
		var that = this
		wx.request({
			url: 'https://nb.51shanhe.com/shanhe-admin/insAgent/updateAgentPassWord', //仅为示例，并非真实的接口地址
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
	tuichu:function(){
		wx.showModal({
			title: '',
			content: '是否确认退出当前登录',
			showCancel: true,//是否显示取消按钮
			cancelText: "否",//默认是“取消”
			cancelColor: 'black',//取消文字的颜色
			confirmText: "是",//默认是“确定”
			confirmColor: 'red',//确定文字的颜色
			success: function (res) {
				if (res.cancel) {
					//点击取消,默认隐藏弹框
				} else {
					//点击确定
					wx.reLaunch({
						url: '../login/index',
					})
				}
			},
			fail: function (res) { },//接口调用失败的回调函数
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var tList = ['全国服务商','省级服务商','市级服务商','城市合伙人']
		this.setData({
			yue:wx.getStorageSync('dlMoney').yue,
			yitixian: wx.getStorageSync('dlMoney').yitixian,
			name:wx.getStorageSync('shopInfo').agentName,
			tel:wx.getStorageSync('shopInfo').login,
			level: tList[wx.getStorageSync('shopInfo').agentType]
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