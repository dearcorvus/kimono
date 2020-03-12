// pages/goods/goods.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    imgUrls: [
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg',
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg',
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg'
    ],
    show: false,
    nodes:'',
    type:1
  },
  onShow:function(){
    wx.showToast({
      icon: 'loading',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var goodsid = options.detail;
    var type = options.type
    var order_id = options.order_id
    var user = wx.getStorageSync("user");

    wx.request({
      url: app.url + 'Saom/goods',
      data: {
        goodsid: goodsid,
        type: type
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (r) {
        console.log(r)
        if (r.data.code == 200) {
          that.setData({
            imgUrls: r.data.data.picarr,
            goods: r.data.data,
            nodes: r.data.data.info,
            goodsid: goodsid,
            type:type,
            status: r.data.status,
            order_id: order_id,
            tel: user.tel
          })
        } else {
          wx.showToast({
            title: r.data.massage,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })    
  },

  /**
   * 立即使用
   */
  submitBTN:function(){
    var that = this;
    var uid = wx.getStorageSync("user");
    console.log(that.data.goodsid);
    console.log(uid.userid)
    wx.request({
      url: app.url +'/order/goodsorder',
      data: {
        goodsid: that.data.goodsid,
        userid: uid.userid,
        order_id: that.data.order_id
      },
      // method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (r) {
        console.log(r)
        if (r.data.code == 200) {
          wx.showToast({
            title: "租用成功",
            icon: 'none',
            duration: 2000
          })
          setTimeout(function(){
            wx.navigateTo({
              url: "/pages/index/index"
            })
          },2000)

        } else {
          wx.showToast({
            title: r.data.massage,
            icon: 'none',
            duration: 2000
          })
          if (r.data.code == 300){
            setTimeout(function(){
              wx.navigateTo({
                url: "/pages/pay/pay"
              })
            },1000)
          }
        }
      },
      fail: function (res) {
        console.log(res)
      },     
    })
  },
  change(e) {
    console.log('current index has changed', e.detail)
  },
  showbanner: function(){
    let that = this
    that.setData({
      show: true
    })
  },
  imageUtil:function(e){
    var imageSize = {};
    var originalWidth = e.detail.width; //图片的原始尺寸
    var originalHeight =e.detail.height;//图片原始高
    var originalScale =originalHeight / originalWidth;//图片高宽比
    //获取屏幕宽高
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        var windowscale = windowHeight / windowWidth;//屏幕宽高比
        if(originalScale < windowscale){ //图片宽高小于屏幕宽高比
          //图片缩放后的宽度为屏幕宽
          imageSize.imageWidth = windowWidth;
          imageSize.imageHeight =(windowWidth * originalHeight) / originalWidth;
        }else{
          imageSize.imageHeight = windowHeight;
          imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
        }
      },
    })
    return imageSize;
  },
  imageLoad:function(e){
    var imageSize = this.imageUtil(e)
    this.setData({
      imagewidth:imageSize.imageWidth,
      imageheight:imageSize.imageHeight
    })
  },
  hotelBTN:function(){
    var that = this
    var goodsid = that.data.goods.id
    console.log(goodsid)

    wx.reLaunch({
      url: '/pages/hotel/hotel?goodsid=' + goodsid
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