// pages/hoteinfo/hotelinfo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: false,
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
    nodes: '',
    type: 1
  },
  onShow: function () {
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

    wx.request({
      url: app.url + 'shop/shopInfo',
      data: {
        shopid: goodsid,
        sf: type
      },
      // method: 'POST',
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
            type: type
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
  // 去地图
  gomap: function (e) {
    var that = this;

    wx.getLocation({
      type: 'gcj02',
      success(res) {
        wx.openLocation({
          latitude: Number(e.currentTarget.dataset.lat),
          longitude: Number(e.currentTarget.dataset.lon),
          name: e.currentTarget.dataset.address
        })
      },
      fail: function () {
        wx.showModal({
          title: '定位失败',
          content: '拒绝授权，获取位置信息失败',
          confirmText: '授权开启',
          cancelText: '我知道了',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: function (res) {
                  wx.getLocation({
                    success(res) {
                      console.log("获取到的位置是", res);
                    },
                    fail: function () {

                    }
                  })
                },
                fail: function () {
                  console.log('openSetting.failed');
                }
              })
            }
            if (res.cancel) {
              wx.showModal({
                title: '定位失败',
                content: '无法使用定位权限，获取位置信息失败',
                confirmColor: '#345391',
                confirmText: '太遗憾了',
                showCancel: false
              })
            }
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
  },  
  change(e) {
    console.log('current index has changed', e.detail)
  },
  showbanner: function () {
    let that = this
    that.setData({
      show: true
    })
  },
  imageUtil: function (e) {
    var imageSize = {};
    var originalWidth = e.detail.width; //图片的原始尺寸
    var originalHeight = e.detail.height;//图片原始高
    var originalScale = originalHeight / originalWidth;//图片高宽比
    //获取屏幕宽高
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        var windowscale = windowHeight / windowWidth;//屏幕宽高比
        if (originalScale < windowscale) { //图片宽高小于屏幕宽高比
          //图片缩放后的宽度为屏幕宽
          imageSize.imageWidth = windowWidth;
          imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
        } else {
          imageSize.imageHeight = windowHeight;
          imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
        }
      },
    })
    return imageSize;
  },
  imageLoad: function (e) {
    var imageSize = this.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  }
})