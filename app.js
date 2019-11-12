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
        apiBaseUrl = '';
        break;
      case 1:
        // 1- 测试环境
        apiBaseUrl = 'http://cover.cn/public/index.php/kimono/';
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
})