const config = require('../../../utils/config.js')
const config_jg = require('../../../utils/config-organ.js')
const common = require('../../../utils/common.js').CmsConfig

Page({
    data: {
        // 接口配置
        server: config.server,
        server_jg: config_jg.server,
        pageTit: '',
        rjlx: '',
        tdlx: '',
        //遮罩层
        maskTips: false,
        maskPic: false,
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
        jsbs: ['对公账户', '对私账户', ],
        jstype: 0,
        mailTips: ['@qq.com', '@163.com', '@126.com', ],
        mail_active: false,
        input_active: '',
        id_time: false,
        // 经营范围快捷信息
        jyfw_kj: [{
                mccnum: '6,27,5331',
                mccTypeNm: '便利店',
            },
            {
                mccnum: '4,16,5722',
                mccTypeNm: '家用电器',
            },
            {
                mccnum: '6,25,5311',
                mccTypeNm: '百货商店',
            },
            {
                mccnum: '6,27,5251',
                mccTypeNm: '五金商店',
            },
            {
                mccnum: '1,01,7011',
                mccTypeNm: '酒店',
            },
            {
                mccnum: '6,27,5912',
                mccTypeNm: '药店',
            },
            {
                mccnum: '1,04,7298',
                mccTypeNm: '美容SPA',
            },
            {
                mccnum: '4,20,5541',
                mccTypeNm: '加油站',
            },
        ],
        jyfw_kj_a: 1000,
        jyfwArray: [],
        jyfwIndex: [],
        jyfwOnly: [
            [],
            [],
            [],
        ],
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
        // shopData: {
        //     "acntType": "对私",
        //     "address": "礼贤南街1号",
        //     "agName": "闪盒测试代理商",
        //     "agentNumber": "99",
        //     "aliPayNo": "15111111111",
        //     "area": "魏县",
        //     "area1": "130434|魏县",
        //     "areaID": "130434",
        //     "bankCardNo": "6214990110114064",
        //     "bankCardPositive": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/1004000706/d2f8d0d0bfa8d5fdc3e6.jpg",
        //     "businessLicense": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/d6a4bcfed5d5c6ac.jpg",
        //     "businessLicenseAddress": "河北省邯郸市魏县礼贤南街",
        //     "businessLicenseEndTime": "2019-12-24",
        //     "businessLicenseName": "魏县西部来客大盘鸡饭店",
        //     "businessLicenseNo": "92130434MA08GML99J",
        //     "businessLicenseTime": "2017-05-02",
        //     "businessLicenseType": 0,
        //     "cashier": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/c0b6baa3cad5d2f8cca8d5d5c6ac.jpg",
        //     "city": "邯郸市",
        //     "city1": "1270|邯郸市",
        //     "city11": "1270|邯郸市",
        //     "cityID": "1270",
        //     "customerServiceTell": "15111111111",
        //     "doorheadPhoto": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/c3c5cdb7d5d5c6ac.jpg",
        //     "facePhoto": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/c3c5cdb7d5d5c6ac.jpg",
        //     "holdId": "",
        //     "institutionNumber": 1004,
        //     "isOpenYunPay": 0,
        //     "juridicalPersonIDEndTime": "2029-06-16",
        //     "juridicalPersonIDType": 1,
        //     "juridicalpersonId": "130434197407112458",
        //     "juridicalpersonIdPositive": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/b7a8c8cbc9edb7ddd6a4c3f7d5fdc3e6.jpg",
        //     "juridicalpersonIdReverseside": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/b7a8c8cbc9edb7ddd6a4c3f7b7b4c3e6.jpg",
        //     "juridicalpersonIdTime": "2009-06-16",
        //     "juridicalpersonName": "孟志广",
        //     "longTime": 1577417002000,
        //     "mailbox": "1257736026@qq.com",
        //     "merchantName": "西部来客",
        //     "merchantNumber": "1004000706",
        //     "merchantType": "个体",
        //     "oneOperate": "1",
        //     "openingBank": "中国建设银行",
        //     "openingBank1": "0105|中国建设银行",
        //     "openingBankBranch": "中国建设银行邯郸分行",
        //     "openingBankBranchID": "105127000017",
        //     "openingBankID": "0105",
        //     "openingPermit": "",
        //     "operationId": "5812",
        //     "paymentChannel": "1564557799651",
        //     "paymentType": "0",
        //     "placeBusiness": "http://sh-upfile.oss-cn-beijing.aliyuncs.com/1004/Merchant/15771508624818522/c0b6baa3c3c5b5eac4dabeb0d5d5c6ac.jpg",
        //     "prov1": "1200|河北省",
        //     "prov11": "1200|河北省",
        //     "province": "河北省",
        //     "provinceID": "1200",
        //     "rate": "0.0025",
        //     "registerCell": "15111111111",
        //     "reserveCell": "15111111111",
        //     "saleNumber": "10040000089",
        //     "slName": "测试",
        //     "subsidy": 1,
        //     "threeOperate": "5812",
        //     "twoOperate": "02",
        //     "unionPayRate": "0.0030",
        //     "unionPayRate2": "0.0060",
        //     "weChatNo": "15111111111",
        // },
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
            shopinfo = that.data.shopData;
        switch (that.data.Steps) {
            case 0:
                if (!shopinfo.merchantName || shopinfo.merchantName == '') {
                    that.showError('请填写商户名称')
                    return
                }
                if (!shopinfo.registerCell || shopinfo.registerCell == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.juridicalpersonName || shopinfo.juridicalpersonName == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.juridicalpersonId || shopinfo.juridicalpersonId == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.juridicalpersonIdTime || shopinfo.juridicalpersonIdTime == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.juridicalPersonIDEndTime || shopinfo.juridicalPersonIDEndTime == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.businessLicenseName || shopinfo.businessLicenseName == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.businessLicenseNo || shopinfo.businessLicenseNo == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.businessLicenseAddress || shopinfo.businessLicenseAddress == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.businessLicenseEndTime || shopinfo.businessLicenseEndTime == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.businessLicenseTime || shopinfo.businessLicenseTime == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.operationId || shopinfo.operationId == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.region || shopinfo.region == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.address || shopinfo.address == '') {
                    that.showError('')
                    return
                }
                break
            case 1:
                if (!shopinfo.jstypebtn || shopinfo.jstypebtn == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.bankCardNo || shopinfo.bankCardNo == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.openingBank || shopinfo.openingBank == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.shoujihao || shopinfo.shoujihao == '') {
                    that.showError('')
                    return
                }
                if (!shopinfo.openingBankBranch || shopinfo.openingBankBranch == '') {
                    that.showError('')
                    return
                }
                break
            case 2:
                if (shopinfo.businessLicense.indexOf('http') < 0) {
                    that.showError('请上传营业执照照片')
                    return
                }
                if (shopinfo.openingPermit.indexOf('http') < 0) {
                    that.showError('请上传开户许可证照片')
                    return
                }
                if (shopinfo.juridicalpersonIdPositive.indexOf('http') < 0) {
                    that.showError('请上传身份证正面照片')
                    return
                }
                if (shopinfo.juridicalpersonIdReverseside.indexOf('http') < 0) {
                    that.showError('请上传身份证反面照片')
                    return
                }
                if (shopinfo.holdId.indexOf('http') < 0) {
                    that.showError('请上传手持身份证照片')
                    return
                }
                if (shopinfo.bankCardPositive.indexOf('http') < 0) {
                    that.showError('请上传银行卡正面照片')
                    return
                }
                if (shopinfo.doorheadPhoto.indexOf('http') < 0) {
                    that.showError('请上传门头照片')
                    return
                }
                if (shopinfo.cashier.indexOf('http') < 0) {
                    that.showError('请上传收银台照片')
                    return
                }
                if (shopinfo.placeBusiness.indexOf('http') < 0) {
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

        wx.showToast({
            title: '完成',
            icon: 'success',
            mask: true,
        })
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
            jyfw_kj_a: e.currentTarget.dataset.type
        })
    },
    // 经营范围
    jyfwPicker: function(e) {
        this.setData({
            jyfwIndex: e.detail.value
        })
    },



    bindCustomPickerColumnChange: function(e) {
        var jyfwArray = this.data.jyfwArray,
            jyfwIndex = this.data.jyfwIndex,
            jyfwOnly = this.data.jyfwOnly;

        jyfwIndex[e.detail.column] = e.detail.value;
        // console.log(jyfwOnly);

        var searchColumn = () => {
            for (var i = 0; i < jyfwArray.length; i++) {
                var arr1 = [];
                var arr2 = [];
                if (i == jyfwIndex[0]) {
                    for (var j = 0; j < jyfwArray[i].dept.length; j++) {
                        arr1.push(jyfwArray[i].dept[j].name);
                        if (j == jyfwIndex[1]) {
                            for (var k = 0; k < jyfwArray[i].dept[j].product.length; k++) {
                                arr2.push(jyfwArray[i].dept[j].product[k].name);
                            }
                            jyfwOnly[2] = arr2;
                        }
                    }
                    jyfwOnly[1] = arr1;
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
            jyfwIndex: jyfwIndex
        });
    },

    // 经营范围滑动
    jyfwChange: function(e) {
        // console.log(e.detail.value)
        var data = {
            jyfwArray: this.data.jyfwArray,
            jyfwIndex: this.data.jyfwIndex
        };
        data.jyfwIndex[e.detail.column] = e.detail.value;
        // console.log(data.jyfwArray)
        // console.log(data.jyfwArray[1])
        // console.log(data.jyfwIndex[e.detail.column])
        for (var i = 0; i < jyfwArray.length; i++) { //一列循环
            var ob1 = new Object()
            var ob2 = new Object()
            var ob2List = new Array()

            ob1.name = jyfwArray[i].supMccNm
            ob1.id = jyfwArray[i].supMccCd
            ob2.parId = jyfwArray[i].supMccCd

            // e.detail.column[i].push(ob1)

            for (var j = 0; j < jyfwArray[i].list.length; j++) { //二列循环
                var ob3 = new Object()
                var ob4 = new Object()
                var ob4List = new Array()

                ob3.name = jyfwArray[i].list[j].MccTypeNm
                ob3.id = jyfwArray[i].list[j].MccType
                ob4.parId = jyfwArray[i].list[j].MccType
                // ob2List.push(ob3)
                var jyfwArrayThrList = operlist[i].list[j].ids

                for (var k = 0; k < jyfwArrayThrList.length; k++) { //三列循环
                    var ob5 = new Object()
                    ob5.name = jyfwArrayThrList[k].MccNm
                    ob5.id = jyfwArrayThrList[k].MccCd
                    // ob4List.push(ob5)
                }
                ob4.childList = ob4List
                // operlistThr.push(ob4)
            }
            ob2.childList = ob2List
            // operlistTwo.push(ob2)
        }

        // switch (e.detail.column) {
        //     case 0:
        //         switch (data.jyfwIndex[0]) {
        //             case 0:
        //                 data.jyfwArray[1] = data.jyfwArray[1];
        //                 data.jyfwArray[2] = data.jyfwArray[2];
        //                 break;
        //             case 1:
        //                 data.jyfwArray[1] = data.jyfwArray[1];
        //                 data.jyfwArray[2] = data.jyfwArray[2];
        //                 break;
        //         }
        //         data.jyfwIndex[1] = 0;
        //         data.jyfwIndex[2] = 0;
        //         break;
        //     case 1:
        //         switch (data.jyfwIndex[0]) {
        //             case 0:
        //                 switch (data.jyfwIndex[1]) {
        //                     case 0:
        //                         data.jyfwArray[2] = data.jyfwArray[2];
        //                         break;
        //                     case 1:
        //                         data.jyfwArray[2] = data.jyfwArray[2];
        //                         break;
        //                     case 2:
        //                         data.jyfwArray[2] = data.jyfwArray[2];
        //                         break;
        //                     case 3:
        //                         data.jyfwArray[2] = data.jyfwArray[2];
        //                         break;
        //                     case 4:
        //                         data.jyfwArray[2] = data.jyfwArray[2];
        //                         break;
        //                 }
        //                 break;
        //             case 1:
        //                 switch (data.jyfwIndex[1]) {
        //                     case 0:
        //                         data.jyfwArray[2] = data.jyfwArray[2];
        //                         break;
        //                     case 1:
        //                         data.jyfwArray[2] = data.jyfwArray[2];
        //                         break;
        //                     case 2:
        //                         data.jyfwArray[2] = data.jyfwArray[2];
        //                         break;
        //                 }
        //                 break;
        //         }
        //         data.jyfwIndex[2] = 0;
        //         break;
        // }
        this.setData({

        });
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
    // 身份证开始日期
    idstartTime: function(e) {
        var shopData = this.data.shopData
        shopData[e.target.id] = e.detail.value;
        this.setData({
            idstartTime: e.detail.value,
            shopData: shopData,
        })
    },
    // 身份证结束日期
    idendTime: function(e) {
        var shopData = this.data.shopData
        shopData[e.target.id] = e.detail.value;
        this.setData({
            idendTime: e.detail.value,
            shopData: shopData,
        })
    },
    // 身份证长期事件
    inpfunBtn_idtime: function(e) {
        console.log(this.data.id_time)
        if (!this.data.id_time) {
            this.setData({
                id_time: true,
            })
        } else {
            this.setData({
                id_time: false,
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
    // 省市区
    shqPicker: function(e) {
        var region = e.detail.value
        this.setData({
            // shq: region[0] + '-' + region[1] + '-' + region[2]
            shq: region
        })
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
            image: '../../img/guanbi.png',
            mask: true,
        })
    },
    // 请求数据
    getOperationIds: function() {
        var that = this;
        wx.request({
            url: this.data.server_jg + 'cache/getOperationIds',
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
        var that = this;
        var shopData = this.data.shopData;

        // 请求数据
        that.getOperationIds()

        shopData['merchantType'] = this.data.jstype
        shopData['paymentChannels'] = this.data.jstype
        shopData['settlementLogo'] = this.data.jstype

        that.setData({
            // rjlx: options.rjlx,
            // tdlx: options.tdlx,
            rjlx: '2',
            tdlx: '3',
        })
        switch (that.data.rjlx) {
            case '1' || 1:
                wx.setNavigationBarTitle({
                    title: '企业入件'
                })
                break;
            case '2' || 2:
                wx.setNavigationBarTitle({
                    title: '个体工商户'
                })
                break;
            case '3' || 3:
                wx.setNavigationBarTitle({
                    title: '个体入件'
                })
                break;
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