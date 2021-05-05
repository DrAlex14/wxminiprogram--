// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart:[],
    totalPrice:0,
    totalNum:0
  },

  //点击支付
  handleOrderPay(){
    // const token = wx.getStorageSync('token');
    const token = 'zzy123456'        //需要企业账号才能获取真实token
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
    }
    console.log("已经有token了");
    wx.switchTab({
      url: '/pages/cart/index',
    });
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
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart')||[];
    cart = cart.filter(v=>v.checked);
    //修改全统计的数据
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(item=>{
        totalPrice += item.num * item.goods_price;
        totalNum += item.num;
    })
    this.setData({
      cart,
      totalNum,
      totalPrice,
      address
    })
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