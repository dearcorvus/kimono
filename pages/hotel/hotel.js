// pages/hotel/hotel.js
// map.js
var app = getApp()
var mymap = '';
var lat = '';
var long = '';
var scale = 0;
Page({
  data: {
    scale: 0,
    isshow: true,
    polyline: [{
      points: [{
        longitude: 39.904296 ,
        latitude: 116.452625
      }],
      color: '#FF0000DD',
      width: 8,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '../../static/images/connectkefu.png',
      position: {
        left: 0,
        top: 300 - 1,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  //引入数据库
  onLoad: function (option) {
    var that = this
    var uid = wx.getStorageSync("user");
    var goodsid = '';

    if (Object.keys(option).length  != 0){
        goodsid = option.goodsid
    }

    wx.request({ //获取酒店位置
      url: app.url + 'shop/shoplist',
      data: {
        uid: uid.userid,
        goodsid:goodsid
      },
      success: function (res) {
        console.log(res);
        that.setData({
          markers: res.data.data
        });
        wx.getLocation({
          type: 'wgs84',
          success(mres) {
            var map_lat = mres.latitude;
            var map_long = mres.longitude;
            var map_speed = mres.speed;
            var map_accuracy = mres.accuracy;
            that.setData({
              lat: map_lat
            });
            that.setData({
              long: map_long
            });
          }
        });
      }
    });
  },

  //显示对话框
  showModal: function (event) {
    //console.log(event.markerId);
    var i = event.markerId;
    var url = app.url + 'shop/shop';
    var that = this;
    console.log('====get_detail====')
    wx.request({
      url: url,
      data: {
        shopid: i
      },
      success: function (res) {
        console.log(res);
        that.setData({
          myall: res.data.data
        });
      }
    });

    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  opendetail: function (event) {
    console.log('-----跳转商品-----');
    //console.log(event);
    var id = event.currentTarget.dataset.id;
    this.setData({
      id: id
    });
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + id
    }),
      console.log(id);
  },

  calling: function (event) {
    console.log(event)
    var tel = event.currentTarget.dataset.tel;
    this.setData({
      tel: tel
    });
    wx.makePhoneCall({
      phoneNumber: tel,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  // 去地图
  gomap: function (e) {
    var that = this;
    console.log(123)
    console.log(e);
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
})