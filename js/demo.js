   window.onload = function(){
           $(".cont").show();
           $(".yulan").show();
           $(".send").hide();
           $(".xuanze").show();
           $(".template").hide();
           $(".template-main").hide();
           $(".yulans").show();
           $("#classify").val("senior");
   }
   // 获取弹窗
   var modal = document.getElementById('myModal');
   var btn = document.getElementById("myBtn");
   var span = document.querySelector('.close');
   var guanbi = document.querySelector('.closes');
   // 发送记录接口
   String.prototype.format = function () {
       var result = this;
       // 数据长度为空，则直接返回
       if (arguments.length == 0){
           return this;
       }

           // 使用正则表达式，循环替换占位符数据
       for (var i = 0; i < arguments.length; i++){
           result = result.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
       }
       return result;
   };
   btn.onclick = function() {
       modal.style.display = "block";
   }
   span.onclick = function() {
       modal.style.display = "none";
   }
   guanbi.onclick = function() {
       modal.style.display = "none";
   };
   window.onclick = function(event) {
       if (event.target == modal) {
           modal.style.display = "none";
       }
   }
   // 发送记录点击事件
       $("#fasong").click(function(){
           $(".cont").hide();
           $(".yulan").hide();
           $(".send").show();
       });
//    $("#qunfa").click(function(){
//        $(".cont").show();
//        $(".yulan").show();
//        $(".send").hide();
//        $(".xuanze").show();
//        $(".template").hide();
//        $(".template-main").hide();
//        $(".yulans").show();
//        $("#classify").val("senior");
//    })
   $("#service").click(function(){
       $(".send").hide();
       $(".yulan").show();
       $(".cont").show();
       $("#classify").val("service");
       $(".xuanze").show();
       $(".template").hide();
       $(".yulans").show();
       $(".template-main").hide();
   })
   $("#Template").click(function(){
       $(".send").hide();
       $(".cont").show();
       $(".yulan").show();
       $(".xuanze").hide();
       $(".template").show();
       $(".yulans").hide();
       $(".template-main").show();
       $("#classify").val("templ");

   })
   // 选中li的颜色
   $(".uls ul li").click(
       function() {
           $(this).css("color","#6f7eff").siblings().css("color","#000");
           $(this).css("border-right","2px solid blue").siblings().css("border-right","none");
       });
    $(".wenzi ul li").click(
       function() {
        //    $(this).css("color","#6f7eff").siblings().css("color","#000");
           $(this).css("border-right","2px solid blue").siblings().css("border-right","none");
       });

   // 图文消息
   $(".tuwenxiaoxi").click(function(){
       $(".bianjis").hide();
       $(".message").show();
       $("#msgtype").val("mpnews");
   });
   $(".wenzis").click(function(){
       $(".bianjis").show();
       $(".message").hide();
       $("#msgtype").val("text");
   })
  // 获取texteara的值
  $("#trues").click(function(stextArea){
    var msgtype = $("#msgtype").val()
    if(msgtype=="text"){
        stextArea = $("#textareas").val();
        if($("#textareas").val()==''){
            alert('请填写内容')
        }else{
            $(".yulans").html(stextArea);
            $("#myModal").hide();
            console.log(stextArea);
        }
    }else{
        $("#myModal").hide();
    }
});
   $(".duixiang ul li").click(
       function() {
           $(this).css("background","#6f7eff").siblings().css("background","#fff");
       });


 // 双向数据绑定 编辑、预览
//  window.onload=function(){
 var obj = {};
    Object.defineProperty(obj,'hello',{
        set:function(val){
            document.getElementById('bianjibox').innerHTML = val;
            document.getElementById('textareas').value = val;
        }
    });
    document.getElementById('textareas').onkeyup = function(e){
        obj.hello = e.target.value;
    };
    obj.hello = "";
