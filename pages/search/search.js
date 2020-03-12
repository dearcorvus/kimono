// pages/search/search.js
Page({
  data: {
    inputShowed: false,
    inputVal: ""
  },
  onLoad() {
    this.setData({
      search: this.search.bind(this),
      goods_item:this.search.bind
    })

  },
  search: function (value) {
    var that = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{ text: '搜索结果', value: 1 }, { text: '搜索结果2', value: 2 }])
      }, 200)
    })
  },

})