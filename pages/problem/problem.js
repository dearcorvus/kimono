// pages/problem/problem.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userTell: '',
    userText:""
  },
  subfunction:function(){
    var that = this
    var uid = wx.getStorageSync("user")
    console.log(uid)
    wx.request({
      url: app.url+'feedback/feedback',
      data:{
        uid:uid.userid,
        mobile: that.data.userTell,
        info: that.data.userTell
      },
      type:'post',
      success:function(res){
          console.log(res);
          if(res.data.code === 200){
            wx.showToast({
              title: '反馈成功',
              icon: 'none',
              success: function(res) {
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1
                  })
                },2000)
              },
            })
          }else{
            wx.showToast({
              title: '反馈失败',
              icon: 'none',
            })        
          }
      }
    })
  },
  //获取输入框信息
  userTellInput: function (e) {
    //设置电话
    this.setData({
      userTell: e.detail.value
    })
  },
  userTextarea: function (e) {
    //设置电话
    this.setData({
      userText: e.detail.value
    })
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