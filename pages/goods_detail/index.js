//引用发送请求代码
import {request} from "../../request/index.js"
import regeneratorRuntime, { async } from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:[],
    //商品是否被收藏
    isCollect: false
  },
  GoodsInfo:{},
  //点击加入购物车
  handleCartAdd(){
    //获取缓存中的购物车
    let cart = wx.getStorageSync('cart')||[];
    //判断商品对象是否存在购物车中
    let index = cart.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id);
    if(index === -1){
      //不存在
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    }else{
      //存在
      cart[index].num++;
    }
    //购物车添加回缓存
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
      
  },
  //点击轮播图预览图片
  handlePreviewImage(e){
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      urls: urls,
      current: current,
    })
  },
  //获取商品详情信息
  async getGoodsDetail(goods_id){
    const res = await request({url:"/goods/detail",data:{goods_id}}) 
    this.GoodsInfo = res.data.message

    // 获取缓存中商品收藏的数组
    let collect = wx.getStorageSync('collect')
    // 判断商品是否收藏
    let isCollect = collect.some(v=>{ return v.goods_id === this.GoodsInfo.goods_id})

    this.setData({
      goodsObj: {
        goods_name:res.data.message.goods_name,
        goods_price:res.data.message.goods_price,
        pics:res.data.message.pics,
        //iphone部分手机不识别webp格式图片
        goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
      },
      isCollect
    })
  },
  // 点击商品收藏图标
  handleCollectTap(){
    let isCollect = false;
    let collect = wx.getStorageSync('collect')||[];
    let index = collect.findIndex(v=>{ return v.goods_id == this.GoodsInfo.goods_id});
    if(index !== -1){
      collect.splice(index,1);
      isCollect = false;
      // wx.showToast({
      //   title: '取消成功',
      //   icon: 'success',
      //   mask: ture,
      // });
        
    }else{
      collect.push(this.GoodsInfo)
      isCollect = true;
      // wx.showToast({
      //   title: '收藏成功',
      //   icon: 'success',
      //   mask: ture,
      // });
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages(); //获取当前页面栈
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options
    const {goods_id} = options;
    this.getGoodsDetail(goods_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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