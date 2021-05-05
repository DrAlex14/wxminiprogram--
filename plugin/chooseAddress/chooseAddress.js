// plugin/chooseAddress/chooseAddress.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSuccess: function (res) {
      console.log(res.detail);
    },
    onFail: function (res) {
      console.log(res);
    }
  }
})
