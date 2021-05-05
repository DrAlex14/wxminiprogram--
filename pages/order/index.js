// pages/order/index.js
//引用发送请求代码
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [
      {
        order_number: "HD123456",
        order_price: "3333",
        order_time: "2020-01-01"
      },
      {
        order_number: "ZAS1234",
        order_price: "2333",
        order_time: "2020-01-01"
      },
      {
        order_number: "HHDD12345",
        order_price: "33344",
        order_time: "2020-01-01"
      }
    ],
    tabs:[
      {
        id: 0,
        value: "全部",
        isActive: true,
      },
      {
        id: 1,
        value: "待付款",
        isActive: false,
      },
      {
        id: 2,
        value: "待发货",
        isActive: false,
      },
      {
        id: 3,
        value: "退货/退款",
        isActive: false,
      }
    ],
  },
  //获取订单数据
  async getOrders(type) {
    const res = await request({url:"/my/orders/all",data:{type}})
    console.log(res);
  },
  //根据标题索引来激活选中
  changeTitleByIndex(index) {
    let tabs = this.data.tabs;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs:tabs
    })
  },
  //tabs点击事件
  handleTabsItemChange(e) {
    const {index} = e.detail;
    let tabs = this.data.tabs;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs:tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    // 获取小程序页面栈 长度最大为10
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    let {type} = currentPage.options
    this.changeTitleByIndex(type - 1)
    this.getOrders(type);
    //需要token值
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