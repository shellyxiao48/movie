// projects/searchInput/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSearch:true,
    searchValue: "",
    List: {
      offset: 0,
      total: 0,
      subjects: []
    },
    count: 20


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  cancel: function () {
    this.setData({
      searchValue: ""
    });
  },
  search:function(value){
    console.log("value:"+value);
    if(!value) {return false;}
    if (this.data.List.total <= this.data.List.offset && this.data.List.offset != 0) {
      wx.hideToast();
      wx.showToast({
        title: '数据加载完毕',
        duration: 2000,
        icon: 'success'
      });
      return false
    }
    var url = app.globalData.baseUrl + app.globalData.search + value + "&start=" + this.data.List.offset + "&count=" + this.data.count;
    wx.request({
      url,
      method: 'GET',
      header: { 'content-type': 'json' },
      success: (res) => {
        console.log(res);
        let subjectsArr = [];
        res.data.subjects.forEach((ele) => {
          let obj = {};
          let images = ele.images.small,
            title = ele.title,
            average = ele.rating.average,
            year = ele.year,
            id = ele.id,
            directors = ele.directors.map((ele) => ele.name).join("/");
          obj = { images, title, average, year, directors, id };
          subjectsArr.push(obj)
        });
        this.setData({
          List: {
            offset: +this.data.List.offset + this.data.count,
            total: res.data.total,
            subjects: [...this.data.List.subjects,...subjectsArr]
          },
          isSearch: true
        });
        console.log(this.data.List)
      },
      complete: (res) => {
        wx.hideToast();
      }
    });


  },
  bindSearch: function (e) {
    wx.showToast({
      title: '正在加载中',
      duration: 10000,
      icon: 'loading'
    });
    this.setData({
      List: {
        offset: 0,
        total: 0,
        subjects: []
      }
    });
    this.setData({
      searchValue: e.detail.value
    })
    this.search(e.detail.value);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },
  scrollbottom:function(e){
    console.log("到底了")
    this.search(this.data.searchValue);
  },
  cancle:function(){
    this.setData({
      searchValue:""
    })
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