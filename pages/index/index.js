//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isuserInfo: false,
    username:'客官',
    tabbar: {},
    bannerInfo:[],
    top:'../../static/images/header.jpg',
    mobile:'15383412876'
  },
  onLoad: function (options){
    wx.showToast({
      icon: 'loading',
      duration: 2000
    })
    //调用app中的函数
    app.changeTabBar();

  },

  // 用户授权
  bindGetUserInfo: function (e) {
    var that = this;

    //此处授权得到userInfo
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.login({
        success: function (result) {

          if (result.code) {
            wx.getUserInfo({
              success: function (res) {

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
                      success: function (r) {
                        console.log(r)
                        usermsg.userid = r.data.userid;
                        usermsg.tel = r.data.tel;
                        wx.setStorageSync('user', usermsg);
                        wx.setStorageSync('status', r.data.status);
                        that.setData({
                          isuserInfo: false,
                          username: res.userInfo.nickName
                        });
                        that.infoFunction(r.data.status);
                        // console.log("获取缓存成功", );
                        that.payorder(r.data.userid)
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
    this.checksession();
    //获取用户信息缓存
    wx.getStorage({
      key: "user",
      success: function (res) {
        // console.log("获取缓存成功", );
        that.payorder(res.data.userid)
        if (res.data.userid){
          that.setData({
            isuserInfo: false,
            username:res.data.nickName
          })
        }else{
          that.setData({
            isuserInfo: true
          })
        }

      },
      fail: function (res) {
        // console.log("获取缓存失败");
        that.setData({
          isuserInfo: true
        })
      }
    });
    this.bannerInfo();
  },
  Saom:function(){
    var uid = wx.getStorageSync("user");
    var status = wx.getStorageSync("status");

    if (status == 1) {
      wx.redirectTo({
        url: '../info/info',
      })
    }
    if (status == 2) {
      wx.navigateTo({
        url: '../pay/pay',
      })
    }

    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        if (res.errMsg == "scanCode:ok"){
          console.log(res.result)
          if (res.result){
            wx.request({
              url: app.url + 'Saom/index',
              data:{
                goodsid: res.result,
                userid: uid.userid
              },
              method:'GET',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function(r) {
                  console.log(r)
                  if(r.data.code == 200){
                    wx.navigateTo({
                      url: "/pages/goods/goods?type=1&detail=" + r.data.data.goodsid + "&order_id=" + r.data.data.order_id
                    })
                  }else{
                    wx.showToast({
                      title: r.data.massage,
                      icon: 'none',
                      duration: 2000
                    })
                  }
              },
              fail: function(res) {
                  // console.log(res)
              },
            })
          }
        }
      }
    })  
  },
  //显示对话框
  showModal: function (event) {
    var that = this;
    // console.log('====get_detail====')

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
  //banner点击跳转
  click_swiper: function (e) {
    var url = e.currentTarget.dataset.url
    if (url != undefined) {
      wx.navigateTo({
        url: url,
      })
    }
  }, 
  bannerInfo:function(page=1){
    var that = this 
    let ranklistBefore = that.data.bannerInfo;

    wx.request({
      url: app.url+'index/index',
      data: {
        page:page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        // 每次加载数据,请求一次就发送10条数据过来
        let eachData = res.data.data.banner.data;
        if (eachData.length == 0) {
          wx.showToast({
            title: '没有更多数据了!~',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '数据加载中...',
            icon: 'none'
          })
        }

        that.setData({
          loadText: "数据请求中",
          loading: true,
          bannerInfo: ranklistBefore.concat(eachData),
          mobile: res.data.data.mobile,
          top: res.data.data.top,
          loadText: "加载更多",
          loading: false,
          page: res.data.data.banner.current_page
        });
      },
    })
  },
  infoFunction:function(i){
    if(i==1){
      wx.redirectTo({
        url: '../info/info',
      })
    }
    if(i==2){
      wx.navigateTo({
        url: '../pay/pay',
      })     
    }
  },
  problem:function(){
    wx.navigateTo({
      url: '../problem/problem',
    })
  },
  goodsFunction:function(e){
    var goodsid = e.currentTarget.dataset.val
    if (goodsid){
      console.log(goodsid)
      wx.navigateTo ({
        url: '../goods/goods?type=2&detail=' + goodsid
      })
    }

  },
  payorder:function(id){
    var that = this
    wx.request({
      url: app.url +'order/payorder',
      data:{
        id:id
      },
      type:'post',
      success:function(res){
        if(res.data.code === 200){
          console.log(res.data.order_id)
          wx.redirectTo({
            url: '../orderinfo/orderinfo?orderid=' + res.data.order_id
          })
        }
      }
    })
  },
  //联系客服
  callfunction:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.val //仅为示例，并非真实的电话号码
    })
  },

  //验证登录是否过期
  checksession: function () {
    var that= this;
    wx.checkSession({
      success: function (res) {
        console.log(res, '登录未过期')
        // wx.showToast({
        //   title: '登录未过期啊',
        // })
      },
      fail: function (res) {
        console.log(res, '登录过期了')
        wx.showModal({
          title: '提示',
          content: '你的登录信息过期了，请重新登录',
        })
        that.setData({
          isuserInfo: true
        })
      }
    })
  },
  /**
* 页面上拉触底事件的处理函数
*/
  onReachBottom: function () {
    var that = this;
    var page = that.data.page;
    console.log(page)
    that.bannerInfo( Number(page) + Number(1));
  },
})
