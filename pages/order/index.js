// pages/order/index.js
const config = require('../../utils/config1.js')
const common = require('../../utils/common-dl.js').CmsConfig

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		server:config.server,
		orderData:[],
		page: 1,
		limit: 20,
		transactionAmount:'0',
		count:'0',
		shopPoundage:'0',
		refundAmount:'0',
		startTime:"",
		endTime:"",
		tel:'',
		name:''	
	},
	//扫码
	scanCode:function(){
		var that = this
		wx.scanCode({
			onlyFromCamera:'',
			success:function(e){
				console.log(e)
				// that.setData({
				// 	searchInput:e.result
				// })
				wx.navigateTo({
					url: '../order-list/index?order=' + e.result + '&startTime=' + that.data.sanTime + '&endTime=' + that.data.endTime + '&merchantName='+'',
				})
			}
		})
	},
	sub:function(){
		wx.navigateTo({
			url: '../order-list/index?order=' + this.data.tel + '&startTime=' + this.data.sanTime + '&endTime=' + this.data.endTime + '&merchantName=' + this.data.name ,
		})
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
	chooseTime:function(){
		wx.navigateTo({
			url: '../order-search/index?order=' + '' + '&merchantName=' + '',
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
		nOData.agentLevel = wx.getStorageSync('shopInfo').agentLevel
		nOData.batch = ""
		nOData.shopName = ""
		nOData.startTime = this.data.startTime +  " 00:00:00"
		nOData.endTime = this.data.endTime +" 23:59:59"
		nOData.oneTransactionType = ""
		nOData.orderState = "10"

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
							merchantList: [],
							count: 0
						})
						wx.showToast({
							title: '暂无数据',
							icon: 'none'
						})
						return
					}
					that.setData({
						transactionAmount:res.data.data.agentOrderList.transactionAmount,
						count:res.data.data.agentOrderList.count,
						shopPoundage:res.data.data.agentOrderList.shopPoundage,
						refundAmount:res.data.data.agentOrderList.refundAmount,
					})
					var orderList = res.data.data.transactionReceiptShareProfitList
						
						for(let i = 0 ; i < orderList.length;i++){
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

					wx.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				}
			}
		})
	},
	checkAll:function(){
		wx.navigateTo({
			url: '../order-list/index?order=' + '' + '&startTime=' + this.data.startTime + '&endTime=' + this.data.endTime + '&merchantName=' + '',
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
		//三个月前
		var myDate = new Date();
		var sanTime = new Date(myDate - 1000*60*60*24*90)
		console.log(sanTime)
		var sanY = sanTime.getFullYear()
		var sanM = (sanTime.getMonth() + 1 < 10 ? '0' + (sanTime.getMonth() + 1) : sanTime.getMonth() + 1);
		var sanD = sanTime.getDate() < 10 ? '0' + sanTime.getDate() : sanTime.getDate()
		this.setData({
			startTime:Y + '-' + M + '-' + '01',
			endTime: Y + '-' + M + '-' + D,
			sanTime:sanY + '-' + sanM + '-' + sanD
		})
		
	},
	check: function (e) {
		console.log(e)
		wx.navigateTo({
			url: '../order-detail/index?info=' + JSON.stringify(this.data.orderData[e.currentTarget.dataset.id]),
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},
	stringC:function(data) {
		if (data.length > 6) {
			return data.substring(0, 6) + '..'
		} else {
			return data
		}
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