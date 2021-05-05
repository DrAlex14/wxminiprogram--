//引用发送请求代码
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: 0,
        value: "综合",
        isActive: true,
      },
      {
        id: 1,
        value: "销量",
        isActive: false,
      },
      {
        id: 2,
        value: "价格",
        isActive: false,
      }
    ],
    goods_list:[],
    totalPages:1, //总页数
  },
  queryParams:{
    query:"", //搜索关键词
    cid:"",
    pagenum: 1,
    pageSize: 10
  },
  totalPages:1,//总页数

  //标题点击事件
  handleTabsItemChange(e){
    const {index} = e.detail;
    let tabs = this.data.tabs;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs:tabs
    })
  },

  //获取商品信息
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.queryParams})
    //获取总数据条数
    const total = res.data.message.total;
    //获取商品总页数
    this.totalPages = Math.ceil(total / this.queryParams.pageSize);
    
    this.setData({
      goods_list: [...this.data.goods_list,...res.data.message.goods]   //数组拼接
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid; 
    this.getGoodsList();
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
    //重置数组
    this.setData({
      goods_list: []
    })
    //重置页码
    this.queryParams.pagenum = 1;
    //重新发请求
    this.getGoodsList();
    //关闭刷新状态
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //判断还有没有下一页
    if(this.queryParams.pagenum >= this.totalPages){
      //没有下一页数据
      wx.showToast({title: '没有下一页数据'});
    }else{
      //还有下一页数据
      this.queryParams.pagenum ++;
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})