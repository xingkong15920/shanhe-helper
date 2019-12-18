// pages/dl-detail/index.js
const config = require('../../utils/config1.js')
const common = require('../../utils/common-dl.js').CmsConfig
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		server:config.server,
		infoList:[],
			changeRate:false,
			changePass:false,
			rate:'',
			pass:'',
			repass:''
	},
	rate:function(){
		this.setData({
			changeRate:!this.data.changeRate
		})
	},
	pass: function () {
		this.setData({
			changePass: !this.data.changePass
		})
	},
	hide:function(e){
		console.log(e.target)
		if(e.target.dataset.hide == 'no'){
			this.setData({
				changeRate:false,
				changePass:false
			})
		}
		
	},
	// noClick: function (e) {
	// 	console.log(e)
	// 	if (e.target.dataset.isl != undefined) {
	// 		return
	// 	}

	// 	this.setData({
	// 		chooseData: false,
	// 	})
	// },
	//修改状态
	switch1Change:function(e){
		var addData = new Object()
		addData.saleNumber = this.data.saleInfo.saleNumber
		addData.state = e.detail.value ? '0' : '1';
		addData.institutionNumber = wx.getStorageSync('shopInfo').institutionNumber
		addData.agentNumber = wx.getStorageSync('shopInfo').Number
		var that = this
		wx.request({
			url: this.data.server + common.delSaleType, //仅为示例，并非真实的接口地址
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
					var infoList = that.data.infoList
					infoList[3].onOff = addData.state == 0 ? true:false
					that.setData({
						infoList:infoList
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
	rateInput:function(e){
		this.setData({
			rate:e.detail.value
		})
	},
	pass1: function (e) {
		this.setData({
			pass: e.detail.value
		})
	},
	repass:function(e){
		this.setData({
			repass: e.detail.value
		})
	},
	changeRate:function(e){
		if(this.data.rate == ''){
			wx.showToast({
				title: '请输入费率',
				icon: 'none'
			})
			return
		}
		var addData = new Object()
		addData.saleName = this.data.saleInfo.saleName
		addData.registerCell = this.data.saleInfo.registerCell
		addData.saleNumber = this.data.saleInfo.saleNumber
		addData.proportion = (this.data.rate.replace('%','') / 100).toFixed(4)
		addData.institutionNumber = wx.getStorageSync('shopInfo').institutionNumber
		var that = this
		wx.request({
			url: this.data.server + common.updateSale, //仅为示例，并非真实的接口地址
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
					var infoList = that.data.infoList
					infoList[2].value = (addData.proportion*100).toFixed(2) + '%'
					var saleInfo = that.data.saleInfo
					saleInfo.proportion = (addData.proportion * 100).toFixed(2)
					that.setData({
						changeRate: !that.data.changeRate,
						infoList: infoList,
						saleInfo: saleInfo,
						rate:''
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
	changePass:function(e){
		if(this.data.pass.length < 6 || this.data.pass.length >12){
			wx.showToast({
				title: '密码为6-12位',
				icon: 'none'
			})
			return
		}
		if(this.data.repass == ''){
			wx.showToast({
				title: '请重复输入密码',
				icon: 'none'
			})
			return
		}
		if(this.data.pass != this.data.repass){
			wx.showToast({
				title:'两次密码不相同',
				icon:'none'
			})
			return 
		}
		var addData = new Object()
		addData.saleNumber = this.data.saleInfo.saleNumber
		addData.passWord = this.data.repass
		addData.institutionNumber = wx.getStorageSync('shopInfo').institutionNumber
		var that = this
		wx.request({
			url: this.data.server + common.updateSale, //仅为示例，并非真实的接口地址
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
		da.proportion = (da.proportion*100).toFixed(2)
		console.log(da)
		var no = [{
			key: '姓名',
			value: da.saleName,
			type: 1
			}, {
				key: '联系电话',
				value: da.registerCell,
				type: 1
				}, {
					key: '支付宝费率',
					value: (da.aliRate *100).toFixed(2) + '%',
					type: 1
			}, {
				key: '微信费率',
				value: (da.weChatRate * 100).toFixed(2) + '%',
				type: 1
			}, {
				key: '云闪付费率1',
				value: (da.unionPayRate * 100).toFixed(2) + '%',
				type: 1
			}, {
				key: '云闪付费率2',
				value: (da.unionPayRatetwo * 100).toFixed(2) + '%',
				type: 1
			}, {
					key: '状态',
					value: '',
					type: 2,
					onOff:da.state==0?true:false
				}]
		this.setData({
			infoList:no,
			saleInfo:da
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