// }
 // 选择群发对象标签
 var sid = '';
    $.ajax({
        url: "http://test.micejiazu.cn/tagsCtrl/get.do",
        type: "post",
        data: {
            appid:getQueryString("appid"),
            data:{},
            // token:'wxd77edf46d7b1eaba'
        },
        dataType: "json",
        success: function (data) {
            $.each(data.tags,function(index,obj){
                var json = $.parseJSON(JSON.stringify(obj));
                // console.log(json)
                $(".duixiang ul").append(`
                     <li id='${json.id}'>${json.name}</li>
                `)
                // var all =  <li id='all'>所有粉丝</li>
                // $("duixiang ul").html(all)
                // console.log(all)
 // 选中标签
           $(".duixiang ul li").click(
            function() {
                $(this).css("background","#6f7eff").siblings().css("background","#fff");
                // var ids = $(this).attr("id")
                 sid = $(this).attr("id")
                // $("#tagid").val(ids);
                console.log(sid)
                
         });
          
            });
        }
    });


 //////////////////////////////////// 同步图文消息列表
 $(".tongbu").click(function(){
    $.ajax({
        url: "http://test.micejiazu.cn/message/getMaterialList.do",
        type: "post",
        async: true,
        data: {
            type:"news",
            offset:0,
            count:10,
            appid:getQueryString("appid")
        },
        dataType: "json",
        success: function (data) {
            $(".ss").empty()
            $.each(data.item, function (index, obj) {
                var json = $.parseJSON(JSON.stringify(obj));
                // console.log(JSON.stringify(obj));
                console.log(json.media_id)
                
                // 时间戳
                var date = new Date(json.update_time*1000);
                Y = date.getFullYear() + '-';
                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                D = date.getDate() + ' ';
                h = date.getHours() + ':';
                m = date.getMinutes() + ':';
                s = date.getSeconds();
                times = Y+M+D+h+m+s;
                // 时间戳结束
                var html = '';
                var news_item_length = obj.content.news_item.length;
                // 多图文
                if(news_item_length>1){
                    var start = `<div class="grap" media_id="${json.media_id}">
                    <p><span>${times}</span><a href="${obj.content.news_item[0].url}" target="_blank">查看链接</a></p>
                    <div class="tuwenimg"> <img src="${obj.content.news_item[0].thumb_url}"></div>
                    <em>${obj.content.news_item[0].title}</em>`;

                    var body = "";
                    for(var i=1;i<obj.content.news_item.length;i++){
                        body +=  `<div class="grap-one">
                        <span>${obj.content.news_item[i].title}</span>
                        <img src="${obj.content.news_item[i].thumb_url}">
                     </div>`;
                    }
                    var end =  `<div class="mase"></div> `;
                    $(".ss").append(start+body+end);
                }else{
                    // 单图文
                $.each(obj.content.news_item,function(index, obj){
                    // console.log(" obj:"+obj.title+" times:"+times);
                    $(".ss").append(`
                            <div class="grap" media_id="${json.media_id}">
                                <p><span>${times}</span><a href="${obj.url}" target="_blank">查看链接</a></p>
                                <div class="tuwenimg"> <img src="${obj.thumb_url}"></div>
                                <em>${obj.title}</em>
                                <div class="mase"></div>
                            </div>
                    `)
                });
                }
                $(".ss .grap").each(function(index,obj){
                    var off= true;
                    $(this).click(
                        function() {
                            if($(".mase").css("display","block")){
                                $(".mase").css("display","none")
                            }
                            if(off){
                                $(this).find('.mase').show();
                                var meadid=$(this).attr("media_id")
                                $("#tagid").val(meadid)
                                console.log(meadid)
                            }else{
                                $(this).find('.mase').hide();
                            }
                            off=!off
                            
                        });
                })
            });
        }
    });
})

