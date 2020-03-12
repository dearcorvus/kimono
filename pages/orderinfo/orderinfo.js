// pages/orderinfo/orderinfo.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    'order':[],
    'info':[],
    'goods':[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.url+'order/orderinfo',
      data:{
        id: options.orderid
      },
      type:'post',
      success:function(res){
        console.log(res)
        if (res.data.code === 200){
          that.setData({
            order: res.data.data.order,
            info: res.data.data.info,
            goods: res.data.data.goods
          })
          
        }else{
          wx.showToast({
            title: '该订单不存在',
            icon: 'none',
            duration: 2000,
            success:function(){
              setTimeout(function(){
                wx.navigateBack({
                  delta: 2
                })
              },2000)
            }
          })
        }

      }
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
    // wx.hideHomeButton({
    //   success: function () {
    //     console.log(1)
    //   }
    // })
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

  },
  payFunction:function(e){
    var id = e.target.dataset.id;

    console.log(e.target.dataset.id)
    wx.request({
      url: app.url+'order/order_update',
      data:{
        id:id
      },
      type:'post',
      success:function(res){
        console.log(res)
        if(res.data.code == 200){
          wx.redirectTo({
            url: '../index/index',
          });
        }
      }
    })
  }
})