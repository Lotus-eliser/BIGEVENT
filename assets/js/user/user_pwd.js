$(function(){
//利用layui  框架加校证功能
layui.form.verify({
    len: [/^\S{6,12}$/, '长度必须6到12位，不能有空格'],

    diff:function(value){
        if($('#oldpwd').val() === value){
            return  '新密码不能和原密码相同！'
        }
    },


    same:function(value){
       if($('#newpwd').val() !== value) {
           return '新密码和确认密码必须相同！'
       }
    }
}),


//点击修改密码按钮  发送请求更改密码  成功重置按钮触发
$('#changePwd').click(function(e){
    e.preventDefault()
    $.post('/my/updatepwd',$('#formInfo').serialize(),function(res){
        if(res.status == 0){
            layui.layer.msg(res.message)
            $('#btn-reset').click
            // window.location.href = '/login.html'
        }
        
    })



})
})