//引用发送请求代码
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数据
    swiperList:[{
      image_src:"https://api-hmugo-web.itheima.net/pyg/banner1.png",
      open_type:"navigate",
      goods_id:129,
      navigator_url:"/pages/goods_detail/main?goods_id=129"
    },
    {
      image_src:"https://api-hmugo-web.itheima.net/pyg/banner2.png",
      open_type:"navigate",
      goods_id:43985,
      navigator_url:"/pages/goods_detail/main?goods_id=43985"},
    {
      image_src:"https://api-hmugo-web.itheima.net/pyg/banner3.png",
      open_type:"navigate",
      goods_id:38,
      navigator_url:"/pages/goods_detail/main?goods_id=38"
    }],
    //导航 数组
    catesList:[],
    //楼层数据
    floorList:[],
  },

  getSwiperList(){
    //发送请求获取轮播图
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
    request({
      url: '/home/swiperdata',
    }).then((result)=>{
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  getCatesList(){
    //发送请求获取导航
    request({
      url: '/home/catitems',
    }).then((result)=>{
      this.setData({
        catesList: result.data.message
      })
    })
  },
  //楼层数据
  getFloorList(){
    request({
      url: '/home/floordata',
    }).then((result) => {
      this.setData({
        floorList: result.data.message
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
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