// pages/pay/pay.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    price:''
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
    this.depositFunction();
  },
    /**
     * 获取用户信息
     */
  depositFunction: function(){
    var that = this
    var user = wx.getStorageSync('user')
      wx.request({
        url: app.url+'config/index',
        data:{
          user:user.userid
        },
        header:{
          'content-type': 'application/json' // 默认值
        },
        success:function(res){
          console.log(res)
          if(res.data.code == 200){
            that.setData({
              price:res.data.data
            })
          }
        }
      })

  },
  payFunction:function(){
    var that = this
    var user = wx.getStorageSync('user')
    var fee = 100;
    that.getPrePayId(user.openid,fee);
    // wx.request({
    //   url: app.url +'login/deposit',
    //   data:{
    //     id:user.userid
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     if(res.data.code == 200){
    //       wx.setStorageSync('status', 3);
    //       wx.reLaunch({
    //         url: '../index/index'
    //       })
    //     }
    //   }
    // })
  },
  getPrePayId: function(openid,fee){
    var that = this;

    if(openid){
        var data = {
          openid:openid,
          fee:fee,
          type:1
        }
        wx.request({
          url: app.url + 'pay/pay',
          data:data,
          method:'POST',
          header:{
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          success: function(res){
            console.log(res)
            if (res.data) {
              // wx.requestPayment({
              //   timeStamp: '',
              //   nonceStr: '',
              //   package: '',
              //   signType: 'MD5',
              //   paySign: '',
              //   success(res) {
                  
              //    },
              //   fail(res) { }
              // })
            }
          }
        })
    }
  }
})