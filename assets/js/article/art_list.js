$(function () {
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: $('[name=cate_id]').val(),
    state:$('[name=state]').val(),
  };

  //   获取列表数据
  initTable();
  function initTable() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        console.log(res);
        if (res.status === 0) {
          // res.data
          // res.total
          var strHTML = template("tpl-table", res);
          $("tbody").html(strHTML);
          // 调用渲染分页
          renderPage(res.total);
        } else {
          layer.msg(res.message);
        }
      },
    });
  }

  // 初始化文章分类的方法
  initCate();
  function initCate() {
    $.get(`/my/article/cates`, function (res) {
      if (res.status === 0) {
        var strHtml = template("tpl-cate", res);
        $("[name=cate_id]").html(strHtml);
        layui.form.render();
      }
    });
  }

  //  筛选
  $("#form-search").submit(function (e) {
    e.preventDefault();
    var cate_id = $("[name=cate_id]").val();
    q.cate_id = cate_id;
    var state = $("[name=state]").val();
    q.state = state;
    // console.log(q);
    initTable();
  });


// initList末尾调用renderPage 
// 渲染分页
function renderPage(total) {
    console.log(total)

    layui.use('laypage', function () {
      var laypage = layui.laypage
      //执行一个laypage实例
      laypage.render({
        elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        curr: q.pagenum,
        limit: q.pagesize,
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits: [2, 3, 5, 10],
        jump:function(obj,first){
            //obj 包含了当前分页的所有参数,

            q.pagenum = obj.curr
            q.pagesize = obj.limit
            if (!first) {
                //do something
                initTable()
              }
           
        }
      })
    })
  }


  // 删除文章
  $('tbody').on('click', '.delete', function (e) {
    e.preventDefault()
    var len = $('.delete').length
    
    var Id = $(this).attr('data-id')
    layer.confirm('is not?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.get(`/my/article/delete/${Id}`, function (res) {
        if (res.status === 0) {
          console.log(len)
          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          initTable()
          layer.close(index)
        }
      })
    })
  })







});
