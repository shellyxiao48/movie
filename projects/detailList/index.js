// projects/detailList/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstselected: true,
    theatersArr: {
      offset:0,
      total:0,
      subjects:[
      ],
      isSearch:false
      
    },
    showArr:{},
    comingfilmArr: {
      offset:0,
      total:0,
      subjects:[
      ]
      },
    count:10
  },
  clickTab: function (e) {
    console.log(e);
    var index = e.target.dataset.typeId;
    let firstselected = true;
    let type = 'theaters'
    if (index == 1) {
      firstselected = false;
      type ='comingfilm'
    }
    let target = type+'Arr';
    // 数据归0
    this.setData({
      "firstselected": firstselected,
      [target]:{
        offset:0,
        total: 0,
        subjects: []
      }
    });
    this.showMovie(type);
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = options.type;
    console.log(value)
    if (value !=='theaters'){
      this.setData({
        firstselected:false
      })
      
    }
    this.showMovie(value);
  },
  showMovie: function (type) {
    console.log("type:"+type);
    wx.showToast({
      title: '正在加载中',
      duration:10000,
      icon:'loading'
    });
    let self=this;
    let target = '' + type + 'Arr';
    console.log(this.data[target])
    if (this.data[target].total <= this.data[target].offset && this.data[target].offset!=0) {
      wx.hideToast();  
      wx.showToast({
        title: '数据加载完毕',
        duration: 2000,
        icon: 'success'
      });    
      return false
    }
    wx.request({
      url: app.globalData.baseUrl + app.globalData[type] + "?start=" + self.data[type+'Arr'].offset + "&count=" + self.data.count,
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
          let directors = arr[i].directors.map((ele) => ele.name).join("/");
          let casts = arr[i].casts.map((ele) => ele.name).join("/");
          let genres = arr[i].genres.join("/");
          subject = {
            id,
            title,
            images,
            rateing,
            collect_count,
            directors,
            casts,
            genres
          }
          obj.push(subject);
        }
        // console.log("total:")
        // console.log(res.data.total);
        this.setData({
          [target]:{
            offset: +this.data[target].offset+res.data.count,
            total: res.data.total,
            subjects: [...this.data[target].subjects,...obj]

          },
          showArr: [...this.data[target].subjects, ...obj]
        });
        console.log(this.data[''+type+'Arr']);
        
      },
      complete: (res) => {
        wx.hideToast();
      }
    });

  },
  // 滑到底部时触发事件
  scrollbottom:function(){
    let type=''
    if (this.data.firstselected){
      type = 'theaters';
    }else{
      type = 'comingfilm';
    }
   
    this.showMovie(type);
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