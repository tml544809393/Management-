// 模板群发接口

function templateparm(){
    console.log("参数封装");
    var btn = $("#select").val()

    var url_id = $("#"+btn+"_url_id").val()
    console.log(url_id)
    var params = "{\"template_id\":\""+btn+"\",\"url\":\""+url_id+"\",\"data\":{";
    var len = $("#"+btn+" ul li").length;
    $("#"+btn+" ul li").each(function(index,val){
        var input_value = $("#"+btn+"_template-input_"+(index+1)).val();
        var input_color = $("#"+btn+"_template-input_color"+(index+1)).val();
        if(index == 0){
            params += "\"first\":{\"value\":\""+ input_value +"\",\"color\":\""+input_color+"\"},"
        }else if(index == (len - 2)){
            params += "\"remark\":{\"value\":\""+input_value+"\",\"color\":\""+input_color+"\"}}}";
            return false;
        }else{
            params += "\"keyword"+index+"\":{\"value\":\""+input_value+"\",\"color\":\""+input_color+"\"},"
        }
    })
    console.log("params::::::"+params);

    return params ;
 }
    var tempcolor = '';
    // 拾色器
    function colorbind(template_id,id){
    $('#'+template_id+'_template-color_'+id).colpick({
        colorScheme:'dark',
        layout:'rgbhex',
        color:'#000',
        onSubmit:function(hsb,hex,rgb,el) {
        
            $(el).css('background-color', '#'+hex);
            console.log('#'+hex);
                $('#'+template_id+'_template-size_'+id).children("span").css('color', '#'+hex);
                $('#'+template_id+'_template-input_color'+id).val('#'+hex);
                $(el).colpickHide();
                var tempcolor =  $('#'+template_id+'_template-size_'+id).children("span").css('color', '#'+hex);
           

        }
        })
        .css('background-color', '#000');
    }
// 双向数据绑定
function shujubangding(template_id,id){
    var obj = {};
    Object.defineProperty(obj,'hellos',{
        set:function(val){
            
            document.getElementById(template_id+'_template-input_'+id).value = val;
            // console.log(val)
            if(val != ""){
                $("#"+template_id+'_template-size_'+id).children("span").html(val);
            }
        }
    });
    document.getElementById(template_id+'_template-input_'+id).onkeyup = function(e){
        obj.hellos = e.target.value;
    };
    obj.hellos = "";


}
  
    function moBanJieXi(obj){
		var str1 = obj.content.replace(/\s*/g,"");
		var str2 = str1.replace(/{{.*?.DATA}}/g,"_");
        var array = str2.split("_");
        var fonts_start = `<div class='template-two sel' id='${obj.template_id}'><ul>`;
        var weixin_preview_start = `<div class='template-font' id='${obj.template_id}_prview'><p class='template-time'>
        <span>${obj.title}</span>
        <em></em>
</p>`;

		for(var i=0;i<array.length-1;i++){
            console.log("for array["+(i+1)+"] = "+array[i]+"【字段"+(i+1)+"】");
            
            fonts_start +=`
                    <li>
                    <span>${"字段"+(i+1)}</span>
                    <input id="${obj.template_id}_template-input_`+(i+1)+`">
                    <input id="${obj.template_id}_template-input_color`+(i+1)+`" type="hidden">
                    <div class="color-box" id="${obj.template_id}_template-color_`+(i+1)+`"></div>
                     </li>

            `
           
            weixin_preview_start += `
            <p id="${obj.template_id}_template-size_`+(i+1)+`">`+array[i]+`<span>【字段`+(i+1)+`】</span></p>
            `

            
        }
        var fonts_end = `<li class="herfs">
                        <span>跳转</span>
                        <em>链接</em>
                        <input id="${obj.template_id}_url_id">
                        </li></ul></div>`;
        var weixin_preview_end = `</div>`;
        $(".sc-kXeGPI").append(fonts_start+fonts_end);
        // console.log(weixin_preview_start+weixin_preview_end);
        $(".template-main").append(weixin_preview_start+weixin_preview_end);
        //数据绑定
        for(var i=0;i<array.length-1;i++){
            shujubangding(obj.template_id,i+1);
            colorbind(obj.template_id,i+1);
        }
        
    }
    $("#select").bind("change",function(){
        var value = $(this).val();
        // console.log("selected:::"+value);
        $("#"+value).show().siblings().hide();
        $("#"+value+"_prview").show().siblings().hide();
        $(".mobans").show()
    });
   
    $("#Template").click(function(){
        $.ajax({
            url: "http://192.168.0.206:8080/WechatManagePlatform/message/getTemplateList.do",
            type: "post",
            async: true,
            data: {
                appid:'wx35bca71d3ae21094'
                // getQueryString("appid")
            },
            dataType: "json",
            success: function (data) {
                $.each(data.template_list,function (index,obj) {
                    console.log(data)
                        var options =
                            `
                             <option value="${obj.template_id}" class="optiona">${obj.title}</option>
                            `
                            $("#select").append(options)
                            moBanJieXi(obj)

                            //填充微信预览器
                            
                            
                            


    
                           
                    
                })
            }
        })
    })
        