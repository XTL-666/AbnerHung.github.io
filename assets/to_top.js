Page({
    

  /**
   * 页面的初始数据
   */
  data: {
    
   showTop：flase
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },
//回顶部
onPageScroll: function (e) {
    
  console.log(e.scrollTop)
  if (e.scrollTop > 300) {
    
    this.setData({
    
      showTop: false
    })
  } else {
    
    this.setData({
    
      showTop: true
    })
  }
},
goTop: function (e) {
     // 一键回到顶部
  if (wx.pageScrollTo) {
    
    wx.pageScrollTo({
    
      scrollTop: 0,
      duration: 300
    })
  } else {
    
    wx.showModal({
    
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
},
})
