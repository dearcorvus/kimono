// 本组件为搜索组件
// 需要传入addflag   值为true / false （搜索框右侧部分）
// 若显示搜索框右侧部分   需传入右侧图标url以及addhandle函数

const app = getApp();


Component({

  properties: {

    addflag: {    //显示搜索框右侧部分
      type: Boolean,
      value: false,
      observer(newVal, oldVal, changedPath) {

      }
    },
    addimg: {       //显示搜索框右侧部分icon
      type: String,
      value: ''
    },
    searchstr: {     //input  值
      type: String,
      value: ''
    },
    searchflag: {
      type: Boolean,
      value: false,
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表

   */
  methods: {

    //获得焦点
    getfocus() {
      this.setData({
        searchflag: true,
      })
    },
    //搜索框右侧按钮事件
    addhandle() {
      this.triggerEvent("addhandle");
    },
    //搜索输入
    searchList(e) {
      this.triggerEvent("searchList", e);
    },
    //查询
    endsearchList(e) {
      this.triggerEvent("endsearchList");
    },
    //失去焦点
    blursearch(e) {
      var taht = this;
      var search = e.detail.value;
      console.log(search)
      wx.request({
        url: app.url+ 'search',
        data: {
          search: search
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        success: function(res) {
          console.log(res.data.data)
          taht.setData({
            'goods_item': res.data.data
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    // 取消
    cancelsearch() {
      this.setData({
        searchflag: false,
      })
      this.triggerEvent("cancelsearch");
    },
    //清空搜索框
    activity_clear(e) {
      this.triggerEvent("activity_clear");
    },

  }
})
