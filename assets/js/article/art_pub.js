$(function(){

$.get('/my/article/cates',function(res){
    if(res.status ===0){
        var strHTML = template('cate',res)
        $('[name=cate_id]').html(strHTML)
        layui.form.render()

    }
})

var state = '已发布'

$('#caogao').click(function () {
  state = '草稿'
})
// 初始化富文本编辑器
initEditor()



  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview',
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)


  
  $('#file').change(function (e) {
      console.log(e.target);
    var file = e.target.files[0]
    if (!file) return
    var newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })


  //伪造上传按钮
  $('#chooseImage').click(function (e) {
    $('#file').click()
  })


  //   表单提交
  $('#formPub').submit(function (e) {
    e.preventDefault()
    // 根据form数据去实例化FormData数据
    var fd = new FormData($(this)[0])
    // console.log(fd['title']);

    fd.append('state', state)


    $image
    .cropper('getCroppedCanvas',{
      width:400,
      height:280,
    })
    .toBlob(function(blob){
      
      fd.append('cover_img',blob)

      $.ajax({
        url:`/my/article/add`,
        data:fd,
        method:'POST',
        //formdata  要设置
        contentType:false,
        processData:false,
        success:function(res){
          if(res.status === 0){
            window.location.href = '/article/art_list.html'
          }
        }
  
      })
  
    })

    //     fd.forEach(function (v, k) {
    //   console.log(k, v)
    // })


    
  })




})