// 立即群发点击按钮
$("#once").click(function(){
   
    var sify = $("#classify").val();
    if(sify=="senior"){
        alert("高级群发")
   
    var msgtype = $("#msgtype").val();
    var tagid = $("#tagid").val()
    var content = $(".yulans").html();
    var params;
    if(msgtype == "text"){
        params={
            appid:getQueryString("appid"),
            msgtype:"text",
            label:sid,
            message:content
        }
    }else if(msgtype == "mpnews"){
        params={
			msgtype:"mpnews",
			label:sid,
			mediaId:tagid,
            appid:getQueryString("appid")
        }
    }
    $.ajax({
        url:'http://test.micejiazu.cn/message/sendAllToLabel.do',
        type:"post",
        data:params,
        dataType:"json",
        success:function(data) {
            if(data.result==0){
                alert('发送失败，请重新发送')
            }else(
                alert('发送成功')
    )
        }
    })
}else if(sify=="service"){
    // 客服群发接口
    var sify = $("#classify").val();
        alert("客服群发")
        var msgtype = $("#msgtype").val();
        var tagid = $("#tagid").val();
        var content = $(".yulans").html();
        var params;
        if(msgtype == "text"){
            params={
                appid:getQueryString("appid"),
                msgtype:"text",
                label:sid,
                message:content
            }
        }else if(msgtype == "mpnews"){
            params={
                msgtype:"mpnews",
                label:sid,
                mediaId:tagid,
                appid:getQueryString("appid")
            }
        }
        $.ajax({
            url:'http://test.micejiazu.cn/message/sendKFMsgToLable.do',
            type:"post",
            data:params,
            dataType:"json",
            success:function(data) {
                if(data.result==0){
                    alert('发送失败，请重新发送')
                }else(
                    alert('发送成功')
        )
            }
        })
    
    }else if(sify=="templ"){
        var params=templateparm()
        alert("模板群发")
        alert(params)
        param={
            appid:'wx35bca71d3ae21094',
            label:112,
            templateMsg:params
        }
        $.ajax({
            url:'http://192.168.0.206:8080/WechatManagePlatform/message/sendTemplateMsg.do',
            type:"post",
            data:param,
            dataType:"json",
            success:function(data) {
              alert("模板群发成功")

            }
        })

    }
})


$("#fasong").click(function(){
    $.ajax({
        url: "http://test.micejiazu.cn/message/querySendRecord.do",
        type: "post",
        async: true,
        data: {
            appid:"wx35bca71d3ae21094",
            // getQueryString("appid"),
            pageSize:10,
            currentPage:1,
        },
        dataType: "json",
        success: function (data) {
             var json = $.parseJSON(JSON.stringify(data));
             console.log("data="+json)
                
            $(".empt").empty()
            $.each(data,function(index,obj){
                //console.log(obj.conten)

                var json = $.parseJSON(JSON.stringify(obj.content));
                var content;
                if(obj.msgType == "mpnews"){
                    content = $.parseJSON(json);
                    console.log(content.news_item[0].title)
                    var news_length = content.news_item.length;
                    // console.log(news_length)
                    if(news_length>=1){
                        var begin = `
                        <div class="empt">
                        <div class="neirong">
                        <ol>
                            <li class="image-text">
                                <div class="image-box">
                                   <img src="${content.news_item[0].thumb_url}">
                                   <em>${content.news_item[0].title}</em>
                        `
                        var mains = '';
                        console.log(content.news_item.length)
                            for(var i=0;i<content.news_item.length;i++){
                                mains += `
                                <div class="image-two">
                                <span>${content.news_item[0].title}</span>
                                <img src="${content.news_item[0].thumb_url}">
                                </div> </div> </li>
                                `
                            }
                       var imagetext = `
                            <li>{0}</li>
                            <li>${obj.totalCount}</li>
                            <li>{1}</li>
                            <li>${createTime}</li>
                            <li>详情</li>
                    `  
                    }
                }

                var date = new Date(obj.createTime);
                Y = date.getFullYear() + '-';
                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                D = date.getDate() + ' ';
                h = date.getHours() + ':';
                m = date.getMinutes() + ':';
                s = date.getSeconds();
                createTime = Y+M+D+h+m+s;
                console.log(createTime)
                    var html=`
                        <div class="empt">
                        <div class="neirong">
                        <ol>
                            <li>{0}</li>
                            <li>{1}</li>
                            <li>${obj.totalCount}</li>
                            <li>{2}</li>
                            <li>${createTime}</li>
                            <li>详情</li>
                        </ol>
                        </div>
                        </div>
                    ` 
                        var msgStatus = "";
                        var sendType = "";
                        if(obj.msgStatus=="SEND_SUCCESS"){
                            msgStatus = "发送成功";
                        }else{
                            msgStatus = "发送失败";
                        }
                        if(obj.sendType=="KF"){
                            sendType = "客服群发";
                        }else if(obj.sendType=="GJ"){
                            sendType = "高级群发";
                        }
                    if(obj.msgType=="text"){
                       
                        $(".send-one").append(html.format(obj.content,sendType, msgStatus));
                    }else if(obj.msgType == "mpnews"){
                        console.log( msgStatus)
                        content = $.parseJSON(json);
                        $(".send-one").append((begin+mains+imagetext).format(sendType, msgStatus));
                    }
                
            })
        }
    })
})