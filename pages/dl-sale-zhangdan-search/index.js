// pages/dl-zhangdan-search/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	bindDateChange:function(e){
		console.log(e)
		this.setData({
			startTime:e.detail.value
		})
	},
	bindDateChange1: function (e) {
		console.log(e)
		this.setData({
			endTime: e.detail.value
		})
	},
	check: function () {
		if (this.data.startTime == '') {
			wx.showToast({
				title: '请选择开始时间',
				icon: 'none'
			})
			return
		}
		if (this.data.endTime == '') {
			wx.showToast({
				title: '请选择结束时间',
				icon: 'none'
			})
			return
		}

		let pages = getCurrentPages()
		let prevPage = pages[pages.length - 2];
		prevPage.setData({
			startTime: this.data.startTime,
			endTime: this.data.endTime,
			type: 3
		})
		wx.navigateBack({
			delta: 1
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