//引用发送请求代码
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  handleCancel(){
    this.setData({
      goods:[],
      isFocus:false,
      inputValue:""
    })
  },
  handleInput(e){
    // 获取输入框的值
    const {value} = e.detail;
    // 检测合法性
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false,
        inputValue: ""
      })
      return;
    }
    this.setData({
      isFocus:true
    })
    // 防抖 一般用于输入框防止重复输入 重复发送请求
    clearTimeout(this.TimeId) // 清除定时器
    this.TimeId = setTimeout(() => {
      // 通过，发送请求
      this.qsearch(value)
    },1000)
  },
  // 发送请求
  async qsearch(query){
    const res = await request({url:"/goods/qsearch",data:{query}})
    this.setData({
      goods:res.data.message
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus: false
  },
  TimeId: -1, //全局定时器
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