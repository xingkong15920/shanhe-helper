// pages/order/index.js
const config = require('../../utils/config1.js')
const common = require('../../utils/common-dl.js').CmsConfig

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		orderType:10,
		server: config.server,
		orderData: [],
		page: 1,
		limit: 20,
		transactionAmount: '0',
		count: '0',
		shopPoundage: '0',
		refundAmount: '0',
		orderNumber:"",
		startTime:'',
		endTime:'',
		tel:'',
		name:''
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
		nOData.agentLevel = wx.getStorageSync('shopInfo').agentLevel
		nOData.batch = this.data.orderNumber
		nOData.shopName = this.data.name
		if(this.data.startTime == ''){
			nOData.startTime = ''
		}else{
			nOData.startTime = this.data.startTime + " 00:00:00"
		}
		if(this.data.endTime == ''){
			nOData.endTime = ''
		}else{
			nOData.endTime = this.data.endTime + " 23:59:59"
		}
		
		
		nOData.oneTransactionType = ""
		nOData.orderState = this.data.orderType

		nOData.page = this.data.page
		nOData.limit = this.data.limit
		var that = this
		wx.request({
			url: this.data.server + common.getAgOrderList, //仅为示例，并非真实的接口地址
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
						that.setData({
							orderData: [],
							count: 0
						})
						wx.showToast({
							title: '暂无数据',
							icon: 'none'
						})
						return
					}
					that.setData({
						transactionAmount: res.data.data.agentOrderList.transactionAmount,
						count: res.data.data.agentOrderList.count,
						shopPoundage: res.data.data.agentOrderList.shopPoundage,
						refundAmount: res.data.data.agentOrderList.refundAmount,
					})
					var orderList = res.data.data.transactionReceiptShareProfitList

					for (let i = 0; i < orderList.length; i++) {
						orderList[i].merchantName1 = that.stringC(orderList[i].merchantName)
					}
					if (that.data.page == 1) {
						
						that.setData({
							orderData: orderList,
							count: res.data.data.count
						})
					} else {
						that.setData({
							orderData: that.data.orderData.concat(orderList),
							count: res.data.data.count
						})
					}

				} else {
					that.setData({
						orderData: [],
						count: 0
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
	choose:function(e){
		this.setData({
			orderType:e.currentTarget.dataset.type
		})
		this.getData()
	},
	check: function (e) {
		console.log(e)
		wx.navigateTo({
			url: '../order-detail/index?info=' + JSON.stringify(this.data.orderData[e.currentTarget.dataset.id]),
		})
	},
	search:function(){
		wx.navigateTo({
			url: '../order-search/index?order=' + '',
		})
	},
	stringC: function (data) {
		if (data.length > 6) {
			return data.substring(0, 6) + '..'
		} else {
			return data
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
		this.setData({
			orderNumber:options.order,
			startTime:options.startTime,
			endTime:options.endTime,
			name:options.merchantName
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