// 接口配置
const config = require('../../../utils/config.js')
const config_p = require('../../../utils/config-public.js')
const config_jg = require('../../../utils/config-organ.js')
const common = require('../../../utils/common.js').CmsConfig
// 行别
const hangbie = require('../../../utils/hangbie.js')

Page({
    data: {
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
        tipsCon: '',
        picCon: '',
        //设置步骤条
        Steps: 3, //当前步数
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
        jyfwIndex: [0, 3, 3],
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
        // 身份证长期显示
        sfz_cq: true,
        // 支行
        zhlist: [],
        // 营业执照时间
        businessLicenseTime: '',
        businessLicenseEndTime: '',
        // 收集信息
        // shopData: {
        //     "businessLicense": '../../img/pic1.png',
        //     "openingPermit": '../../img/pic2.png',
        //     "juridicalpersonIdPositive": '../../img/pic3.png',
        //     "juridicalpersonIdReverseside": '../../img/pic4.png',
        //     "holdId": '../../img/pic5.png',
        //     "bankCardPositive": '../../img/pic6.png',
        //     "doorheadPhoto": '../../img/pic7.png',
        //     "cashier": '../../img/pic8.png',
        //     "placeBusiness": '../../img/pic9.png',
        //     "oneOperate": "1",
        //     "twoOperate": "02",
        //     "threeOperate": "5812",
        //     "juridicalPersonIDType": '1',
        // },
        shopData: {
            "acntType": "对私",
            "address": "礼贤南街1号",
            "agName": "闪盒测试代理商",
            "agentNumber": "99",
            "aliPayNo": "15111111111",
            "area": "魏县",
            "area1": "130434|魏县",
            "areaID": "130434",
            "bankCardNo": "6214990110114064",
            "bankCardPositive": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/1004000706/d2f8d0d0bfa8d5fdc3e6.jpg",
            "businessLicense": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/d6a4bcfed5d5c6ac.jpg",
            "businessLicenseAddress": "河北省邯郸市魏县礼贤南街",
            "businessLicenseEndTime": "2019-12-24",
            "businessLicenseName": "魏县西部来客大盘鸡饭店",
            "businessLicenseNo": "92130434MA08GML99J",
            "businessLicenseTime": "2017-05-02",
            "businessLicenseType": 0,
            "cashier": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/c0b6baa3cad5d2f8cca8d5d5c6ac.jpg",
            "city": "邯郸市",
            "city1": "1270|邯郸市",
            "city11": "1270|邯郸市",
            "cityID": "1270",
            "customerServiceTell": "15111111111",
            "doorheadPhoto": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/c3c5cdb7d5d5c6ac.jpg",
            "facePhoto": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/c3c5cdb7d5d5c6ac.jpg",
            "holdId": "",
            "institutionNumber": 1004,
            "isOpenYunPay": 0,
            "juridicalPersonIDEndTime": "2029-06-16",
            "juridicalPersonIDType": 1,
            "juridicalpersonId": "130434197407112458",
            "juridicalpersonIdPositive": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/b7a8c8cbc9edb7ddd6a4c3f7d5fdc3e6.jpg",
            "juridicalpersonIdReverseside": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/b7a8c8cbc9edb7ddd6a4c3f7b7b4c3e6.jpg",
            "juridicalpersonIdTime": "2009-06-16",
            "juridicalpersonName": "孟志广",
            "longTime": 1577417002000,
            "mailbox": "1257736026@qq.com",
            "merchantName": "西部来客",
            "merchantNumber": "1004000706",
            "merchantType": "个体",
            "oneOperate": "1",
            "openingBank": "中国建设银行",
            "openingBank1": "0105|中国建设银行",
            "openingBankBranch": "中国建设银行邯郸分行",
            "openingBankBranchID": "105127000017",
            "openingBankID": "0105",
            "openingPermit": "",
            "operationId": "5812",
            "paymentChannel": "1564557799651",
            "paymentType": "0",
            "placeBusiness": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/c0b6baa3c3c5b5eac4dabeb0d5d5c6ac.jpg",
            "prov1": "1200|河北省",
            "prov11": "1200|河北省",
            "province": "河北省",
            "provinceID": "1200",
            "rate": "0.0025",
            "registerCell": "15111111111",
            "reserveCell": "15111111111",
            "saleNumber": "10040000089",
            "slName": "测试",
            "subsidy": 1,
            "threeOperate": "5812",
            "twoOperate": "02",
            "unionPayRate": "0.0030",
            "unionPayRate2": "0.0060",
            "weChatNo": "15111111111",
        },
        jyfwSelect: '',
        shq: '',
        ysfswitch: false,
        // 收集信息
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
                if (!shopData.juridicalPersonIDEndTime || shopData.juridicalPersonIDEndTime == '') {
                    that.showError('请选择身份证结束时间')
                    return
                }
                if (!shopData.businessLicenseName || shopData.businessLicenseName == '') {
                    that.showError('请填写营业执照名称')
                    return
                }
                if (!shopData.businessLicenseNo || shopData.businessLicenseNo == '') {
                    that.showError('请填写身营业执照号')
                    return
                }
                if (!shopData.businessLicenseAddress || shopData.businessLicenseAddress == '') {
                    that.showError('请填写身营业执照地址')
                    return
                }
                if (!shopData.businessLicenseEndTime || shopData.businessLicenseEndTime == '') {
                    that.showError('请选择营业执照开始时间')
                    return
                }
                if (!shopData.businessLicenseTime || shopData.businessLicenseTime == '') {
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
                if (shopData.businessLicense.indexOf('http') < 0) {
                    that.showError('请上传营业执照照片')
                    return
                }
                if (shopData.openingPermit.indexOf('http') < 0) {
                    that.showError('请上传开户许可证照片')
                    return
                }
                if (shopData.juridicalpersonIdPositive.indexOf('http') < 0) {
                    that.showError('请上传身份证正面照片')
                    return
                }
                if (shopData.juridicalpersonIdReverseside.indexOf('http') < 0) {
                    that.showError('请上传身份证反面照片')
                    return
                }
                if (shopData.holdId.indexOf('http') < 0) {
                    that.showError('请上传手持身份证照片')
                    return
                }
                if (shopData.bankCardPositive.indexOf('http') < 0) {
                    that.showError('请上传银行卡正面照片')
                    return
                }
                if (shopData.doorheadPhoto.indexOf('http') < 0) {
                    that.showError('请上传门头照片')
                    return
                }
                if (shopData.cashier.indexOf('http') < 0) {
                    that.showError('请上传收银台照片')
                    return
                }
                if (shopData.placeBusiness.indexOf('http') < 0) {
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
            shopData = this.data.shopData

        shopData.rate = (shopData.rate * 100).toFixed(2)
        shopData.unionPayRate = (shopData.unionPayRate * 100).toFixed(2)
        shopData.unionPayRate2 = (shopData.unionPayRate2 * 100).toFixed(2)
        console.log(this.data.shopData)
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
        console.log(this.data.jyfw_kj[e.currentTarget.dataset.type].mccnum)
    },
    // 经营范围
    jyfwPicker: function(e) {
        var jyfwIndex = this.data.jyfwIndex,
            jyfwCode = this.data.jyfwCode,
            shopData = this.data.shopData;

        shopData['oneOperate'] = jyfwCode[0][jyfwIndex[0]]
        shopData['twoOperate'] = jyfwCode[1][jyfwIndex[1]]
        shopData['threeOperate'] = jyfwCode[2][jyfwIndex[2]]

        this.setData({
            jyfwIndex: e.detail.value,
        })
        console.log(this.data.jyfwIndex)
        console.log([jyfwCode[0][jyfwIndex[0]], jyfwCode[1][jyfwIndex[1]], jyfwCode[2][jyfwIndex[2]]])
    },
    // 经营范围滑动
    jyfwChange: function(e) {
        var jyfwArray = this.data.jyfwArray,
            jyfwIndex = this.data.jyfwIndex,
            jyfwOnly = this.data.jyfwOnly,
            jyfwCode = this.data.jyfwCode;

        jyfwIndex[e.detail.column] = e.detail.value;
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
            shopData = this.data.shopData;

        shopData['oneOperate'] = shqCode[0][shqIndex[0]]
        shopData['twoOperate'] = shqCode[1][shqIndex[1]]
        shopData['threeOperate'] = shqCode[2][shqIndex[2]]

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
        var yhIndex = this.data.yhIndex;

        this.setData({
            yhIndex: e.detail.value,
        })
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
            url: that.data.server_jg + 'cache/getBank',
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
    // 图片压缩上传
    uploadImage: function(tempFilePaths, id, type) {
        var that = this
        var code1 = ''
        for (var i = 0; i < 4; i++) {
            code1 += Math.floor(Math.random() * 10)
        }
        var longTime = new Date().getTime() + code1
        let uploadFile = ''

    },
    // 识别身份证
    getIdInfo: function(e) {
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
                            url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=' + that.data.accesstoken,
                            data: {
                                "id_card_side": "front",
                                "detect_direction": "true",
                                image: imgBase
                            },
                            method: 'post',
                            header: {
                                "Content-type": "application/x-www-form-urlencoded"
                            },
                            success: res => {
                                // console.log(res.data.words_result.公民身份号码)
                                var shopData = that.data.shopData
                                shopData['juridicalpersonId'] = res.data.words_result.公民身份号码.words
                                shopData['juridicalpersonName'] = res.data.words_result.姓名.words
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
                    }
                })
                // wx.uploadFile({
                //     url: that.data.server1 + 'Sell/addPic',
                //     filePath: imageSrc,
                //     name: 'file',
                //     formData: {
                //         type: 2,
                //         institutionNumber: that.data.institutionNumber,
                //         orderNumber: that.data.orderNumber
                //     },
                //     success(res) {
                //         wx.showToast({
                //             title: '上传成功',
                //             icon: 'success',
                //             duration: 1000
                //         })
                //         var imgSrc = JSON.parse(res.data)
                //         var imagelist = that.data.imagelist
                //         console.log(imagelist)
                //         for (let i = 0; i < imagelist.length; i++) {
                //             if (imagelist[i].type == 2) {
                //                 imagelist[i].imgSrc = imgSrc.data + '?' + Math.random()
                //                 imagelist[i].isS = true
                //             }
                //         }

                //         that.setData({
                //             imagelist: imagelist
                //         })
                //         console.log(imagelist)
                //     },
                //     fail() {
                //         wx.showToast({
                //             title: '上传失败',
                //             icon: 'success',
                //             duration: 1000
                //         })
                //     }
                // })
            },

            fail({
                errMsg
            }) {
                console.log('chooseImage fail, err is', errMsg)
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
                // wx.uploadFile({
                //     url: that.data.server1 + 'Sell/addPic',
                //     filePath: imageSrc,
                //     name: 'file',
                //     formData: {
                //         type: 1,
                //         institutionNumber: that.data.institutionNumber,
                //         orderNumber: that.data.orderNumber
                //     },
                //     success(res) {
                //         wx.showToast({
                //             title: '上传成功',
                //             icon: 'success',
                //             duration: 1000
                //         })
                //         var imgSrc = JSON.parse(res.data)
                //         var imagelist = that.data.imagelist
                //         console.log(imagelist)
                //         for (let i = 0; i < imagelist.length; i++) {
                //             if (imagelist[i].type == 1) {
                //                 imagelist[i].imgSrc = imgSrc.data + '?' + Math.random()
                //                 imagelist[i].isS = true
                //             }
                //         }

                //         that.setData({
                //             imagelist: imagelist
                //         })
                //         console.log(imagelist)
                //     },
                //     fail() {
                //         wx.showToast({
                //             title: '上传失败',
                //             icon: 'success',
                //             duration: 1000
                //         })
                //     }
                // })
            },

            fail({
                errMsg
            }) {
                console.log('chooseImage fail, err is', errMsg)
            }
        })
    },
    getBackCard: function(e) {
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
                            url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/bankcard?access_token=' + that.data.accesstoken,
                            data: {
                                image: imgBase
                            },
                            method: 'post',
                            header: {
                                "Content-type": "application/x-www-form-urlencoded"
                            },
                            success: res => {
                                console.log(res)
                                var shopData = that.data.shopData
                                if (res.data.error_code) {
                                    wx.showToast({
                                        title: '识别失败',
                                        icon: 'none',
                                        duration: 1000
                                    })
                                    return
                                }
                                shopData['bankCardNo'] = res.data.result.bank_card_number.replace(/\s/g, "").replace(/(.{4})/g, "$1 ");


                                var hang = that.data.hangbie
                                for (let i = 0; i < hang.length; i++) {
                                    if (hang[i].text.indexOf(res.data.result.bank_name) > -1) {
                                        shopData['openingBank'] = hang[i].text
                                        shopData['openingBankID'] = hang[i].value
                                        shopData['openingBankBranch'] = ''
                                        shopData['openingBankBranchID'] = ''
                                    }
                                }

                                that.setData({
                                    shopData: shopData,
                                    bankInfo: '请核对'
                                })
                                wx.showToast({
                                    title: '请核对信息',
                                    icon: 'success',
                                    duration: 1000
                                })
                            },
                            fail: res => {
                                wx.showToast({
                                    title: res.data.error_msg,
                                    icon: 'success',
                                    duration: 1000
                                })
                            }
                        })
                    }
                })
                // wx.uploadFile({
                //     url: that.data.server1 + 'Sell/addPic',
                //     filePath: imageSrc,
                //     name: 'file',
                //     formData: {
                //         type: 6,
                //         institutionNumber: that.data.institutionNumber,
                //         orderNumber: that.data.orderNumber
                //     },
                //     success(res) {
                //         wx.showToast({
                //             title: '上传成功',
                //             icon: 'success',
                //             duration: 1000
                //         })
                //         var imgSrc = JSON.parse(res.data)
                //         var imagelist = that.data.imagelist
                //         for (let i = 0; i < imagelist.length; i++) {
                //             if (imagelist[i].type == 6) {
                //                 imagelist[i].imgSrc = imgSrc.data + '?' + Math.random()
                //                 imagelist[i].isS = true
                //             }
                //         }

                //         that.setData({
                //             imagelist: imagelist
                //         })
                //     },
                //     fail() {
                //         wx.showToast({
                //             title: '上传失败',
                //             icon: 'success',
                //             duration: 1000
                //         })
                //     }
                // })
            },

            fail({
                errMsg
            }) {
                console.log('chooseImage fail, err is', errMsg)
            }
        })
    },



    // 输入框事件
    doInput: function(e) {
        // console.log(e)
        var shopData = this.data.shopData
        if (e.target.id == 'mailbox') {
            shopData[e.target.id] = e.detail.value
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
            shopData['juridicalPersonIDType'] = '1'
            this.setData({
                id_time: true,
                sfz_cq: false,
                shopData: shopData,
            })
        } else {
            shopData['juridicalPersonIDType'] = '0'
            this.setData({
                id_time: false,
                sfz_cq: true,
                shopData: shopData,
            })
        }
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
        console.log(e.detail.value)
        this.setData({
            ysfswitch: e.detail.value
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
                "institutionNumber": 1004,
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
                        jyfwArray: jyfwArray,
                        jyfwIndex: jyfwIndex,
                        jyfwOnly: jyfwOnly,
                        jyfwCode: jyfwCode,
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
                        shqArray: shqArray,
                        shqIndex: shqIndex,
                        shqOnly: shqOnly,
                        shqCode: shqCode,
                        khIndex: khIndex,
                        khOnly: khOnly,
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
    // 页面加载
    onLoad: function(options) {
        var that = this,
            shopData = this.data.shopData,
            jstype = this.data.jstype,
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
            ysfswitch: shopData.isOpenYunPay == 0 ? true : false,
            waRate: (shopData.rate * 100).toFixed(2),
            yunRate1: (shopData.unionPayRate * 100).toFixed(2),
            yunRate2: (shopData.unionPayRate2 * 100).toFixed(2),
        })

        // switch (parseInt(options.rjlx)) {
        switch (parseInt(2)) {
            case 1:
                wx.setNavigationBarTitle({
                    title: '企业入件'
                })
                shopData['acntType'] = '对公'
                jstype = 1
                break;
            case 2:
                wx.setNavigationBarTitle({
                    title: '个体工商户'
                })
                shopData['acntType'] = '对私'
                jstype = 0
                break;
            case 3:
                wx.setNavigationBarTitle({
                    title: '个人入件'
                })
                shopData['acntType'] = '对私'
                jstype = 0
                break;
        }
        that.setData({
            // tdlx: options.tdlx,
            jstype: jstype,
            shopData: shopData,
            // merNumber: options.merNumber,
            insNumber: '1004',
            // insNumber: wx.getStorageSync('saleInfo').institutionNumber,
        })

        // 请求数据
        that.getjyfw()
        that.getshq()
        wx.request({
            url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=BIuEzeLr4mZaCGuDjEeLvSCp&client_secret=q5XFY7XBaZ48ccbMpdebqsU1hurMLxsB&',
            method: 'post',
            success: function(data) {
                that.setData({
                    accesstoken: data.data.access_token
                })
            }
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
                });
            }
        }.bind(this), 200)

        // 显示  
        if (currentStatu == "open") {
            this.setData({
                maskTips: true,
                maskPic: true,
            });
        }
    }
})