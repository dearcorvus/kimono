// pages/pay/pay.js

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

  },
  payFunction:function(){
    var that = this
    var user = wx.getStorageSync('user')
    console.log(user)

    wx.request({
      url: app.url +'goods/deposit',
      data:{
        id:user.userid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if(res.data.code == 200){
          wx.setStorageSync('status', 3);
          wx.reLaunch({
            url: '../index/index'
          })
        }
      }
    })
  }
})