//引用发送请求代码
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList:[],
    //右侧商品数据
    rightContent:[],
    //当前选中菜单
    currentIndex:0,
    //滚动条回顶
    scrollTop:0
  },
  //请求返回数据
  Cates:[],

  //左侧菜单点击事件
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    this.setData({
      rightContent:this.Cates[index].children,
      currentIndex:index,
      scrollTop:0
    })
  },

  //获取分类数据
  async getCates(){
    // request({
    //   url:'/categories',
    // }).then((res)=>{
    //   this.Cates = res.data.message;
      
    //   //存入缓存
    //   wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});

    //   //左侧大菜单数据
    //   let leftMenuList = this.Cates.map(v=>v.cat_name);
    //   //右侧商品数据
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent,
    //   })
    // })

    //用es7 async await语法发送请求
    const res = await request({url:'/categories'})
    this.Cates = res.data.message;
    //存入缓存
    wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
    //左侧大菜单数据
    let leftMenuList = this.Cates.map(v=>v.cat_name);
    //右侧商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCates();
    }else{
      //缓存时间是否大于10s
      if(Date.now()-Cates.time > 1000 * 60 * 5){
        this.getCates();
      }else{
        //使用缓存
        this.Cates = Cates.data;

        //左侧大菜单数据
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        //右侧商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
      })
      }
    }
    
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