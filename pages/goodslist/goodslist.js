// pages/goodslist/goodslist.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    nav:1,
    type_item: [],
    goods_item:[],
    showtype:'ALL',
    tid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow:function(){
    var that = this
    wx.showToast({
      icon: 'loading',
      duration: 2000,
    })
    that.setData({
      goods_item: []
    })
    this.searchFunction();
  },
  onLoad: function (options) {
    var that = this
  },
  listenerButton: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  listenerActionSheet: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  TypeFunction: function(env){
    this.setData({
      showtype: env.currentTarget.dataset.val,
      actionSheetHidden: true,
      goods_item:[],
      tid: env.currentTarget.dataset.id
    })
    this.searchFunction(env.currentTarget.dataset.id,1);
  },
  urlshop:function(e){
    let that = this
    let num = e.currentTarget.dataset.val
    let nav = that.data.nav
    let dat = nav === 1 ? 2 : 1

    if(num != nav){
      that.setData({
        nav: dat,
        goods_item:[],
        showtype: 'ALL'
      })
      this.searchFunction();
    }
  },
  searchFunction:function(tid='',page=1){
    var that =this
    var id = that.data.nav;
    let ranklistBefore = that.data.goods_item;

    wx.request({
      url:app.url+ 'goods/list',
      data:{
        id:id,
        tid:tid,
        page:page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success:function(res){

        // 每次加载数据,请求一次就发送10条数据过来
        let eachData = res.data.data.goodslist.data;
        console.log(eachData)
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
            goods_item: ranklistBefore.concat(eachData),
            type_item: res.data.data.type,
            loadText: "加载更多",
            loading: false,
            page: res.data.data.goodslist.current_page
          });    

        console.log(that.data.goods_item) ;     
      }
    })
  },
  /**
* 页面上拉触底事件的处理函数
*/
  onReachBottom: function () {
    var that = this;
    var page = that.data.page;
    var tid = that.data.tid;

    that.searchFunction('', Number(page) + Number(1));
  },
})