// pages/cal/cal.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: "0",
    idClean: "clear",
    idBack: "back",
    idChu: "÷",
    idMultiply: " x ",
    idPoint: ".",
    idLess: " - ",
    idAdd: " + ",
    idYu: " % ",
    idSum: " = ",
    id1: "1",
    id2: "2",
    id3: "3",
    id4: "4",
    id5: "5",
    id6: "6",
    id7: "7",
    id8: "8",
    id9: "9",
    id0: "0",
    operaSymbo: {
      "+": "+",
      "-": "-",
      "*": "*",
      "÷": "/",
      ".": ".",
      "%":"%"
    },
    lastIsOperaSymbo: false,
    iconType: 'waiting_circle',
    iconColor: 'white',
    arr: [],
    logs: []
  },
  handleBtnClick: function(event) {
    var id = event.target.id;

    //后退键
    if (id == this.data.idBack) {
      console.log('back...');
      var data = this.data.total;
      if (data == "0") {
        return;
      }

      //substring(x, y) 从x到y前的位置停止
      data = data.substring(0, data.length - 1);

      if (data == "" || data == "-") {
        data = 0;
      }

      this.setData({
        "total": data
      })

      //pop() 方法用于删除并返回数组的最后一个元素
      this.data.arr.pop();

    } else if (id == this.data.idClean) { //清空
      console.log('clean...');
      this.setData({
        "total": "0"
      })
      this.data.arr.length = 0;
    } else if (id == this.data.idSum) { //等于
      console.log('equals...');
      var data = this.data.total; 
      if (data == "0") {
        return;
      }

      /**
       * 判断最后一位，若是操作符，则不运算
       * isNaN()函数用于检查其参数是否是非数字值
       * charAt()方法可返回指定位置的字符
       */
      var lastWorld = data.charAt(data.length);

      if (isNaN(lastWorld)) {
        return;
      }

      var num = "";

      var lastOperator = "";
      var arr = this.data.arr;
      var optarr = [];
      for (var i in arr) {
        if (isNaN(arr[i]) == false) {
          num += arr[i];
        }else {
          lastOperator = arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num = "";
        }
      }

      optarr.push(Number(num));

      var result = Number(optarr[0]) * 1.0;
      // console.log(result);
      for (var i = 1; i < optarr.length; i++) {
        if (isNaN(optarr[i])) {
          if (optarr[1] == this.data.idAdd) {
            result += Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.idLess) {
            result -= Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.idMultiply) {
            result *= Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.idChu) {
            result /= Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.idYu) {
            result %= Number(optarr[i + 1]);
          }
        }
      }

      //存历史记录
      this.data.logs.push(data + ' = '+ result);
      wx.setStorageSync("calclogs", this.data.logs);

      this.data.arr.length = 0;
      this.data.arr.push(result);

      this.setData({
        "total": result + ""
      })

    } else { //运算符、数字和点
      if (this.data.operaSymbo[id]) {
        if (this.data.lastIsOperaSymbo || this.data.screenData == "0") {
          return;
        }
      }

      var total = this.data.total;
      var data;
      if (total == 0) {
        data = id;
      } else {
        data = total + id;
      }

      this.setData({
        'total': data
      })

      this.data.arr.push(id);

      //最后一位是否为运算符标志
      if (this.data.operaSymbo[id]) {
        this.setData({
          "lastIsOperaSymbo": true
        });
      } else {
        this.setData({
          "lastIsOperaSymbo": false
        });
      }

    }
  },
  historyBtnClick: function() {
    wx.navigateTo({
      url: '../history/history'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})