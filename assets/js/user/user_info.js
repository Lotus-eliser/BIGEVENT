$(function () {
  layui.form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在1~6个字符之间'
      }
    },
  })
  
  initUserInfo()
  function initUserInfo () {
    $.get("/my/userinfo", function (res) {
      if (res.status === 0) {
        // console.log(res);
        layui.form.val('formInfo',res.data)
        // $("#uname").html(res.data.username);
      }
    });
    
  };


  //重置按钮  
  $('#btn_reset').click(function(e){
    // e.preventDefault()
    // $('layui-form').reset()   //会让登录名称也清空  采用再次调用userinfo ();
    // userinfo ();
    e.preventDefault()
    initUserInfo()
  })

$('#formupdate').submit(function(e){
  e.preventDefault()
  $.post('/my/userinfo',$(this).serialize(), function(res){
    if (res.status === 0) {
      // 更新页面信息（之前的请求）=》 两种方式
      // 1. 把index.js的getUserInfo再写一遍
      // 2. 调用父页面中的方法getUserInfo()

      // console.log(window.parent.getUserInfo)
      window.parent.getUserInfo()
    }
  })
})


});
