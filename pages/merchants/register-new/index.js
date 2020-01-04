// 接口配置
const config = require('../../../utils/config.js')
const config_p = require('../../../utils/config-public.js')
const config_jg = require('../../../utils/config-organ.js')
const common = require('../../../utils/common.js').CmsConfig
// 行别
const hangbie = require('../../../utils/hangbie.js')

Page({
    data: {
        //是否更新
        isUpdata: false,
        // 公共信息
        tdlx: '',
        baiduapi: [],
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
        progress: 80, //步骤横条宽度
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
            shopData = that.data.shopData,
            shqOnly = that.data.shqOnly,
            shqCode = that.data.shqCode,
            shqIndex = that.data.shqIndex;

        console.log(shopData)

        var reg_hanzi = new RegExp("^([a-z]|[A-Z]|[0-9]|[\\u4e00-\\u9fa5]){0,20}$")
        var reg_id = new RegExp("^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$")
        var reg_call = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        var reg_mail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        switch (that.data.Steps) {
            case 0:
                if (!shopData.merchantName || shopData.merchantName == '') {
                    that.showError('请填写商户名称')
                    return
                }
                if (!reg_call.test(shopData.registerCell) || shopData.registerCell == '') {
                    that.showError('请填写正确的注册手机号')
                    return
                }
                if (!shopData.juridicalpersonName || shopData.juridicalpersonName == '') {
                    that.showError('请填写姓名')
                    return
                }
                if (!reg_id.test(shopData.juridicalpersonId) || shopData.juridicalpersonId == '') {
                    that.showError('请填写身份证号')
                    return
                }
                if (!shopData.juridicalpersonIdTime || shopData.juridicalpersonIdTime == '') {
                    that.showError('请选择身份证开始时间')
                    return
                }
                if (!that.data.id_time && !shopData.juridicalPersonIDEndTime || shopData.juridicalPersonIDEndTime == '') {
                    that.showError('请选择身份证结束时间')
                    return
                }
                if (that.data.shtype != 0 && !shopData.businessLicenseName || shopData.businessLicenseName == '') {
                    that.showError('请填写营业执照名称')
                    return
                }
                if (that.data.shtype != 0 && !shopData.businessLicenseNo || shopData.businessLicenseNo == '') {
                    that.showError('请填写身营业执照号')
                    return
                }
                if (that.data.shtype != 0 && !shopData.businessLicenseAddress || shopData.businessLicenseAddress == '') {
                    that.showError('请填写身营业执照地址')
                    return
                }
                if (that.data.shtype != 0 && !shopData.businessLicenseEndTime || shopData.businessLicenseEndTime == '') {
                    that.showError('请选择营业执照开始时间')
                    return
                }
                if (that.data.shtype != 0 && !shopData.businessLicenseTime || shopData.businessLicenseTime == '') {
                    that.showError('请选择营业执照结束时间')
                    return
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
                    that.showError('请填写详细地址')
                    return
                }

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
                    that.showError('请填写/扫描银行卡号')
                    return
                }
                if (!shopData.openingBank || shopData.openingBank == '') {
                    that.showError('请填写/选择开户银行')
                    return
                }
                if (!shopData.openingBankBranch || shopData.openingBankBranch == '') {
                    that.showError('请选择开户支行')
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
        var reg_mail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

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

        // 费率信息校验
        if (!shopData.rate || shopData.rate == '' || isNaN(shopData.rate)) {
            that.showError('请正确填写支/微费率')
            return
        } else if (parseFloat(shopData.rate) < 0.20 || parseFloat(shopData.rate) > 1) {
            that.showError('支/微费率需在0.20 - 1之间')
            return
        }

        if (that.data.ysfswitch) {
            if (!shopData.unionPayRate || shopData.unionPayRate == '' || isNaN(shopData.unionPayRate)) {
                that.showError('请选择云闪付1000以下费率')
                return
            } else if (parseFloat(shopData.unionPayRate) < 0.23 || parseFloat(shopData.unionPayRate) > 1) {
                that.showError('云闪付1000以下费率需在0.23 - 1之间')
                return
            }
            if (!shopData.unionPayRate2 || shopData.unionPayRate2 == '' || isNaN(shopData.unionPayRate2)) {
                that.showError('请选择云闪付1000以上费率')
                return
            } else if (parseFloat(shopData.unionPayRate2) < 0.52 || parseFloat(shopData.unionPayRate2) > 1) {
                that.showError('云闪付1000以上费率需在0.52 - 1之间')
                return
            }
        }

        if (!reg_mail.test(shopData.mailbox)) {
            that.showError('请填写邮箱')
            return
        }
        if (!shopData.weChatNo || shopData.weChatNo == '') {
            that.showError('请填写微信号')
            return
        }
        if (!shopData.aliPayNo || shopData.aliPayNo == '') {
            that.showError('请填写支付宝号')
            return
        }

        shopData['rate'] = (shopData.rate / 100).toFixed(4)
        if (that.data.tdlx == 0) {
            shopData['paymentChannels'] = JSON.stringify(wx.getStorageSync('payment_zl'))
        } else {
            shopData['paymentChannels'] = JSON.stringify(wx.getStorageSync('payment_jl'))
        }
        if (this.data.ysfswitch) {
            shopData['unionPayRate'] = (shopData.unionPayRate / 100).toFixed(4)
            shopData['unionPayRate2'] = (shopData.unionPayRate2 / 100).toFixed(4)
        }
        that.setData({
            shopData: shopData,
            confirmMSG: true,
            waRate: (shopData.rate * 100).toFixed(2),
            yunRate1: (shopData.unionPayRate * 100).toFixed(2) || '',
            yunRate2: (shopData.unionPayRate2 * 100).toFixed(2) || '',
        })

        // shopData.rate = (shopData.rate * 100).toFixed(2)
        // shopData.unionPayRate = (shopData.unionPayRate * 100).toFixed(2)
        // shopData.unionPayRate2 = (shopData.unionPayRate2 * 100).toFixed(2)
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
        shopData['rate'] = (shopData.rate * 100).toFixed(2)
        if (this.data.ysfswitch) {
            shopData['unionPayRate'] = (shopData.unionPayRate * 100).toFixed(2)
            shopData['unionPayRate2'] = (shopData.unionPayRate2 * 100).toFixed(2)
        } else {
            shopData['unionPayRate'] = ''
            shopData['unionPayRate2'] = ''
        }
        this.setData({
            confirmMSG: false,
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
        this.setData({
            jyfw_kj_a: e.currentTarget.dataset.type,
            jyfwIndex: this.data.jyfw_kj[e.currentTarget.dataset.type].mccnum
        })
        // this.setjyfw()
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
            maskKh: true
        })
    },
    // 开户支行搜索选择
    searczh: function(e) {
        var that = this;
        wx.request({
            url: that.data.server + 'cache/getBank',
            method: 'get',
            data: {
                bankCode: that.data.yhCode[that.data.yhIndex].toString(),
                paymentType: 4,
                bankName: e.detail.value,
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
                                    url: 'http://api.51shanhe.com/p-server/appServer/getIdCard',
                                    data: JSON.stringify(aData),
                                    method: 'post',
                                    header: {
                                        "Content-type": "application/json"
                                    },
                                    success: function(res) {
                                        console.log(res)
                                        shopData['juridicalpersonIdPositive'] = res33.data
                                        shopData['juridicalpersonId'] = JSON.parse(res.data.data).words_result.公民身份号码.words
                                        shopData['juridicalpersonName'] = JSON.parse(res.data.data).words_result.姓名.words
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
    getJurInfo1: function(e) {
        console.log(e)
        var that = this

        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const imageSrc = res.tempFilePaths[0]
                wx.showLoading({
                    title: '正在上传',
                })
                var tempFilePaths = res.tempFilePaths
                console.log(tempFilePaths)
                wx.getFileSystemManager().readFile({
                    filePath: res.tempFilePaths[0], //选择图片返回的相对路径
                    encoding: 'base64', //编码格式
                    success: res => { //成功的回调
                        var imgBase = res.data
                        wx.request({
                            url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/business_license?access_token=' + that.data.accesstoken,
                            data: {
                                "detect_direction": "true",
                                image: imgBase
                            },
                            method: 'post',
                            header: {
                                "Content-type": "application/x-www-form-urlencoded"
                            },
                            success: res => {
                                console.log(res)
                                // wx.showModal({
                                // 	title: '提示',
                                // 	content: JSON.parse(res.data.words_result),
                                // 	success(res) {
                                // 		if (res.confirm) {
                                // 			console.log('用户点击确定')
                                // 		} else if (res.cancel) {
                                // 			console.log('用户点击取消')
                                // 		}
                                // 	}
                                // })
                                var shopData = that.data.shopData
                                shopData['businessLicenseName'] = res.data.words_result.单位名称.words
                                if (res.data.words_result.社会信用代码.words != '无') {
                                    shopData['businessLicenseNo'] = res.data.words_result.社会信用代码.words
                                }
                                if (res.data.words_result.证件编号.words != '无') {
                                    shopData['businessLicenseNo'] = res.data.words_result.证件编号.words
                                }
                                shopData['businessLicenseAddress'] = res.data.words_result.地址.words
                                shopData['businessLicenseEndTime'] = res.data.words_result.成立日期.words.replace('年', '-').replace('月', '-').replace('日', '')
                                that.setData({
                                    shopData: shopData,
                                    buiInfo: '请核对'
                                })
                                wx.showToast({
                                    title: '请核对信息',
                                    icon: 'success',
                                    duration: 1000
                                })
                            }
                        })
                    }
                })
            },

            fail({
                errMsg
            }) {
                console.log('chooseImage fail, err is', errMsg)
            }
        })
    },
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
                                    url: 'http://api.51shanhe.com/p-server/appServer/getIdCard',
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
        var shopData = this.data.shopData
        if (e.target.id == 'mailbox') {
            shopData[e.target.id] = e.detail.value
        } else if (e.target.id == 'rate' || e.target.id == 'unionPayRate' || e.target.id == 'unionPayRate2') {
            shopData[e.target.id] = e.detail.value.replace(/[^\d^\.]+/g, '')
        } else {
            shopData[e.target.id] = e.detail.value.replace(/[^\w\u4E00-\u9FA5]/ig, '')
        }
        this.setData({
            shopData: shopData
        })
    },
    inputFocus: function(e) {
        // console.log(e)
        this.setData({
            input_active: e.target.id,
        })
        if (e.target.id == 'mailbox') {
            this.setData({
                mail_active: true,
            })
        }
    },
    inputBlur: function(e) {
        // console.log(e)
        var shopData = this.data.shopData
        shopData[e.target.id] = e.detail.value;
        this.setData({
            input_active: '',
            shopData: shopData,
            mail_active: false,
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
        console.log(this.data.shopData['juridicalPersonIDType'])
    },
    // 邮箱补全
    mailtap: function(e) {
        var i = e.currentTarget.dataset.key,
            shopData = this.data.shopData;
        var mail1 = this.data.shopData.mailbox,
            mail2 = mail1.concat(this.data.mailTips[i]);

        if (mail1.indexOf('@') > 0) {
            console.log(this.data.shopData.mailbox.split('@')[0])
            mail1 = this.data.shopData.mailbox.split('@')[0]
            mail2 = mail1.concat(this.data.mailTips[i])
        }
        shopData['mailbox'] = mail2
        this.setData({
            shopData: shopData,
        })
        console.log(this.data.shopData.mailbox)
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
    showError: function(error) {
        wx.showToast({
            title: error,
            icon: 'none',
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
                    that.setjyfw()
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
                    that.setshq()
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
        console.log(options)
        var that = this,
            shopData = this.data.shopData,
            jstype = this.data.jstype,
            shtype = this.data.shtype,
            hangbie = that.data.hangbie,
            yhOnly = that.data.yhOnly,
            yhCode = that.data.yhCode;


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
                        // 银行匹配
                        var yhIndex = that.data.yhIndex
                        for (let i = 0; i < yhOnly.length; i++) {
                            if (yhOnly[i] == (shopEdit.openingBank)) {
                                yhIndex = i
                            }
                        }
                        // 设置图片为默认
                        if (!shopEdit.businessLicense) {
                            shopEdit.businessLicense = '../../img/pic1.png'
                        }
                        if (!shopEdit.openingPermit) {
                            shopEdit.openingPermit = '../../img/pic2.png'
                        }
                        if (!shopEdit.juridicalpersonIdPositive) {
                            shopEdit.juridicalpersonIdPositive = '../../img/pic3.png'
                        }
                        if (!shopEdit.juridicalpersonIdReverseside) {
                            shopEdit.juridicalpersonIdReverseside = '../../img/pic4.png'
                        }
                        if (!shopEdit.holdId) {
                            shopEdit.holdId = '../../img/pic5.png'
                        }
                        if (!shopEdit.bankCardPositive) {
                            shopEdit.bankCardPositive = '../../img/pic6.png'
                        }
                        if (!shopEdit.doorheadPhoto) {
                            shopEdit.doorheadPhoto = '../../img/pic7.png'
                        }
                        if (!shopEdit.cashier) {
                            shopEdit.cashier = '../../img/pic8.png'
                        }
                        if (!shopEdit.placeBusiness) {
                            shopEdit.placeBusiness = '../../img/pic9.png'
                        }
                        // 身份证是否为长期设置
                        var id_time = that.data.id_time
                        if (shopEdit.juridicalPersonIDType == 1) {
                            id_time = false
                        } else {
                            id_time = true
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
                        that.setjyfw()

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
                        that.setshq()

                        that.setData({
                            isUpdata: options.type,
                            id_time: id_time,
                            yhIndex: yhIndex,
                            shopData: shopEdit
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
                    }
                }
            })
            that.setData({
                baiduapi: wx.getStorageSync('baidu')
            })

            shopData['isOpenYunPay'] = 1
            shopData['rate'] = shopData['rate'] ? (shopData['rate'] * 100).toFixed(2) : ''
            shopData['unionPayRate'] = shopData['unionPayRate'] ? (shopData['unionPayRate'] * 100).toFixed(2) : ''
            shopData['unionPayRate2'] = shopData['unionPayRate2'] ? (shopData['unionPayRate2'] * 100).toFixed(2) : ''
            that.setData({
                shopData: shopData
            })
        }
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