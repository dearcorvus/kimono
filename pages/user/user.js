// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    var that = this
    var uid = wx.getStorageSync("user");

    wx.request({
      url: app.url+'index/user',
      data: {
        uid:uid.userid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        that.setData({
          user:res.data.data.user,
          order: res.data.data.order,
          mobile: res.data.data.mobile
        })
      },
    })

  },
  //联系客服
  callfunction: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.val //仅为示例，并非真实的电话号码
    })
  },

})