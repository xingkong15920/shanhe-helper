var CmsConfig = {
	//公共接口
	//登录
	login: "agentCommon/AgloginInfo",
	//获取首页头部数据
	getHeadData:"agentMain/getHeadData",
	//获取数据统计数据
	getDataTj:"agentMain/getDataTj",
	//获取账户统计数据
	getAccountTj:"agentMain/getAccountTj",
	//获取商户
	getMerchantlist: "agMerchant/getAgMerchantlist",
	//获取代理
	getAgentList:"agentManage/getAgentList",
	//编辑代理密码
	upAgentInfo: "agentManage/upAgentInfo",
	//获取代理费率
	getAgentRate:"agentManage/getAgentRate",
	//修改费率
	updataAgentRate:"agentManage/updataAgentRate",
	//销售列表
	getSaleList:"agSale/getSaleInfo",
	//添加销售
	addSale:"agSale/addSale",
	//更改销售状态
	delSaleType:"agSale/delSaleType",
	//销售编辑
	updateSale: "agSale/updateSale",
	//服务商账单
	getAgentBillList:"agentBill/getAgentBillList",
	//销售账单
	getSaleBillList:"agSale/getSaleBillList",
	//提现记录
	getAgentWithdrawCash:"Withdrawal/getAgentWithdrawCash",
	//提现
	insertAgentWithdrawCash:"Withdrawal/insertAgentWithdrawCash",
	//订单列表
	getAgOrderList:"agOrder/getAgOrderList",

}
module.exports = {
	CmsConfig: CmsConfig,
}