// projects/index/index.js
var app = getApp();
console.log(app);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theatersArr: [],
    comingfilmArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    this.showMovie('theaters');
    this.showMovie('comingfilm');

  },
  bindMore:function(e){
    console.log(e);
    wx.showLoading({
      title: '加载中',
    });
    setTimeout(function () {
      wx.hideLoading();
      wx.navigateTo({
        url: '../detailList/index?type=' + e.target.dataset.typeId,
      });
    }, 1000);
  },
  showMovie: function (type) {

    wx.request({
      url: app.globalData.baseUrl + app.globalData[type],
      method: 'GET',
      header: { 'content-type': 'json' },
      success: (res) => {
        console.log(res);
        var arr = res.data.subjects;
        let len = arr.length;
        var obj = [];
        for (var i = 0; i < len; i++) {
          let subject = {};
          let images = arr[i].images.small;
          let title = arr[i].title;
          let id = arr[i].id;
          let rateing = arr[i].rating;
          let collect_count = arr[i].collect_count;
          subject = {
            id,
            title,
            images,
            rateing,
            collect_count
          }
          obj.push(subject);
        }
        var target = '' + type + 'Arr';
        this.setData({
          [target]: obj
        });
      },
      complete: () => {
        wx.hideToast();
      }
    });

  },
  searchtap: function () {
    wx.navigateTo({
      url: '../searchInput/index',
    })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})