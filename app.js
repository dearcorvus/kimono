//app.js
App({
  globalData:{
    //开发环境  1 测试环境  2 生产环境

    run_env:1,

    //开发版本号

    dev_version:'2019-11-11-001',
    //通用业务错误提示信息
    common_err_msg:'系统繁忙，请稍后再试 ~',
    //通用网络用语
    common_fail_msg:'网络开小差哦 ~',
    //当前用户
    currentUserInfo:null,
    userInfo: null
  },
  onLaunch: function () {
    let that = this;

    let apiBaseUrl = null;

    if (that.globalData.dev_version) {
      console.log(that.globalData.dev_version);
    }

    switch (that.globalData.run_env) {
      case 0:
        // 0 - 生产环境
        apiBaseUrl = 'http://122.51.113.23/public/kimono/';
        break;
      case 1:
        // 1- 测试环境
        apiBaseUrl = 'http://101.200.123.34:82/public/index.php/api/';
        break;
      case 2:
        // 2- 测试环境
        apiBaseUrl = 'http://think.com/public/index.php/api/';
        break;
      default:
        // 测试环境
        apiBaseUrl = 'http://cover.cn/public/index.php/kimono/';
        break;
    }

    that.globalData.apiBaseUrl = apiBaseUrl;
    that.url = apiBaseUrl + '/';

    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
      console.log(res);
      console.log(res.hasUpdate);
    });

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '小程序有新版本了, 点击 "确定" 立即体验!',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      });
    });

    updateManager.onUpdateFailed(function () {
      console.log('新版本下载失败!');
    });
  },
  onLoad: function (options) {
    var that = this;

  },
  onShow: function (res) {
    let that = this;

  },
  // 登录模态框业务
  preventTouchMove: function () {
    // do nothing. 为了拦截在蒙版上的鼠标滑动
  },
  tabbar: {
    color: "#242424",
    selectedColor: "#fa8582",
    backgroundColor: "#ffffff",
    borderStyle: "#d7d7d7",
    list: [
      {
        pagePath: "/pages/user/user",
        text: "我的",
        selected: false
      },
      {
        pagePath: "/pages/goodslist/goodslist",
        text: "穿和服",
        selected: false
      },
      {
        iconPath: "../../static/images/saom.jpg",
        selected: false
      },
      {
        pagePath: "/pages/hotel/hotel",      
        text: "归还区",
        selected: false
      },
      {
        text: "更多",
        selected: false
      }
    ],
    position: "bottom"
  },
  changeTabBar: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.tabbar;
    for (var i = 0; i < tabBar.list.length; i++) {
      console.log(_pagePath + '--' + tabBar.list[i].pagePath)
      tabBar.list[i].selected = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].selected = true;//根据页面地址设置当前页面状态  
      }
    }
    _curPage.setData({
      tabbar: tabBar
    });
  }, 
})