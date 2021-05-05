//引用发送请求代码
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import {wxLogin} from '../../utils/asyncWx.js'

// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取用户信息
  async handleGetUserInfo(e){
    try {
      //获取用户信息
      const {rawData,signature,encryptedData,iv} = e.detail;
      //获取小程序登录后的code
      const {code} = await wxLogin()
      console.log(code);
      //发送请求获取token
      const loginParams = {rawData,signature,encryptedData,iv,code}
      const res = await request({url:"/users/wx;ogin",data:loginParams,method:"post"})
      console.log(res);
      //需要企业账号才能获取token!!!
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
    
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
})