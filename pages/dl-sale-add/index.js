// pages/dl-sale-add/index.js
const config = require('../../utils/config1.js')
const common = require('../../utils/common-dl.js').CmsConfig
Page({

    /**
     * 页面的初始数据
     */
    data: {
        server: config.server,
        saleList: [{
                name: '姓名',
                pla: '请填写姓名',
                type: 'text',
                key: 'name',
			value: '',
			class: 'btn'
            },
            {
                name: '联系电话',
                pla: '请填写电话，用来销售登录',
                type: 'text',
				key: 'tel',
				value: '',
				class:'btn'
            },
            {
                name: '密码',
                pla: '请设置密码',
                type: 'password',
				key: 'pass',
				value: '',
				class: 'btn-hide'
            },
            {
                name: '确认密码',
                pla: '请再次输入密码',
                type: 'password',
				key: 'repass',
				value: '',
				class: 'btn-hide'
            },
            {
                name: '支付宝费率(%)',
                pla: '请填写费率,示例0.45%',
                type: 'text',
				key: 'aliRate',
				value: '',
				class: 'btn'
			},
			{
				name: '微信费率(%)',
				pla: '请填写费率,示例0.45%',
				type: 'text',
				key: 'weChatRate',
				value: '',
				class: 'btn'
			},
			{
				name: '云闪付费率1(%)',
				pla: '单笔1000以内包括1000',
				type: 'text',
				key: 'unionPayRate',
				value: '',
				class: 'btn'
			},
			{
				name: '云闪付费率2(%)',
				pla: '单笔1000以上',
				type: 'text',
				key: 'unionPayRatetwo',
				value: '',
				class: 'btn'
			},
        ],
		tel:'',
		name:'',
		pass:'',
		repass:'',
		rate:'',
		passHide:true,
		repassHide: true,
    },
	clickH:function(e){
		var saleList = this.data.saleList
		if(e.target.dataset.id == 'name'){
			saleList[0].value = e.detail.value
			this.setData({
				name:'',
				saleList: saleList
			})
		}
		if (e.target.dataset.id == 'tel') {
			saleList[1].value = e.detail.value
			this.setData({
				tel: '',
				saleList: saleList
			})
		}
		if (e.target.dataset.id == 'pass') {
			if (this.data.passHide == true){
				saleList[2].type = 'text'
				saleList[2].class = 'btn-show'
			}else{
				saleList[2].type = 'password'
				saleList[2].class = 'btn-hide'
			}
			
			this.setData({
				saleList: saleList,
				passHide:!this.data.passHide
			})
		}
		if (e.target.dataset.id == 'repass') {
			if (this.data.repassHide == true) {
				saleList[3].type = 'text'
				saleList[3].class = 'btn-show'
			} else {
				saleList[3].type = 'password'
				saleList[3].class = 'btn-hide'
			}

			this.setData({
				saleList: saleList,
				repassHide: !this.data.repassHide
			})
		}
		if (e.target.dataset.id == 'aliRate') {
			saleList[4].value = e.detail.value
			this.setData({
				aliRate: '',
				saleList: saleList
			})
		}
		if (e.target.dataset.id == 'weChatRate') {
			saleList[5].value = e.detail.value
			this.setData({
				weChatRate: '',
				saleList: saleList
			})
		}
		if (e.target.dataset.id == 'unionPayRate') {
			saleList[6].value = e.detail.value
			this.setData({
				unionPayRate: '',
				saleList: saleList
			})
		}
		if (e.target.dataset.id == 'unionPayRatetwo') {
			saleList[7].value = e.detail.value
			this.setData({
				unionPayRatetwo: '',
				saleList: saleList
			})
		}
		aliRate
		weChatRate
		unionPayRate
		unionPayRatetwo
	},
    inputChage: function(e) {
        var key = e.currentTarget.dataset.type
		var saleList = this.data.saleList
        switch (key) {
            case 'name':
				saleList[0].value = e.detail.value
                this.setData({
                    name: e.detail.value,
					saleList: saleList
                })
                break;
            case 'tel':
				saleList[1].value = e.detail.value
                this.setData({
                    tel: e.detail.value
                })
                break;
				
            case 'pass':
				saleList[2].value = e.detail.value
                this.setData({
                    pass: e.detail.value
                })
                break;
            case 'repass':
				saleList[3].value = e.detail.value
                this.setData({
                    repass: e.detail.value
                })
                break;
            case 'aliRate':
				saleList[4].value = e.detail.value
                this.setData({
                    aliRate: e.detail.value
                })
                break;
			case 'weChatRate':
				saleList[5].value = e.detail.value
				this.setData({
					weChatRate: e.detail.value
				})
				break;
			case 'unionPayRate':
				saleList[6].value = e.detail.value
				this.setData({
					unionPayRate: e.detail.value
				})
				break;
			case 'unionPayRatetwo':
				saleList[7].value = e.detail.value
				this.setData({
					unionPayRatetwo: e.detail.value
				})
				break;
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    sub: function() {

        wx.showLoading({
            title: '加载中...',
        })
		if(this.data.name == ''){
			wx.showToast({
				title: '请输入销售姓名',
				icon:'none'
			})
			return
		}
		if (this.data.tel == '') {
			wx.showToast({
				title: '请输入联系电话',
				icon: 'none'
			})
			return
		}
		var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
		if (!reg.test(this.data.tel)){
			wx.showToast({
				title: '请输入正确的联系电话',
				icon: 'none'
			})
			return
		}
		if (this.data.pass == '') {
			wx.showToast({
				title: '请输入密码',
				icon: 'none'
			})
			return
		}
		if (this.data.pass.length > 12 || this.data.pass < 6) {
			wx.showToast({
				title: '密码必须为6-12位',
				icon: 'none'
			})
			return
		}
		if(this.data.pass != this.data.repass){
			wx.showToast({
				title: '两次输入的密码不相符',
				icon: 'none'
			})
			return
		}
		if (this.data.aliRate == '' ) {
			wx.showToast({
				title: '请输入支付宝费率',
				icon: 'none'
			})
			return
		}
		if (this.data.weChatRate == '') {
			wx.showToast({
				title: '请输入微信费率',
				icon: 'none'
			})
			return
		}
		if (this.data.unionPayRate == '') {
			wx.showToast({
				title: '请输入云闪付费率1',
				icon: 'none'
			})
			return
		}
		if (this.data.unionPayRatetwo == '') {
			wx.showToast({
				title: '请输入云闪付费率2',
				icon: 'none'
			})
			return
		}
        var nOData = new Object()
        nOData.agentNumber = wx.getStorageSync('shopInfo').Number
        nOData.institutionNumber = wx.getStorageSync('shopInfo').institutionNumber
        nOData.registerCell = this.data.tel
        nOData.saleName = this.data.name
        nOData.passWord = this.data.repass
		nOData.aliRate = (this.data.aliRate/10000*100).toFixed(4)
		nOData.weChatRate = (this.data.weChatRate/10000*100).toFixed(4)
		nOData.unionPayRate = (this.data.unionPayRate/10000*100).toFixed(4)
		nOData.unionPayRatetwo = (this.data.unionPayRatetwo/10000*100).toFixed(4)

        var that = this
        wx.request({
            url: this.data.server + common.addSale, //仅为示例，并非真实的接口地址
            data: nOData,
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function(res) {
                wx.hideLoading()
                console.log(res)
                if (res.data.code == 1000) {
					wx.showModal({
						title: '',
						content: '添加销售成功',
						showCancel: true,//是否显示取消按钮
						cancelText: "继续添加",//默认是“取消”
						cancelColor: 'black',//取消文字的颜色
						confirmText: "确定",//默认是“确定”
						confirmColor: 'black',//确定文字的颜色
						success: function (res) {
							if (res.cancel) {
								var saleList = that.data.saleList
								for(let i = 0 ; i < saleList.length;i++){
									saleList[i].value = ''
								}
								that.setData({
									saleList:saleList
								})
							} else {
								//点击确定
								wx.navigateBack({
									delta: 1
								})
							}
						},
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
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})