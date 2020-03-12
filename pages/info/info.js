// pages/info/info.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options);
    that.setData({
      type: options.type
    })
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
    wx.hideHomeButton({
      success: function () {
        console.log(1)
      }
    })
  },
  formSubmit: function (e) {
    var that = this
    var type = 1
    var tel = e.detail.value.tel
    var username = e.detail.value.username
    var user = wx.getStorageSync('user')

    if (tel == '' || username == ''){
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'none',
        duration: 2000
      })
    }else{

      wx.request({
        url: app.url +'login/update_info',
        data: {
          js_userid:user.userid,
          js_type:type,
          js_tel:tel,
          js_username:username, 
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
            console.log(res)
            if(res.data.code == 200){
              wx.setStorageSync('status', 2);1863615160
              wx.showToast({
                title: '申请已提交',
                icon: 'none',
                duration: 2000
              })
              setTimeout(function () {
                wx.redirectTo({
                  url: '../rule/rule',
                });
              }, 2000)
            } else{
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })        
            }      
        }
      })

    }

  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})