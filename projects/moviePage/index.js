// projects/moviePage/index.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '正在加载中',
      duration: 10000,
      icon: 'loading'
    });
    wx.request({
      url: app.globalData.baseUrl + app.globalData.moviedetail + options.id ,
      method:'GET',
      header:{"content-type":'json'},
      success:(res)=>{
        console.log(res);
        var json=res.data;
        let image = json.images.small,
            title= json.title,
            year = json.year,
            genres = json.genres.join("/"),
            original_title = json.original_title,
            countries = json.countries.join("/"),
            summary= json.summary,
            casts= json.casts,
            rating = json.rating,
        ratings_count = json.ratings_count
        this.setData({
          movieObj:{
              image,
              title,
              year,
              genres,
              original_title,
              countries,
              summary,
              casts,
              rating,
              ratings_count
          }
        });
      },
      complete:(res)=>{
        wx.hideToast();
              }
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