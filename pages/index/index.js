//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isuserInfo: false,
    tabbar: {},
  },
  onLoad: function (options){
    //调用app中的函数
    app.changeTabBar();
  },

  // 用户授权
  bindGetUserInfo: function (e) {
    var that = this;
    console.log(e);

    //此处授权得到userInfo
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.login({
        success: function (result) {
          //console.log("uuuuuuuuuuuuuuu", result.code);
          if (result.code) {
            wx.getUserInfo({
              success: function (res) {
                console.log(res);
                wx.request({
                  url: app.url + 'login/getOpenid',
                  data: {
                    js_code: result.code
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function (ress) {
                    console.log("获取用户信息？", ress.data);
                    //获取用户信息(头像,姓名，openid)
                    var usermsg = {};
                    usermsg.img = res.userInfo.avatarUrl;
                    usermsg.nickName = res.userInfo.nickName;
                    usermsg.openid = ress.data.openid;
                    usermsg.js_code = result.code;
                    wx.setStorageSync('user', usermsg);
                    wx.request({
                      url: app.url + 'login/login',
                      data: {
                        openid: ress.data.openid,
                        nickName: res.userInfo.nickName,
                        avatarUrl: res.userInfo.avatarUrl
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function (res) {
                        console.log("保存成功", res);
                        that.setData({
                          isuserInfo: false,
                        });
                      }
                    })
                  }
                })
              },
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

    } else {
      that.setData({
        isuserInfo: false
      });
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //获取用户信息缓存
    wx.getStorage({
      key: "user",
      success: function (res) {
        console.log("获取缓存成功", res);
        that.setData({
          isuserInfo: false
        })
      },
      fail: function (res) {
        console.log("获取缓存失败");
        that.setData({
          isuserInfo: false
        })
      }
    });
  },  
})
