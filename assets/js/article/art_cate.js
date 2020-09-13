$(function () {
  initTable();

  function initTable() {
    $.get("/my/article/cates", function (res) {
      if (res.status === 0) {
        console.log(res.data);
        // 无#号
        var strHtml = template("tpl-table", res);
        $("tbody").html(strHtml);
      }
    });
  }

  var addIndex = 0;
  var editIndex = 0;

  // 添加分类按钮
  $("#addBtn").on("click", function (e) {
    e.preventDefault();
    // 弹出层
    // area: ['500px', '300px']
    // content:''（将来是表单）
    // open()和close()
    // icon:1

    var strAddHtml = $("#tpl-add").html();

    addIndex = layui.layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      // content的值是很多标签->手写没提示->tempalte
      // content: '<form class="form"><div><input/><input/></div></form>',
      content: strAddHtml,
    });
  });


//确认添加按钮
  // 给body绑定submit事件，触发事件的对象是表单
$('body').on('submit','#addForm',function(e){
e.preventDefault()
$.post('/my/article/addcates',$('#addForm').serialize(),function(res){
    if (res.status=== 0){
        // 关闭弹出层
        layui.layer.close(addIndex)
        // 更新视图
        initTable()

    }
})
})


//编辑按钮出弹层
$('tbody').on('click', '.btn-edit', function (e) {
    e.preventDefault()
    var strEditHtml = $('#tpl-edit').html()

    editIndex = layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '编辑文章分类',
      content: strEditHtml,
    })

    // 获取button的data-Id属性值
    var Id = $(this).attr('data-id')
    // console.log(Id)
    // 根据Id查询对应的文章分类
    //    /my/article/cates/:id ->  参数名字id ->  /my/article/cates/1  ...
    $.get(`/my/article/cates/${Id}`, function (res) {
      if (res.status === 0) {
        // console.log(res.data)
        layui.form.val('editForm', res.data)
      }
    })
  })


  // 代理事件-编辑分类-确定修改
  $('body').on('submit', '#editForm', function (e) {
    e.preventDefault()
    var formdata = $(this).serialize()
    $.post(`/my/article/updatecate`, formdata, function (res) {
      if (res.status === 0) {
        layui.layer.close(editIndex)
        initTable()
      }
    })
  })

  $('tbody').on('click', '.btn-delete', function (e) {
    e.preventDefault()
    var Id = $(this).attr('data-id')
    // console.log(Id)
    // 弹层：
    layer.confirm('Sure?', { icon: 3, title: '真的要把我删除嘛？' }, function (
      index
    ) {
      //do something
      $.get(`/my/article/deletecate/${Id}`, function (res) {
        if (res.status === 0) {
          initTable()
          layer.close(index)
        }
      })
    })
  })





});
