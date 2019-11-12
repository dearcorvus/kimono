//app.js
App({
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
        pagePath: "/pages/goods/goods",
        text: "穿和服",
        selected: false
      },  
      {
        pagePath: "/pages/fabu/fabu",
        iconPath: "../../static/images/saom.jpg",
        selected: false
      },          
      {
        pagePath: "/pages/hotel/hotel",
        text: "归还区",
        selected: false
      },
      {
        pagePath: "/pages/user/user",
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