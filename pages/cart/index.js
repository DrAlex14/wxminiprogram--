// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },

  //选择收货地址
  handleChooseAddress(){
    //获取用户拥有权限
    // wx.getSetting({
    //   success: (result) => {
    //     console.log(result.authSetting);
    //   }
    // });
    
    wx.chooseAddress({
      success: (result) => {
        console.log(result);
        wx.setStorageSync('address', result);
      }
    });
      
  },
  //选中商品
  handleItemChange(e){
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let {cart} = this.data;
    //查找商品再购物车中index
    let index = cart.findIndex(v=>v.goods_id === goods_id);
    //根据index修改商品checked
    cart[index].checked = !cart[index].checked;
    this.setData({
      cart
    });
    //调整购物车状态
    this.setCart(cart)
  },
  //封装调整全选，总数量，总金额的方法
  setCart(cart){
    //修改全统计的数据
    let totalPrice = 0;
    let totalNum = 0;
    let allChecked = true;
    cart.forEach(item=>{
      if(item.checked){
        totalPrice += item.num * item.goods_price;
        totalNum += item.num;
      }else{
        allChecked = false;
      }
    })
    //判断cart数组是否为空
    allChecked = cart.length!=0?allChecked:false;
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })     
    wx.setStorageSync('cart', cart); 
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
    const cart = wx.getStorageSync('cart')||[];
    //计算是否全部商品选中 空数组every返回true
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    // //总数量和总价格
    // let totalPrice = 0;
    // let totalNum = 0;
    // let allChecked = true;
    // cart.forEach(item=>{
    //   if(item.checked){
    //     totalPrice += item.num * item.goods_price;
    //     totalNum += item.num;
    //   }else{
    //     allChecked = false;
    //   }
    // })
    // //判断cart数组是否为空
    // allChecked = cart.length!=0?allChecked:false;
    // this.setData({
    //   address,
    //   cart,
    //   allChecked,
    //   totalNum,
    //   totalPrice
    // })      
    this.setCart(cart);
    this.setData({
      address
    })
  },
  handleAllChecked(){
    let {cart,allChecked} = this.data;
    allChecked = !allChecked;
    cart.forEach(v=>{
      v.checked = allChecked;
    })
    this.setCart(cart);
  },
  //商品数量编辑
  handleNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    //获取购物车
    let {cart} = this.data;
    //找到选择商品的索引
    const index = cart.findIndex(v=>v.goods_id === id);
    //判断是否实行删除
    let _this = this;
    if(cart[index].num===1&&operation===-1){
      wx.showModal({
        title: '亲亲',
        content: '真的不要这件宝贝了吗',
        success (res) {
          if (res.confirm) {
            cart.splice(index,1);
            _this.setCart(cart);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      }); 
    }else{
      //执行商品数量变化
      cart[index].num += operation;
      //设置购物车数据回到缓存和data
      this.setCart(cart);
    }
  },
  //支付
  handlePay(){
    const {address,totalNum} = this.data;
    if(!address.userName){
      wx.showToast({
        title: '您还没有选择收获地址'
      });
      return;
    }
    if(totalNum === 0){
      wx.showToast({
        title: '您还没有选购商品'
      });
      return;
    }
    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(v=>!v.checked);
    wx.setStorageSync('cart', newCart);
    wx.navigateTo({
      url: '/pages/pay/index',
    });
      
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