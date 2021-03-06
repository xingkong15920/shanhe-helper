const app = getApp()
// 接口配置
const config = require('../../../utils/config.js')
const config_p = require('../../../utils/config-public.js')
const config_jg = require('../../../utils/config-organ.js')
const common = require('../../../utils/common.js').CmsConfig
// 行别
const hangbie = require('../../../utils/hangbie.js')

Page({
    data: {
        // 自定导航看高度
        statusBarHeight: app.globalData.statusBarHeight,
        // 滚动高度
        scrollTop: '',
        scrollHeight: '',
        //是否更新
        isUpdata: false,
        // 公共信息
        tdlx: '',
        baiduapi: [],
        // 正则
        reg_hanzi: "^([a-z]|[A-Z]|[0-9]|[\\u4e00-\\u9fa5]){0,20}$",
        reg_id: "^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$",
        reg_cell: "^1[3|4|5|6|7|8|9][0-9]{9}$",
        reg_mail: "^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$",
        reg_busno: "^([0-9]|[A-Z]){0,20}$",
        // 错误信息
        errtips: '',
        errmsg: '',
        // 必要信息
        merNumber: '',
        insNumber: '',
        waRate: '',
        yunRate1: '',
        yunRate2: '',
        // 接口配置
        server: config.server,
        server_p: config_p.server,
        server_jg: config_jg.server,
        pageTit: '',
        accesstoken: '',
        hangbie: hangbie.hangbie,
        //遮罩层
        maskTips: false,
        maskPic: false,
        maskKh: false,
        confirmMSG: false,
        tipsCon: '',
        picCon: '',
        //设置步骤条
        Steps: 0, //当前步数
        StepsList: [{
            name: '商户信息',
            icon1: '../../img/step01.png',
            icon2: '../../img/step02.png',
            icon3: '../../img/step03.png',
        }, {
            name: '结算信息',
            icon1: '../../img/step01.png',
            icon2: '../../img/step02.png',
            icon3: '../../img/step03.png',
        }, {
            name: '图片信息',
            icon1: '../../img/step01.png',
            icon2: '../../img/step02.png',
            icon3: '../../img/step03.png',
        }, {
            name: '费率信息',
            icon1: '../../img/step01.png',
            icon2: '../../img/step02.png',
            icon3: '../../img/step03.png',
        }],
        progress: 90, //步骤横条宽度
        percent: 33, //步骤条进度
        upstepBtn: false, //上一步按钮
        downstepBtn: true, //下一步按钮
        jsbs: ['对私账户', '对公账户', ],
        jstype: 0,
        shtype: 0, //商户类型  0-个人   1-个体  2-企业
        mailTips: ['@qq.com', '@163.com', '@126.com', ],
        mail_active: false,
        input_active: '',
        id_time: false,
        jur_time: false,
        zh_focus: false,
        input_focus: '',
        mailAll: '',
        // 经营范围信息
        jyfw_kj: [{ // 经营范围快捷信息
                mccnum: [5, 2, 23],
                mccTypeNm: '便利店',
            },
            {
                mccnum: [3, 3, 0],
                mccTypeNm: '家用电器',
            },
            {
                mccnum: [5, 0, 0],
                mccTypeNm: '百货商店',
            },
            {
                mccnum: [5, 2, 19],
                mccTypeNm: '五金商店',
            },
            {
                mccnum: [0, 0, 0],
                mccTypeNm: '酒店',
            },
            {
                mccnum: [5, 2, 54],
                mccTypeNm: '药店',
            },
            {
                mccnum: [0, 3, 3],
                mccTypeNm: '美容SPA',
            },
            {
                mccnum: [3, 7, 0],
                mccTypeNm: '加油站',
            },
        ],
        jyfw_kj_a: 0,
        jyfwArray: [],
        jyfwIndex: [5, 2, 23],
        jyfwOnly: [
            [],
            [],
            [],
        ],
        jyfwCode: [
            [],
            [],
            [],
        ],
        // 省市区信息
        shqArray: [],
        shqIndex: [16, 0, 17],
        shqOnly: [
            [],
            [],
            [],
        ],
        shqCode: [
            [],
            [],
            [],
        ],
        khIndex: [16, 0],
        khOnly: [
            [],
            [],
        ],
        yhArray: [0],
        yhIndex: [0],
        yhOnly: [],
        yhCode: [],
        // 支行
        zhlist: [],
        // 收集信息
        shopData: {
            "businessLicense": '../../img/pic1.png',
            "openingPermit": '../../img/pic2.png',
            "juridicalpersonIdPositive": '../../img/pic3.png',
            "juridicalpersonIdReverseside": '../../img/pic4.png',
            "holdId": '../../img/pic5.png',
            "bankCardPositive": '../../img/pic6.png',
            "doorheadPhoto": '../../img/pic7.png',
            "cashier": '../../img/pic8.png',
            "placeBusiness": '../../img/pic9.png',
        },
        ysfswitch: false,
        // 收集信息
    },
    setSteps: function(e) {
        console.log(e.currentTarget.dataset.index)
        this.setData({
            Steps: e.currentTarget.dataset.index
        })
    },
    upStep: function() {
        var that = this;
        that.setData({
            Steps: that.data.Steps - 1
        })
    },
    downStep: function() {
        var that = this,
            input_focus = that.data.input_focus,
            shopData = that.data.shopData,
            shqOnly = that.data.shqOnly,
            shqCode = that.data.shqCode,
            shqIndex = that.data.shqIndex;

        console.log(shopData)

        var reg_hanzi = new RegExp(that.data.reg_hanzi)
        var reg_id = new RegExp(that.data.reg_id)
        var reg_cell = new RegExp(that.data.reg_cell)
        var reg_mail = new RegExp(that.data.reg_mail)
        var reg_busno = new RegExp(that.data.reg_busno)
        switch (that.data.Steps) {
            case 0:
                if (!shopData.merchantName || shopData.merchantName == '') {
                    that.showError('请填写商户名称', 'merchantName')
                    return
                }
                if (!reg_cell.test(shopData.registerCell) || shopData.registerCell == '') {
                    that.showError('请填写正确的注册手机号', 'registerCell')
                    return
                }
                if (!shopData.juridicalpersonName || shopData.juridicalpersonName == '') {
                    that.showError('请填写姓名', 'juridicalpersonName')
                    return
                }
                if (!reg_id.test(shopData.juridicalpersonId) || shopData.juridicalpersonId == '') {
                    that.showError('请填写身份证号', 'juridicalpersonId')
                    return
                }
                if (!shopData.juridicalpersonIdTime || shopData.juridicalpersonIdTime == '') {
                    that.showError('请选择身份证开始时间')
                    return
                }
                if (!that.data.id_time) {
                    if (!shopData.juridicalPersonIDEndTime || shopData.juridicalPersonIDEndTime == '') {
                        that.showError('请选择身份证结束时间')
                        return
                    }
                }
                if (that.data.shtype != 0) {
                    shopData['businessLicenseType'] = 1
                    if (!shopData.businessLicenseName || shopData.businessLicenseName == '') {
                        that.showError('请填写营业执照名称', 'businessLicenseName')
                        return
                    }
                    if (!reg_busno.test(shopData.businessLicenseNo) || shopData.businessLicenseNo == '') {
                        that.showError('请填写身营业执照号', 'businessLicenseNo')
                        return
                    }
                    if (!shopData.businessLicenseAddress || shopData.businessLicenseAddress == '') {
                        that.showError('请填写身营业执照地址', 'businessLicenseAddress')
                        return
                    }
                    if (!shopData.businessLicenseTime || shopData.businessLicenseTime == '') {
                        that.showError('请选择营业执照开始时间')
                        return
                    }
                    if (!that.data.jur_time) {
                        if (!shopData.businessLicenseEndTime || shopData.businessLicenseEndTime == '') {
                            that.showError('请选择营业执照结束时间')
                            return
                        }
                    }
                }
                if (!that.data.jyfwCode) {
                    that.showError('请选择经营范围')
                    return
                }
                if (!that.data.shqCode) {
                    that.showError('请选择省市区')
                    return
                }
                if (!shopData.address || shopData.address == '') {
                    that.showError('请填写详细地址', 'address')
                    return
                }

                shopData['juridicalPersonIDType'] = 1
                shopData['province'] = shqOnly[0][shqIndex[0]]
                shopData['provinceID'] = shqCode[0][shqIndex[0]]
                shopData['city'] = shqOnly[1][shqIndex[1]]
                shopData['cityID'] = shqCode[1][shqIndex[1]]
                shopData['area'] = shqOnly[2][shqIndex[2]]
                shopData['areaID'] = shqCode[2][shqIndex[2]]

                that.setData({
                    shopData: shopData
                })
                break
            case 1:
                if (!shopData.bankCardNo || shopData.bankCardNo == '') {
                    that.showError('请填写/扫描银行卡号', 'bankCardNo')
                    return
                }
                if (!shopData.openingBank || shopData.openingBank == '') {
                    that.showError('请填写/选择开户银行', 'openingBank')
                    return
                }
                if (!shopData.openingBankBranch || shopData.openingBankBranch == '') {
                    that.showError('请选择开户支行', 'openingBankBranch')
                    return
                }
                break
            case 2:
                var shtype = that.data.shtype
                if (shtype != 0 && shopData.businessLicense.indexOf('http') == -1) {
                    that.showError('请上传营业执照照片')
                    return
                }
                if (shtype == 2 && shopData.openingPermit.indexOf('http') == -1) {
                    that.showError('请上传开户许可证照片')
                    return
                }
                if (shopData.juridicalpersonIdPositive.indexOf('http') == -1) {
                    that.showError('请上传身份证正面照片')
                    return
                }
                if (shopData.juridicalpersonIdReverseside.indexOf('http') == -1) {
                    that.showError('请上传身份证反面照片')
                    return
                }
                if (shtype == 0 && shopData.holdId.indexOf('http') == -1) {
                    that.showError('请上传手持身份证照片')
                    return
                }
                if (shtype != 2 && shopData.bankCardPositive.indexOf('http') == -1) {
                    that.showError('请上传银行卡正面照片')
                    return
                }
                if (shopData.doorheadPhoto.indexOf('http') == -1) {
                    that.showError('请上传门头照片')
                    return
                }
                if (shopData.cashier.indexOf('http') == -1) {
                    that.showError('请上传收银台照片')
                    return
                }
                if (shopData.placeBusiness.indexOf('http') == -1) {
                    that.showError('请上传经营场所照片')
                    return
                }
                break
        }

        that.setData({
            Steps: that.data.Steps + 1
        })
    },
    lastStep: function() {
        var that = this,
            shopData = this.data.shopData,
            jyfwCode = this.data.jyfwCode,
            jyfwIndex = this.data.jyfwIndex,
            shqOnly = this.data.shqOnly,
            shqCode = this.data.shqCode,
            shqIndex = this.data.shqIndex;
        var reg_mail = new RegExp(this.data.reg_mail);

        // 默认经营类别
        shopData['oneOperate'] = jyfwCode[0][jyfwIndex[0]]
        shopData['twoOperate'] = jyfwCode[1][jyfwIndex[1]]
        shopData['threeOperate'] = jyfwCode[2][jyfwIndex[2]]
        shopData['operationId'] = jyfwCode[2][jyfwIndex[2]]

        // 默认地区
        shopData['province'] = shqOnly[0][shqIndex[0]]
        shopData['city'] = shqOnly[1][shqIndex[1]]
        shopData['area'] = shqOnly[2][shqIndex[2]]
        shopData['provinceID'] = shqCode[0][shqIndex[0]]
        shopData['cityID'] = shqCode[1][shqIndex[1]]
        shopData['areaID'] = shqCode[2][shqIndex[2]]


        // 判断图片是否是默认图片
        console.log(shopData.businessLicense)
        console.log(shopData.businessLicense.indexOf('../..'))
        console.log(shopData.juridicalpersonIdPositive)
        console.log(shopData.juridicalpersonIdPositive.indexOf('../..'))
        if (shopData.businessLicense.indexOf('../..') > -1) {
            shopData.businessLicense = ''
        }
        if (shopData.openingPermit.indexOf('../..') > -1) {
            shopData.openingPermit = ''
        }
        if (shopData.juridicalpersonIdPositive.indexOf('../..') > -1) {
            shopData.juridicalpersonIdPositive = ''
        }
        if (shopData.juridicalpersonIdReverseside.indexOf('../..') > -1) {
            shopData.juridicalpersonIdReverseside = ''
        }
        if (shopData.holdId.indexOf('../..') > -1) {
            shopData.holdId = ''
        }
        if (shopData.bankCardPositive.indexOf('../..') > -1) {
            shopData.bankCardPositive = ''
        }
        if (shopData.doorheadPhoto.indexOf('../..') > -1) {
            shopData.doorheadPhoto = ''
        }
        if (shopData.cashier.indexOf('../..') > -1) {
            shopData.cashier = ''
        }
        if (shopData.placeBusiness.indexOf('../..') > -1) {
            shopData.placeBusiness = ''
        }

        // 优质商户标识
        shopData['subsidy'] = 1

        // 设置商户信息相同默认值
        shopData['reserveCell'] = shopData.registerCell
        shopData['facePhoto'] = shopData.doorheadPhoto
        shopData['institutionNumber'] = that.data.insNumber
        shopData['agentNumber'] = wx.getStorageSync('saleInfo').agentNumber
        shopData['saleNumber'] = wx.getStorageSync('saleInfo').Number

        // 费率信息页校验
        if (!that.data.waRate || that.data.waRate == '' || isNaN(that.data.waRate)) {
            that.showError('请正确填写支/微费率', 'waRate')
            return
        } else if (parseFloat(that.data.waRate) < parseFloat((wx.getStorageSync('saleInfo').aliRate * 100).toFixed(2))) {
            that.showError('支/微费率不得低于销售费率', 'waRate')
            return
        } else if (parseFloat(that.data.waRate) < 0.20 || parseFloat(that.data.waRate) > 1) {
            that.showError('支/微费率需在0.20 - 1之间', 'waRate')
            return
        }
        if (that.data.ysfswitch) {
            if (!that.data.yunRate1 || that.data.yunRate1 == '' || isNaN(that.data.yunRate1)) {
                that.showError('请选择云闪付1000以下费率', 'yunRate1')
                return
            } else if (parseFloat(that.data.yunRate1) < parseFloat((wx.getStorageSync('saleInfo').cloudRate * 100).toFixed(2))) {
                that.showError('云闪付1000以下费率不得低于销售的云闪付费率', 'yunRate1')
                return
            } else if (parseFloat(that.data.yunRate1) < 0.23 || parseFloat(that.data.yunRate1) > 1) {
                that.showError('云闪付1000以下费率需在0.23 - 1之间', 'yunRate1')
                return
            }
            if (!that.data.yunRate2 || that.data.yunRate2 == '' || isNaN(that.data.yunRate2)) {
                that.showError('请选择云闪付1000以上费率', 'yunRate2')
                return
            } else if (parseFloat(that.data.yunRate2) < parseFloat((wx.getStorageSync('saleInfo').cloudRate2 * 100).toFixed(2))) {
                that.showError('云闪付1000以上费率不得低于销售的云闪付费率', 'yunRate2')
                return
            } else if (parseFloat(that.data.yunRate2) < 0.52 || parseFloat(that.data.yunRate2) > 1) {
                that.showError('云闪付1000以上费率需在0.52 - 1之间', 'yunRate2')
                return
            }
        }

        if (!reg_mail.test(shopData.mailbox)) {
            that.showError('请填写邮箱', 'mailbox')
            return
        }
        if (!shopData.weChatNo || shopData.weChatNo == '') {
            that.showError('请填写微信号', 'weChatNo')
            return
        }
        if (!shopData.aliPayNo || shopData.aliPayNo == '') {
            that.showError('请填写支付宝号', 'aliPayNo')
            return
        }
        // 设置进件通道
        if (that.data.isUpdata != 'true') {
            if (that.data.tdlx == 1) {
                shopData['paymentChannels'] = JSON.stringify(wx.getStorageSync('payment_zl'))
            } else if (that.data.tdlx == 2) {
                shopData['paymentChannels'] = JSON.stringify(wx.getStorageSync('payment_jl'))
            }
        }
        // 清除银行卡号空格
        shopData.bankCardNo = shopData.bankCardNo.replace(/\s/g, "");
        // 设置费率
        shopData['rate'] = (that.data.waRate / 100).toFixed(4)
        if (this.data.ysfswitch) {
            shopData['unionPayRate'] = (that.data.yunRate1 / 100).toFixed(4)
            shopData['unionPayRate2'] = (that.data.yunRate2 / 100).toFixed(4)
        }
        that.setData({
            shopData: shopData,
            confirmMSG: true,
        })
        console.log(that.data.shopData)
    },
    // 提示model
    tipsmodel: function(e) {
        var tipsCon = e.currentTarget.dataset.tips
        var currentStatu = e.currentTarget.dataset.statu;
        this.util(currentStatu)
        this.setData({
            maskTips: true,
            tipsCon: tipsCon,
        })
    },
    // 提示model-关闭
    tipsmodelclose: function(e) {
        this.setData({
            maskTips: false,
        })
    },
    // 信息取消
    onCancel: function() {
        var shopData = this.data.shopData;
        if (!this.data.ysfswitch) {
            this.data.yunRate1 = ''
            this.data.yunRate2 = ''
        }
        shopData.bankCardNo = shopData.bankCardNo.replace(/\s/g, "").replace(/(.{4})/g, "$1 ");
        this.setData({
            confirmMSG: false,
            yunRate1: this.data.yunRate1,
            yunRate2: this.data.yunRate2,
            shopData: shopData,
        })
    },
    // 信息确认
    onConfirm: function() {
        var that = this;
        console.log(that.data.shopData)
        if (that.data.isUpdata == 'true') {
            wx.request({
                url: that.data.server_jg + 'InsMer/updateMerchantOrderInfo',
                method: 'post',
                data: that.data.shopData,
                dataType: 'json',
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                    // 'content-type': 'application/json' // json
                },
                success: function(res) {
                    if (res.data.code == 1000) {
                        wx.showToast({
                            title: '商户信息提交成功!',
                            icon: 'success',
                            duration: 1500,
                            mask: true,
                            success: function() {
                                if (res.cancel) {

                                } else {
                                    setTimeout(function() {
                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    }, 100)
                                }
                            }
                        })

                    } else {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                },
                fail: function(res) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            })
        } else {
            wx.request({
                url: that.data.server_jg + 'InsMer/insertMerchant',
                method: 'post',
                data: that.data.shopData,
                dataType: 'json',
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                    // 'content-type': 'application/json' // json
                },
                success: function(res) {
                    if (res.data.code == 1000) {
                        wx.showToast({
                            title: '商户信息提交成功!',
                            icon: 'success',
                            duration: 1500,
                            mask: true,
                            success: function() {
                                if (res.cancel) {

                                } else {
                                    setTimeout(function() {
                                        wx.navigateBack({
                                            delta: 2
                                        })
                                    }, 100)
                                }
                            }
                        })

                    } else {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                },
                fail: function(res) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            })
        }
    },
    // 图片展示
    picmodel: function(e) {
        console.log(e)
        var picType = e.currentTarget.dataset.pic
        var currentStatu = e.currentTarget.dataset.statu
        var picCon = ''
        this.util(currentStatu)
        switch (parseInt(picType)) {
            case 1:
                picCon = 'http://static.hongxiaosou.com/public/images/shili-yyzz.png'
                break
            case 2:
                picCon = 'http://static.hongxiaosou.com/public/images/shili-kaihuhang.png'
                break
            case 3:
                picCon = 'http://static.hongxiaosou.com/public/images/shili-sfz-z.png'
                break
            case 4:
                picCon = 'http://static.hongxiaosou.com/public/images/shili-sfz-fan.png'
                break
            case 5:
                picCon = 'http://static.hongxiaosou.com/public/images/shili-shouchi.png'
                break
            case 6:
                picCon = 'http://static.hongxiaosou.com/public/images/shili-yinhangka.png'
                break
            case 7:
                picCon = 'http://static.hongxiaosou.com/public/images/shili-mentou.png'
                break
            case 8:
                picCon = 'http://static.hongxiaosou.com/public/images/shili-shouyintai.png'
                break
            case 9:
                picCon = 'http://static.hongxiaosou.com/public/images/shili-diannei.png'
                break
        }
        this.setData({
            maskPic: true,
            picCon: picCon,
        })
    },
    // 图片展示-关闭
    picmodelclose: function(e) {
        this.setData({
            maskPic: false,
        })
    },
    tipsscan: function(e) {
        // console.log(e)
    },
    jstypebtn: function(e) {
        this.setData({
            jstype: e.currentTarget.dataset.type
        })
    },

    // 经营范围快捷选项
    jyfwbtn: function(e) {
        wx.showLoading({
            title: '',
            mask: true,
        })
        this.setData({
            jyfw_kj_a: e.currentTarget.dataset.type,
            jyfwIndex: this.data.jyfw_kj[e.currentTarget.dataset.type].mccnum,
            jyfwArray: [],
            jyfwOnly: [
                [],
                [],
                [],
            ],
            jyfwCode: [
                [],
                [],
                [],
            ],
        })

        this.getjyfw()
    },
    // 经营范围
    jyfwPicker: function(e) {
        var jyfwIndex = this.data.jyfwIndex,
            jyfwCode = this.data.jyfwCode,
            shopData = this.data.shopData;

        shopData['oneOperate'] = jyfwCode[0][jyfwIndex[0]]
        shopData['twoOperate'] = jyfwCode[1][jyfwIndex[1]]
        shopData['threeOperate'] = jyfwCode[2][jyfwIndex[2]]
        shopData['operationId'] = jyfwCode[2][jyfwIndex[2]]

        this.setData({
            jyfwIndex: e.detail.value,
        })
        for (let i = 0; i < this.data.jyfw_kj.length; i++) {
            if (e.detail.value != this.data.jyfw_kj[i].mccnum) {
                this.setData({
                    jyfw_kj_a: 1000,
                })
            }
        }
    },
    // 经营范围滑动
    jyfwChange: function(e) {
        var jyfwArray = this.data.jyfwArray,
            jyfwIndex = this.data.jyfwIndex,
            jyfwOnly = this.data.jyfwOnly,
            jyfwCode = this.data.jyfwCode;

        jyfwIndex[e.detail.column] = e.detail.value;
        // console.log(jyfwOnly);

        var searchColumn = () => {
            for (var i = 0; i < jyfwArray.length; i++) {
                var arr1 = [];
                var arr2 = [];
                var arr1c = [];
                var arr2c = [];
                if (i == jyfwIndex[0]) {
                    for (var j = 0; j < jyfwArray[i].list.length; j++) {
                        arr1.push(jyfwArray[i].list[j].MccTypeNm);
                        arr1c.push(jyfwArray[i].list[j].MccType);
                        if (j == jyfwIndex[1]) {
                            for (var k = 0; k < jyfwArray[i].list[j].ids.length; k++) {
                                arr2.push(jyfwArray[i].list[j].ids[k].MccNm);
                                arr2c.push(jyfwArray[i].list[j].ids[k].MccCd);
                            }
                            jyfwOnly[2] = arr2;
                            jyfwCode[2] = arr2c;
                        }
                    }
                    jyfwOnly[1] = arr1;
                    jyfwCode[1] = arr1c;
                }
            };
        }

        switch (e.detail.column) {
            case 0:
                jyfwIndex[1] = 0;
                jyfwIndex[2] = 0;
                searchColumn();
                break;
            case 1:
                jyfwIndex[2] = 0;
                searchColumn();
                break;
        }
        this.setData({
            jyfwOnly: jyfwOnly,
            jyfwCode: jyfwCode,
            jyfwIndex: jyfwIndex
        });
    },
    // 省市区
    shqPicker: function(e) {
        var shqIndex = this.data.shqIndex,
            shqCode = this.data.shqCode,
            shopData = this.data.shopData,
            shqOnly = this.data.shqOnly;

        shopData['province'] = shqOnly[0][shqIndex[0]]
        shopData['city'] = shqOnly[1][shqIndex[1]]
        shopData['area'] = shqOnly[2][shqIndex[2]]
        shopData['provinceID'] = shqCode[0][shqIndex[0]]
        shopData['cityID'] = shqCode[1][shqIndex[1]]
        shopData['areaID'] = shqCode[2][shqIndex[2]]

        this.setData({
            shqIndex: e.detail.value,
        })
        console.log(this.data.shqIndex)
        console.log([shqCode[0][shqIndex[0]], shqCode[1][shqIndex[1]], shqCode[2][shqIndex[2]]])
    },
    // 省市区滑动
    shqChange: function(e) {
        var shqArray = this.data.shqArray,
            shqIndex = this.data.shqIndex,
            shqOnly = this.data.shqOnly,
            shqCode = this.data.shqCode;

        shqIndex[e.detail.column] = e.detail.value;
        // console.log(shqOnly);

        var searchColumn = () => {
            for (var i = 0; i < shqArray.length; i++) {
                var arr1 = [];
                var arr2 = [];
                var arr1c = [];
                var arr2c = [];
                if (i == shqIndex[0]) {
                    for (var j = 0; j < shqArray[i].cityList.length; j++) {
                        arr1.push(shqArray[i].cityList[j].cityName);
                        arr1c.push(shqArray[i].cityList[j].cityCode);
                        if (j == shqIndex[1]) {
                            for (var k = 0; k < shqArray[i].cityList[j].areaList.length; k++) {
                                arr2.push(shqArray[i].cityList[j].areaList[k].areaName);
                                arr2c.push(shqArray[i].cityList[j].areaList[k].areaCode);
                            }
                            shqOnly[2] = arr2;
                            shqCode[2] = arr2c;
                        }
                    }
                    shqOnly[1] = arr1;
                    shqCode[1] = arr1c;
                }
            };
        }

        switch (e.detail.column) {
            case 0:
                shqIndex[1] = 0;
                shqIndex[2] = 0;
                searchColumn();
                break;
            case 1:
                shqIndex[2] = 0;
                searchColumn();
                break;
        }
        this.setData({
            shqOnly: shqOnly,
            shqCode: shqCode,
            shqIndex: shqIndex
        });
    },
    // 开户行
    yhPicker: function(e) {
        var yhIndex = this.data.yhIndex,
            shopData = this.data.shopData;

        shopData['openingBank'] = this.data.yhOnly[e.detail.value]
        shopData['openingBankID'] = this.data.yhCode[e.detail.value]
        this.setData({
            yhIndex: e.detail.value,
            shopData: shopData
        })
        console.log(this.data.shopData)
    },
    // 开户行地区
    khPicker: function(e) {
        var khIndex = this.data.khIndex;

        this.setData({
            khIndex: e.detail.value,
        })
        console.log(this.data.khOnly[0][this.data.khIndex[0]],
            this.data.khOnly[1][this.data.khIndex[1]])
    },
    // 开户行地区滑动
    khChange: function(e) {
        var shqArray = this.data.shqArray,
            khIndex = this.data.khIndex,
            khOnly = this.data.khOnly;

        khIndex[e.detail.column] = e.detail.value;
        // console.log(khOnly);

        var searchColumn = () => {
            for (var i = 0; i < shqArray.length; i++) {
                var arr1 = [];
                if (i == khIndex[0]) {
                    for (var j = 0; j < shqArray[i].cityList.length; j++) {
                        arr1.push(shqArray[i].cityList[j].cityName);
                    }
                    khOnly[1] = arr1;
                }
            };
        }

        switch (e.detail.column) {
            case 0:
                khIndex[1] = 0;
                khIndex[2] = 0;
                searchColumn();
                break;
            case 1:
                khIndex[2] = 0;
                searchColumn();
                break;
        }
        this.setData({
            khOnly: khOnly,
            khIndex: khIndex
        });
    },
    // 开户支行搜索选择
    searchInput: function() {
        var that = this;
        that.setData({
            maskKh: true,
            zh_focus: true,
        })
    },
    // 开户支行搜索选择
    searczh: function(e) {
        var that = this;
        wx.request({
            url: that.data.server_p + 'cache/getBank',
            method: 'get',
            data: {
                bankCode: that.data.yhCode[that.data.yhIndex].toString(),
                paymentType: 4,
                bankName: e.detail.value || '',
                page: '1',
                limit: '999',
                provNm: that.data.khOnly[0][that.data.khIndex[0]],
                cityNm: that.data.khOnly[1][that.data.khIndex[1]],
            },
            dataType: 'json',
            header: {
                // 'content-type': 'application/x-www-form-urlencoded' // 默认值
                'content-type': 'application/json' // json
            },
            success: function(res) {
                if (res.data.code == 1000) {
                    that.setData({
                        zhlist: res.data.data.selectBank
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            },
            fail: function(res) {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                })
            }
        })
    },
    maskKhgb: function() {
        this.setData({
            maskKh: false,
            zhlist: []
        })
    },
    chooseZh: function(e) {
        var shopData = this.data.shopData
        shopData['openingBankBranch'] = this.data.zhlist[e.currentTarget.dataset.index].lbnkNm
        shopData['openingBankBranchID'] = this.data.zhlist[e.currentTarget.dataset.index].lbnkNo
        this.setData({
            zhlist: [],
            maskKh: false,
            zh_focus: false,
            shopData: shopData
        })
    },

    // 图片选择
    chooseImage: function(e) {
        var that = this
        var shopData = that.data.shopData
        var id = e.target.id
        var type = e.currentTarget.dataset.type
        var code1 = ''
        for (var i = 0; i < 4; i++) {
            code1 += Math.floor(Math.random() * 10)
        }
        var longTime = new Date().getTime() + code1
        let uploadFile = ''

        console.log(type)
        console.log(that.data.insNumber)
        console.log(longTime)

        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res1) {
                var tempFilePaths = res1.tempFilePaths[0];
                wx.compressImage({
                    src: tempFilePaths, // 图片路径
                    quality: 30, // 压缩质量
                    success: function(res2) {
                        console.log(res2)
                        uploadFile = res2.tempFilePath
                        wx.showLoading({
                            title: '正在上传',
                        })
                        wx.uploadFile({
                            url: that.data.server_jg + 'InsMer/uploadMerchantImg',
                            filePath: uploadFile,
                            name: 'file',
                            formData: {
                                type: type,
                                institutionNumber: that.data.insNumber,
                                longTime: longTime
                            },
                            success(res3) {
                                wx.showModal({
                                    title: '',
                                    content: res3,
                                })
                                var res4 = JSON.parse(res3.data)
                                console.log(res4.code)
                                if (res4.code != 1000) {
                                    wx.showToast({
                                        title: res4.msg,
                                        image: '../../img/guanbi.png',
                                        duration: 1000
                                    })
                                    return
                                }
                                wx.showToast({
                                    title: '上传成功',
                                    icon: 'success',
                                    duration: 1000
                                })
                                shopData[e.target.id] = res4.data;
                                that.setData({
                                    shopData: shopData,
                                })
                                console.log(shopData[e.target.id])
                            },
                            fail(e) {
                                // wx.showModal({
                                // 	title: '',
                                // 	content: e,
                                // })
                                wx.showToast({
                                    title: '上传失败',
                                    icon: 'success',
                                    duration: 1000
                                })
                            }
                        })
                    },
                    fail: function(res) {
                        console.log(res)
                    }
                })
            }
        })
    },
    // 识别身份证
    getIdInfo: function(e) {
        var that = this
        var shopData = that.data.shopData
        var code1 = ''
        for (var i = 0; i < 4; i++) {
            code1 += Math.floor(Math.random() * 10)
        }
        var longTime = new Date().getTime() + code1
        let uploadFile = ''

        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res1) {
                console.log(res1)
                var tempFilePaths = res1.tempFilePaths[0];
                wx.compressImage({
                    src: tempFilePaths, // 图片路径
                    quality: 30, // 压缩质量
                    success: function(res2) {
                        uploadFile = res2.tempFilePath
                        wx.showLoading({
                            title: '正在上传',
                        })
                        wx.uploadFile({
                            url: that.data.server_jg + 'InsMer/uploadMerchantImg',
                            filePath: uploadFile,
                            name: 'file',
                            formData: {
                                type: 2,
                                institutionNumber: that.data.insNumber,
                                longTime: longTime
                            },
                            success: function(res3) {
                                var res33 = JSON.parse(res3.data)
                                if (res33.code != 1000) {
                                    wx.showToast({
                                        title: res33.msg,
                                        image: '../../img/guanbi.png',
                                        duration: 1000
                                    })
                                    return
                                }

                                var aData = new Object()
                                aData.image = res33.data
                                aData.idCardSide = 'front'
                                aData.type = '0'
                                aData.appId = that.data.baiduapi.baiduAppID
                                aData.aipKey = that.data.baiduapi.baiduAPIKey
                                aData.aipToken = that.data.baiduapi.baiduSecretKey
                                wx.request({
                                    url: 'https://api.51shanhe.com/p-server/appServer/getIdCard',
                                    data: JSON.stringify(aData),
                                    method: 'post',
                                    header: {
                                        "Content-type": "application/json"
                                    },
                                    success: function(res) {
                                        console.log(res)
                                        shopData['juridicalpersonIdPositive'] = res33.data
                                        shopData['juridicalpersonId'] = JSON.parse(res.data.data).words_result.公民身份号码.words
                                        // shopData['juridicalpersonName'] = JSON.parse(res.data.data).words_result.姓名.words
                                        that.setData({
                                            shopData: shopData,
                                        })
                                        wx.showToast({
                                            title: '请核对信息',
                                            icon: 'success',
                                            duration: 1000
                                        })
                                    }
                                })
                            },
                            fail(e) {
                                // wx.showModal({
                                // 	title: '',
                                // 	content: e,
                                // })
                                wx.showToast({
                                    title: '上传失败',
                                    icon: 'success',
                                    duration: 1000
                                })
                            }
                        })
                    },
                    fail: function(res) {
                        console.log(res)
                    }
                })
            }
        })
    },
    // 营业执照识别
    getJurInfo1: function(e) {
        var that = this
        var shopData = that.data.shopData
        var code1 = ''
        for (var i = 0; i < 4; i++) {
            code1 += Math.floor(Math.random() * 10)
        }
        var longTime = new Date().getTime() + code1
        let uploadFile = ''

        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res1) {
                console.log(res1)
                var tempFilePaths = res1.tempFilePaths[0];
                wx.compressImage({
                    src: tempFilePaths, // 图片路径
                    quality: 30, // 压缩质量
                    success: function(res2) {
                        uploadFile = res2.tempFilePath
                        wx.showLoading({
                            title: '正在上传',
                        })
                        wx.uploadFile({
                            url: that.data.server_jg + 'InsMer/uploadMerchantImg',
                            filePath: uploadFile,
                            name: 'file',
                            formData: {
                                type: 1,
                                institutionNumber: that.data.insNumber,
                                longTime: longTime
                            },
                            success: function(res3) {
                                var res33 = JSON.parse(res3.data)
                                if (res33.code != 1000) {
                                    wx.showToast({
                                        title: res33.msg,
                                        image: '../../img/guanbi.png',
                                        duration: 1000
                                    })
                                    return
                                }

                                var aData = new Object()
                                aData.image = res33.data
                                aData.idCardSide = '"back"'
                                aData.type = '1'
                                aData.appId = that.data.baiduapi.baiduAppID
                                aData.aipKey = that.data.baiduapi.baiduAPIKey
                                aData.aipToken = that.data.baiduapi.baiduSecretKey
                                wx.request({
                                    url: 'https://api.51shanhe.com/p-server/appServer/getIdCard',
                                    data: JSON.stringify(aData),
                                    method: 'post',
                                    header: {
                                        "Content-type": "application/json"
                                    },
                                    success: function(res) {
                                        console.log(res)
                                        shopData['businessLicense'] = res33.data
                                        // shopData['businessLicenseName'] = JSON.parse(res.data.data).words_result.单位名称.words
                                        if (JSON.parse(res.data.data).words_result.社会信用代码.words != '无') {
                                            shopData['businessLicenseNo'] = JSON.parse(res.data.data).words_result.社会信用代码.words
                                        } else if (JSON.parse(res.data.data).words_result.证件编号.words != '无') {
                                            shopData['businessLicenseNo'] = JSON.parse(res.data.data).words_result.证件编号.words
                                        } else {
                                            shopData['businessLicenseNo'] = ''
                                        }
                                        if (JSON.parse(res.data.data).words_result.地址.words != '无') {
                                            shopData['businessLicenseAddress'] = JSON.parse(res.data.data).words_result.地址.words
                                        } else {
                                            shopData['businessLicenseAddress'] = ''
                                        }
                                        if (JSON.parse(res.data.data).words_result.成立日期.words != '无') {
                                            shopData['businessLicenseTime'] = JSON.parse(res.data.data).words_result.成立日期.words.replace('年', '-').replace('月', '-').replace('日', '')
                                        } else {
                                            shopData['businessLicenseTime'] = ''
                                        }
                                        if (JSON.parse(res.data.data).words_result.有效期.words != '无') {
                                            shopData['businessLicenseType'] = 1
                                            shopData['businessLicenseEndTime'] = JSON.parse(res.data.data).words_result.有效期.words.replace('年', '-').replace('月', '-').replace('日', '')
                                            that.setData({
                                                jur_time: false,
                                            })
                                        } else {
                                            shopData['businessLicenseType'] = 0
                                            shopData['businessLicenseEndTime'] = ''
                                            that.setData({
                                                jur_time: true,
                                            })
                                        }
                                        that.setData({
                                            shopData: shopData,
                                        })
                                        wx.showToast({
                                            title: '请核对信息',
                                            icon: 'success',
                                            duration: 1000
                                        })
                                    }
                                })
                            },
                            fail(e) {
                                // wx.showModal({
                                // 	title: '',
                                // 	content: e,
                                // })
                                wx.showToast({
                                    title: '上传失败',
                                    icon: 'success',
                                    duration: 1000
                                })
                            }
                        })
                    },
                    fail: function(res) {
                        console.log(res)
                    }
                })
            }
        })
    },
    // 银行卡识别
    getBackCard: function(e) {
        var that = this
        var shopData = that.data.shopData
        var code1 = ''
        for (var i = 0; i < 4; i++) {
            code1 += Math.floor(Math.random() * 10)
        }
        var longTime = new Date().getTime() + code1
        let uploadFile = ''

        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res1) {
                console.log(res1)
                var tempFilePaths = res1.tempFilePaths[0];
                wx.compressImage({
                    src: tempFilePaths, // 图片路径
                    quality: 30, // 压缩质量
                    success: function(res2) {
                        uploadFile = res2.tempFilePath
                        wx.showLoading({
                            title: '正在上传',
                        })
                        wx.uploadFile({
                            url: that.data.server_jg + 'InsMer/uploadMerchantImg',
                            filePath: uploadFile,
                            name: 'file',
                            formData: {
                                type: 6,
                                institutionNumber: that.data.insNumber,
                                longTime: longTime
                            },
                            success: function(res3) {
                                var res33 = JSON.parse(res3.data)
                                if (res33.code != 1000) {
                                    wx.showToast({
                                        title: res33.msg,
                                        image: '../../img/guanbi.png',
                                        duration: 1000
                                    })
                                    return
                                }

                                var aData = new Object()
                                aData.image = res33.data
                                aData.idCardSide = 'back'
                                aData.type = '2'
                                aData.appId = that.data.baiduapi.baiduAppID
                                aData.aipKey = that.data.baiduapi.baiduAPIKey
                                aData.aipToken = that.data.baiduapi.baiduSecretKey
                                wx.request({
                                    url: 'https://api.51shanhe.com/p-server/appServer/getIdCard',
                                    data: JSON.stringify(aData),
                                    method: 'post',
                                    header: {
                                        "Content-type": "application/json"
                                    },
                                    success: function(res) {
                                        console.log(res)
                                        shopData['bankCardPositive'] = res33.data
                                        shopData['bankCardNo'] = JSON.parse(res.data.data).result.bank_card_number.replace(/\s/g, "").replace(/(.{4})/g, "$1 ");
                                        var hang = that.data.yhOnly
                                        var hangc = that.data.yhCode
                                        var hangi
                                        for (let i = 0; i < hang.length; i++) {
                                            if (hang[i].indexOf(JSON.parse(res.data.data).result.bank_name) > -1) {
                                                shopData['openingBank'] = hang[i]
                                                shopData['openingBankID'] = hangc[i]
                                                hangi = i
                                            }
                                        }
                                        that.setData({
                                            yhIndex: hangi,
                                            shopData: shopData,
                                        })
                                        console.log(that.data.shopData)
                                        wx.showToast({
                                            title: '请核对信息',
                                            icon: 'success',
                                            duration: 1000
                                        })
                                    }
                                })
                            },
                            fail(e) {
                                // wx.showModal({
                                // 	title: '',
                                // 	content: e,
                                // })
                                wx.showToast({
                                    title: '上传失败',
                                    icon: 'success',
                                    duration: 1000
                                })
                            }
                        })
                    },
                    fail: function(res) {
                        console.log(res)
                    }
                })
            }
        })
    },

    // 输入框事件
    doInput: function(e) {
        // console.log(e)
        var shopData = this.data.shopData,
            waRate = this.data.waRate,
            yunRate1 = this.data.yunRate1,
            yunRate2 = this.data.yunRate2,
            mailAll = this.data.mailAll;
        if (e.target.id == 'mailbox') {
            shopData[e.target.id] = e.detail.value
            mailAll = e.detail.value
        } else if (e.target.id == 'rate') {
            waRate = e.detail.value.replace(/[^\d^\.]+/g, '')
        } else if (e.target.id == 'unionPayRate') {
            yunRate1 = e.detail.value.replace(/[^\d^\.]+/g, '')
        } else if (e.target.id == 'unionPayRate2') {
            yunRate2 = e.detail.value.replace(/[^\d^\.]+/g, '')
        } else {
            shopData[e.target.id] = e.detail.value.replace(/[^\w\u4E00-\u9FA5]/ig, '')
        }
        this.setData({
            mailAll: mailAll,
            waRate: waRate,
            yunRate1: yunRate1,
            yunRate2: yunRate2,
            shopData: shopData,
        })
    },
    // 输入框清空事件
    clearInput: function(e) {
        var shopData = this.data.shopData;
        shopData[e.target.id] = ''
        this.setData({
            shopData: shopData,
        })
    },
    // 输入框获取焦点事件
    inputFocus: function(e) {
        this.setData({
            input_active: e.target.id,
        })
        if (e.target.id == 'mailbox') {
            this.setData({
                mail_active: true,
            })
        }
        // this.getTop()
    },
    // 输入框失去焦点事件
    inputBlur: function(e) {
        // console.log(e)
        var that = this,
            reg_hanzi = new RegExp(this.data.reg_hanzi),
            reg_id = new RegExp(this.data.reg_id),
            reg_cell = new RegExp(this.data.reg_cell),
            reg_mail = new RegExp(this.data.reg_mail),
            reg_busno = new RegExp(this.data.reg_busno),
            shopData = this.data.shopData;
        var errtips = this.data.errtips,
            errmsg = this.data.errmsg;
        // 失去焦点验证
        switch (e.target.id) {
            case 'merchantName':
                break;
            case 'registerCell':
                if (!reg_cell.test(e.detail.value)) {
                    errtips = e.target.id
                    errmsg = '请填写正确的11位手机号'
                } else {
                    errtips = ''
                }
                break;
            case 'juridicalpersonName':
                break;
            case 'juridicalpersonId':
                if (!reg_id.test(e.detail.value)) {
                    errtips = e.target.id
                    errmsg = '请填写正确的18位身份证号'
                } else {
                    errtips = ''
                }
                break;
            case 'businessLicenseName':
                break;
            case 'businessLicenseNo':
                console.log(reg_busno)
                console.log(reg_busno.test(e.detail.value))
                if (!reg_busno.test(e.detail.value)) {
                    errtips = e.target.id
                    errmsg = '证件号码长度有误或者含有特殊符号'
                } else {
                    errtips = ''
                }
                break;
            case 'businessLicenseAddress':
                break;
            case 'address':
                break;
            case 'bankCardNo':
                if (!e.detail.value || isNaN(e.detail.value.replace(/\s/g, ""))) {
                    errtips = e.target.id
                    errmsg = '请填写正确的12-18位银行卡号'
                } else {
                    errtips = ''
                }
                break;
            case 'openingBankBranch':
                break;
            case 'rate':
                if (!e.detail.value || isNaN(e.detail.value.replace(/\s/g, ""))) {
                    errtips = e.target.id
                    errmsg = '请输入费率'
                } else if (parseFloat(e.detail.value) < (parseFloat(wx.getStorageSync('saleInfo').aliRate) * 100).toFixed(2)) {
                    errtips = e.target.id
                    errmsg = '该费率不得低于销售费率'
                } else if (parseFloat(e.detail.value) < 0.20 || parseFloat(e.detail.value) > 1) {
                    errtips = e.target.id
                    errmsg = '该费率需在0.20 - 1之间'
                } else {
                    errtips = ''
                }
                break;
            case 'unionPayRate':
                if (!e.detail.value || isNaN(e.detail.value.replace(/\s/g, ""))) {
                    errtips = e.target.id
                    errmsg = '请输入费率'
                } else if (parseFloat(e.detail.value) < (parseFloat(wx.getStorageSync('saleInfo').cloudRate) * 100).toFixed(2)) {
                    errtips = e.target.id
                    errmsg = '该费率不得低于销售费率'
                } else if (parseFloat(e.detail.value) < 0.23 || parseFloat(e.detail.value) > 1) {
                    errtips = e.target.id
                    errmsg = '该费率需在0.23 - 1之间'
                } else {
                    errtips = ''
                }
                break;
            case 'unionPayRate2':
                if (!e.detail.value || isNaN(e.detail.value.replace(/\s/g, ""))) {
                    errtips = e.target.id
                    errmsg = '请输入费率'
                } else if (parseFloat(e.detail.value) < (parseFloat(wx.getStorageSync('saleInfo').cloudRate2) * 100).toFixed(2)) {
                    errtips = e.target.id
                    errmsg = '该费率不得低于销售费率'
                } else if (parseFloat(e.detail.value) < 0.52 || parseFloat(e.detail.value) > 1) {
                    errtips = e.target.id
                    errmsg = '该费率需在0.52 - 1之间'
                } else {
                    errtips = ''
                }
                break;
            case 'mailbox':
                // if (!reg_mail.test(shopData.mailbox)) {
                //     errtips = e.target.id
                //     errmsg = '请填写正确的邮箱地址'
                // } else {
                //     errtips = ''
                // }
                break;
            case 'weChatNo':
                break;
            case 'aliPayNo':
                break;
        }

        shopData[e.target.id] = e.detail.value;
        that.setData({
            input_active: '',
            errtips: errtips,
            errmsg: errmsg,
            shopData: shopData,
        })
    },
    // 营业执照开始时间
    businessStart: function(e) {
        var shopData = this.data.shopData
        shopData['businessLicenseTime'] = e.detail.value
        this.setData({
            shopData: shopData,
        })
    },
    // 身份证开始日期
    changeTime: function(e) {
        var shopData = this.data.shopData
        shopData[e.target.id] = e.detail.value;
        this.setData({
            shopData: shopData,
        })
    },
    // 身份证长期事件
    inpfunBtn_idtime: function(e) {
        var shopData = this.data.shopData
        if (!this.data.id_time) {
            shopData['juridicalPersonIDType'] = 0
            this.setData({
                id_time: true,
                shopData: shopData,
            })
        } else {
            shopData['juridicalPersonIDType'] = 1
            this.setData({
                id_time: false,
                shopData: shopData,
            })
        }
    },
    // 营业执照长期事件
    inpfunBtn_jurtime: function(e) {
        var shopData = this.data.shopData
        if (!this.data.jur_time) {
            shopData['businessLicenseType'] = 0
            this.setData({
                jur_time: true,
                shopData: shopData,
            })
        } else {
            shopData['businessLicenseType'] = 1
            this.setData({
                jur_time: false,
                shopData: shopData,
            })
        }
    },
    // 邮箱补全
    mailtap: function(e) {
        console.log(e)
        var shopData = this.data.shopData,
            reg_mail = new RegExp(this.data.reg_mail),
            errtips = this.data.errtips,
            errmsg = this.data.errmsg;
        // shopData.mailbox = '123132131321'
        shopData.mailbox = this.data.mailAll + this.data.mailTips[e.currentTarget.dataset.key]
        if (!reg_mail.test(this.data.mailAll + this.data.mailTips[e.currentTarget.dataset.key])) {
            errtips = 'mailbox'
            errmsg = '请填写正确的邮箱地址'
        } else {
            errtips = ''
            errmsg = ''
        }
        // console.log(this.data.mailAll + this.data.mailTips[e.currentTarget.dataset.key])
        this.setData({
            errtips: errtips,
            errmsg: errmsg,
            shopData: shopData,
            mail_active: false,
        })
    },
    // 云闪付开关
    ysfswitch: function(e) {
        var shopData = this.data.shopData
        shopData.isOpenYunPay = e.detail.value ? 0 : 1
        shopData.unionPayRate = ''
        shopData.unionPayRate2 = ''
        this.setData({
            ysfswitch: e.detail.value,
            shopData: shopData
        })
    },
    // 禁止屏幕滚动
    preventTouchMove: function() {},

    //报错 
    showError: function(error, id) {
        wx.showToast({
            title: error,
            icon: 'none',
            duration: 1500,
        })

        this.setData({
            input_focus: id,
            scrollTop: id
        })
    },
    // 请求数据-经营范围
    getjyfw: function() {
        var that = this;
        wx.request({
            url: this.data.server_p + 'cache/getOperationIds',
            method: 'get',
            data: {
                "institutionNumber": that.data.insNumber,
                "paymentType": 4,
            },
            dataType: 'json',
            header: {
                // 'content-type': 'application/x-www-form-urlencoded' // 默认值
                'content-type': 'application/json' // json
            },
            success: function(res) {
                if (res.data.code == 1000) {
                    that.setData({
                        jyfwArray: res.data.data
                    })
                    setTimeout(function() {
                        that.setjyfw()
                    }, 300)
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            },
            fail: function(res) {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                })
            }
        })
    },
    // 设置经营范围默认
    setjyfw: function() {
        var that = this
        var jyfwArray = that.data.jyfwArray,
            jyfwIndex = that.data.jyfwIndex,
            jyfwOnly = that.data.jyfwOnly,
            jyfwCode = that.data.jyfwCode;

        for (var i = 0; i < jyfwArray.length; i++) {
            jyfwOnly[0].push(jyfwArray[i].supMccNm);
            jyfwCode[0].push(jyfwArray[i].supMccCd);
        }
        for (var j = 0; j < jyfwArray[jyfwIndex[0]].list.length; j++) {
            jyfwOnly[1].push(jyfwArray[jyfwIndex[0]].list[j].MccTypeNm);
            jyfwCode[1].push(jyfwArray[jyfwIndex[0]].list[j].MccType);
        }
        for (var k = 0; k < jyfwArray[jyfwIndex[0]].list[jyfwIndex[1]].ids.length; k++) {
            jyfwOnly[2].push(jyfwArray[jyfwIndex[0]].list[jyfwIndex[1]].ids[k].MccNm);
            jyfwCode[2].push(jyfwArray[jyfwIndex[0]].list[jyfwIndex[1]].ids[k].MccCd);
        }

        that.setData({
            jyfwIndex: jyfwIndex,
            jyfwOnly: jyfwOnly,
            jyfwCode: jyfwCode,
        })
        wx.hideLoading()
    },
    // 请求数据-省市区
    getshq: function() {
        var that = this;
        wx.request({
            url: this.data.server_p + 'cache/getAreajson02',
            method: 'get',
            data: {
                // "institutionNumber": 1004,
                // "paymentType": 4,
            },
            dataType: 'json',
            header: {
                // 'content-type': 'application/x-www-form-urlencoded' // 默认值
                'content-type': 'application/json' // json
            },
            success: function(res) {
                if (res.data.code == 1000) {
                    that.setData({
                        shqArray: res.data.data,
                    })
                    setTimeout(function() {
                        that.setshq()
                    }, 300)
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            },
            fail: function(res) {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                })
            }
        })
    },
    setshq: function() {
        var that = this
        var shqArray = that.data.shqArray,
            shqIndex = that.data.shqIndex,
            shqOnly = that.data.shqOnly,
            shqCode = that.data.shqCode,
            khIndex = that.data.khIndex,
            khOnly = that.data.khOnly;

        for (var i = 0; i < shqArray.length; i++) {
            shqOnly[0].push(shqArray[i].provName);
            shqCode[0].push(shqArray[i].provCode);
            khOnly[0].push(shqArray[i].provName);
        }
        for (var j = 0; j < shqArray[shqIndex[0]].cityList.length; j++) {
            shqOnly[1].push(shqArray[shqIndex[0]].cityList[j].cityName);
            shqCode[1].push(shqArray[shqIndex[0]].cityList[j].cityCode);
            khOnly[1].push(shqArray[khIndex[0]].cityList[j].cityName);
        }
        for (var k = 0; k < shqArray[shqIndex[0]].cityList[shqIndex[1]].areaList.length; k++) {
            shqOnly[2].push(shqArray[shqIndex[0]].cityList[shqIndex[1]].areaList[k].areaName);
            shqCode[2].push(shqArray[shqIndex[0]].cityList[shqIndex[1]].areaList[k].areaCode);
        }

        that.setData({
            shqIndex: shqIndex,
            shqOnly: shqOnly,
            shqCode: shqCode,
            khIndex: khIndex,
            khOnly: khOnly,
        })
    },
    // 页面加载
    onLoad: function(options) {
        wx.showLoading({
            title: '',
            mask: true,
        })
        console.log(options)
        var that = this,
            shopData = this.data.shopData,
            jstype = this.data.jstype,
            shtype = this.data.shtype,
            hangbie = that.data.hangbie,
            yhOnly = that.data.yhOnly,
            yhCode = that.data.yhCode,
            mailAll = this.data.mailAll;

        for (var i = 0; i < hangbie.length; i++) {
            yhOnly.push(hangbie[i].text);
            yhCode.push(hangbie[i].value);
        }
        that.setData({
            yhOnly: yhOnly,
            yhCode: yhCode,
            insNumber: wx.getStorageSync('saleInfo').institutionNumber,
        })
        // 请求数据
        that.getjyfw()
        that.getshq()
        console.log(that.data.jyfwArray)
        console.log(that.data.shqArray)

        // 未通过状态编辑
        if (options.type == 'true') {
            wx.request({
                url: that.data.server_jg + 'InsMer/getMerchantOrderInfo',
                method: 'post',
                data: {
                    orderNumber: options.id,
                    institutionNumber: wx.getStorageSync('saleInfo').institutionNumber,
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                    // 'content-type': 'application/json' // json
                },
                success: function(data) {
                    var shopEdit = data.data.data
                    if (data.data.code != 1000) {
                        wx.showToast({
                            title: data.data.msg,
                            icon: 'none',
                        })
                    } else {
                        // 设置回显值
                        mailAll = shopEdit.mailbox.split('@')[0]
                        shopData.acntType = shopEdit.acntType
                        shopData.merchantType = shopEdit.merchantType
                        shopData.merchantName = shopEdit.merchantName
                        shopData.registerCell = shopEdit.registerCell
                        shopData.juridicalpersonName = shopEdit.juridicalpersonName
                        shopData.juridicalpersonId = shopEdit.juridicalpersonId
                        shopData.juridicalpersonIdTime = shopEdit.juridicalpersonIdTime
                        shopData.juridicalPersonIDEndTime = shopEdit.juridicalPersonIDEndTime
                        shopData.businessLicenseName = shopEdit.businessLicenseName
                        shopData.businessLicenseNo = shopEdit.businessLicenseNo
                        shopData.businessLicenseAddress = shopEdit.businessLicenseAddress
                        shopData.businessLicenseTime = shopEdit.businessLicenseTime
                        shopData.businessLicenseEndTime = shopEdit.businessLicenseEndTime
                        shopData.address = shopEdit.address
                        shopData.bankCardNo = shopEdit.bankCardNo
                        shopData.openingBank = shopEdit.openingBank
                        shopData.openingBankBranch = shopEdit.openingBankBranch
                        shopData.openingBankBranchID = shopEdit.openingBankBranchID
                        shopData.mailbox = shopEdit.mailbox
                        shopData.weChatNo = shopEdit.weChatNo
                        shopData.aliPayNo = shopEdit.aliPayNo
                        // 设置通道回显
                        shopData.isOpenYunPay = shopEdit.isOpenYunPay
                        shopData.paymentChannel = shopEdit.paymentChannel
                        shopData.paymentType = shopEdit.paymentType
                        shopData.orderNumber = options.id

                        // 设置商户类型
                        switch (shopEdit.merchantType) {
                            // switch (parseInt(2)) {
                            case '企业':
                                wx.setNavigationBarTitle({
                                    title: '企业入件-编辑'
                                })
                                shopData['acntType'] = '对公'
                                shopData['merchantType'] = '企业'
                                jstype = 1
                                shtype = 2
                                break;
                            case '个体':
                                wx.setNavigationBarTitle({
                                    title: '个体工商户-编辑'
                                })
                                shopData['acntType'] = '对私'
                                shopData['merchantType'] = '个体'
                                jstype = 0
                                shtype = 1
                                break;
                            case '个人':
                                wx.setNavigationBarTitle({
                                    title: '个人入件-编辑'
                                })
                                shopData['acntType'] = '对私'
                                shopData['merchantType'] = '个人'
                                jstype = 0
                                shtype = 0
                                break;
                        }

                        // 银行匹配
                        var yhIndex = that.data.yhIndex
                        for (let i = 0; i < yhOnly.length; i++) {
                            if (yhOnly[i] == (shopEdit.openingBank)) {
                                yhIndex = i
                            }
                        }
                        // 设置图片为默认
                        if (!shopEdit.businessLicense) {
                            shopData.businessLicense = '../../img/pic1.png'
                        } else {
                            shopData.businessLicense = shopEdit.businessLicense
                        }
                        if (!shopEdit.openingPermit) {
                            shopData.openingPermit = '../../img/pic2.png'
                        } else {
                            shopData.openingPermit = shopEdit.openingPermit
                        }
                        if (!shopEdit.juridicalpersonIdPositive) {
                            shopData.juridicalpersonIdPositive = '../../img/pic3.png'
                        } else {
                            shopData.juridicalpersonIdPositive = shopEdit.juridicalpersonIdPositive
                        }
                        if (!shopEdit.juridicalpersonIdReverseside) {
                            shopData.juridicalpersonIdReverseside = '../../img/pic4.png'
                        } else {
                            shopData.juridicalpersonIdReverseside = shopEdit.juridicalpersonIdReverseside
                        }
                        if (!shopEdit.holdId) {
                            shopData.holdId = '../../img/pic5.png'
                        } else {
                            shopData.holdId = shopEdit.holdId
                        }
                        if (!shopEdit.bankCardPositive) {
                            shopData.bankCardPositive = '../../img/pic6.png'
                        } else {
                            shopData.bankCardPositive = shopEdit.bankCardPositive
                        }
                        if (!shopEdit.doorheadPhoto) {
                            shopData.doorheadPhoto = '../../img/pic7.png'
                        } else {
                            shopData.doorheadPhoto = shopEdit.doorheadPhoto
                        }
                        if (!shopEdit.cashier) {
                            shopData.cashier = '../../img/pic8.png'
                        } else {
                            shopData.cashier = shopEdit.cashier
                        }
                        if (!shopEdit.placeBusiness) {
                            shopData.placeBusiness = '../../img/pic9.png'
                        } else {
                            shopData.placeBusiness = shopEdit.placeBusiness
                        }
                        // 身份证是否为长期设置
                        var id_time = that.data.id_time
                        if (shopEdit.juridicalPersonIDType == 1) {
                            id_time = false
                            shopData.juridicalPersonIDType = 1
                        } else {
                            id_time = true
                            shopData.juridicalPersonIDType = 0
                        }
                        // 经营范围回显
                        var jyfwArray = that.data.jyfwArray,
                            jyfwIndex = that.data.jyfwIndex;
                        for (let i = 0; i < jyfwArray.length; i++) {
                            if (jyfwArray[i].supMccCd == shopEdit.oneOperate) {
                                jyfwIndex[0] = i
                                for (let j = 0; j < jyfwArray[i].list.length; j++) {
                                    if (jyfwArray[i].list[j].MccType == shopEdit.twoOperate) {
                                        jyfwIndex[1] = j
                                        for (let k = 0; k < jyfwArray[i].list[j].ids.length; k++) {
                                            if (jyfwArray[i].list[j].ids[k].MccCd == shopEdit.twoOperate) {
                                                jyfwIndex[2] = k
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        that.setData({
                            jyfwIndex: jyfwIndex,
                        })
                        setTimeout(function() {
                            that.setjyfw()
                        }, 500)

                        // 省市区回显
                        var shqArray = that.data.shqArray,
                            shqIndex = that.data.shqIndex;
                        for (let i = 0; i < shqArray.length; i++) {
                            if (shqArray[i].provCode == shopEdit.provinceID) {
                                shqIndex[0] = i
                                for (let j = 0; j < shqArray[i].cityList.length; j++) {
                                    if (shqArray[i].cityList[j].cityCode == shopEdit.cityID) {
                                        shqIndex[1] = j
                                        for (let k = 0; k < shqArray[i].cityList[j].areaList.length; k++) {
                                            if (shqArray[i].cityList[j].areaList[k].areaCode == shopEdit.areaID) {
                                                shqIndex[2] = k
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        that.setData({
                            shqIndex: shqIndex,
                        })
                        setTimeout(function() {
                            that.setshq()
                        }, 500)

                        that.setData({
                            isUpdata: options.type,
                            id_time: id_time,
                            yhIndex: yhIndex,
                            mailAll: mailAll,
                            jstype: jstype,
                            shtype: shtype,
                            waRate: (shopEdit.rate * 100).toFixed(2),
                            ysfswitch: shopEdit.isOpenYunPay == 0 ? true : false,
                            yunRate1: (shopEdit.unionPayRate * 100).toFixed(2),
                            yunRate2: (shopEdit.unionPayRate2 * 100).toFixed(2),
                            shopData: shopData
                        })
                    }
                }
            })
            console.log(that.data.shopData)

        } else {
            switch (parseInt(options.rjlx)) {
                // switch (parseInt(2)) {
                case 1:
                    wx.setNavigationBarTitle({
                        title: '企业入件'
                    })
                    shopData['acntType'] = '对公'
                    shopData['merchantType'] = '企业'
                    jstype = 1
                    shtype = 2
                    break;
                case 2:
                    wx.setNavigationBarTitle({
                        title: '个体工商户'
                    })
                    shopData['acntType'] = '对私'
                    shopData['merchantType'] = '个体'
                    jstype = 0
                    shtype = 1
                    break;
                case 3:
                    wx.setNavigationBarTitle({
                        title: '个人入件'
                    })
                    shopData['acntType'] = '对私'
                    shopData['merchantType'] = '个人'
                    jstype = 0
                    shtype = 0
                    break;
            }
            that.setData({
                tdlx: options.tdlx,
                jstype: jstype,
                shtype: shtype,
            })
            wx.request({
                url: that.data.server_jg + 'insTpa/getThirdParty',
                method: 'post',
                data: {
                    institutionNumber: that.data.insNumber
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                    // 'content-type': 'application/json' // json
                },
                success: function(data) {
                    if (data.data.code != 1000) {
                        wx.showToast({
                            title: data.data.msg,
                            icon: 'none',
                        })
                    } else {
                        wx.setStorageSync('baidu', data.data.data);
                        that.setData({
                            baiduapi: data.data.data
                        })
                    }
                }
            })

            shopData['isOpenYunPay'] = 1
            shopData['rate'] = shopData['rate'] ? (shopData['rate'] * 100).toFixed(2) : ''
            shopData['unionPayRate'] = shopData['unionPayRate'] ? (shopData['unionPayRate'] * 100).toFixed(2) : ''
            shopData['unionPayRate2'] = shopData['unionPayRate2'] ? (shopData['unionPayRate2'] * 100).toFixed(2) : ''
            that.setData({
                shopData: shopData
            })
        }
        wx.hideLoading({
            title: '',
            mask: true,
        })
    },
    util: function(currentStatu) {
        /* 动画部分 */
        // 第1步：创建动画实例   
        var animation = wx.createAnimation({
            duration: 200, //动画时长  
            timingFunction: "linear", //线性  
            delay: 0 //0则不延迟  
        });

        // 第2步：这个动画实例赋给当前的动画实例  
        this.animation = animation;

        // 第3步：执行第一组动画  
        animation.opacity(0).rotateX(-100).step();

        // 第4步：导出动画对象赋给数据对象储存  
        this.setData({
            animationData: animation.export()
        })

        // 第5步：设置定时器到指定时候后，执行第二组动画  
        setTimeout(function() {
            // 执行第二组动画  
            animation.opacity(1).rotateX(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
            this.setData({
                animationData: animation
            })

            //关闭  
            if (currentStatu == "close") {
                this.setData({
                    maskTips: false,
                    maskPic: false,
                    confirmMSG: false,
                });
            }
        }.bind(this), 200)

        // 显示  
        if (currentStatu == "open") {
            this.setData({
                maskTips: true,
                maskPic: true,
                confirmMSG: true,
            });
        }
    }
})