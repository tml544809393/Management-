$(function(){
    var appid = getQueryString("appid");
    var nickName = getQueryString("nickName");
    if(appid){
        clickAppids(appid,nickName);
    }else{
        // alert('/')
    }
    //退出登陆
    $('#out').click(function(){
        
    })
    //显示创建新标签 窗口
    $('#addbox').click(function(){
        $('.groupsbox').show()
    })
})
//var testUrl = "http://test.micejiazu.cn";//测试域名
var testUrl = "http://shenxiu.micejiazu.cn";//正式域名
//var testUrl = "http://localhost:8080/WechatManagePlatform/" //本地

// 登陆
    var login = function(){

        var username = $('input[name=username]').val();
        var password = $('input[name=password]').val();
        $.ajax({ 
            url: testUrl+"/loginCtrl/login.do",
            dataType:"json",
            type:"POST",
            data:{
                username:username,
                password:password
            },
            success: function(data){
                window.location.href = testUrl+"/html/weixin.html";
            }
        });
    }
    // 登出
    var out = function () { 
        $.ajax({ 
            url: testUrl+"/loginCtrl/logout.do",
            dataType:"json",
            type:"POST",
            async:false,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data:{
                abc:123
            },
            success: function(data){
                console.log(data)
                if(data.result == 1){
                    window.location.reload();
                }
            }
        });
    }
//获取url 参数 正则
    var getQueryString = function(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return decodeURI(r[2]); 
        return null; 
    } 

// 标签页面 groups.html js
    var res = ''; 
    var biaoqian = ''
    //刷新 标签列表
    var Refresh = function () {
        $.ajax({ 
            url: testUrl+"/tagsCtrl/get.do",
            dataType:"json",
            data:{
                appid:getQueryString("appid")
            },
            success: function(data){
                if(data.tags.length == 0){
                    $('.zanwu').show();
                    
                }else{
                    $('.zanwu').hide();
                    groupsList(data.tags);
                }
            }
         });
      }
    //遍历 标签标签
    var groupsList = function (data){
        data.forEach(element => {
                res += `<tr >
                        <td class="active">`+element.name+`</td>
                        <td class="active">`+element.id+`</td>
                        <td class="active">`+element.count+`</td>
                    </tr>`
                biaoqian += `<option value="`+element.id+`">`+element.name+`</option>`
        });
        $('#biaoqianmingzi').html(biaoqian);
        $('#xuanzeBiaoqian').html("<option value=''>微信标签</option>"+biaoqian);
        $('#lists').html(res)
    }
     //  新增 标签
    var addGroups =  function(){
        var name = $('.groupsName').val();
        console.log(name)
        if(name == ""){
            alert('标签名称不能为空')
        }else{
            $.ajax({ 
                url: testUrl+"/tagsCtrl/create.do",
                dataType:"json",
                data:{
                    tagName:name,
                    appid:getQueryString("appid")
                },
                success: function(data){
                    console.log(data);
                    window.location.reload()
                }
            });
        }
    }
    // 关闭 标签窗口
    var CloseGroups = function(){
        $('.groupsbox').hide()
    }
    var page = 1;
    //粉丝列表接口 
    var list = function(page){
        $.ajax({ 
            url: testUrl+"/userCtrl/query.do",
            dataType:"json",
            data:{
                pageSize:50,
                currentPage:page,
                appid:getQueryString("appid")
            },
            success: function(data){
                console.log(data.list.length) 
                if(data.length == 0){
                    $('.zanwu').show();
                }
                $('#geshu').html(data.total);
                $('#allfensi').html(data.total);
                //console.log(data)
                fensiLists(data.list);
            }
        });
    }
     // 上一页
     var upPage = function(){
        page++;
        list(page)
     }
     // 下一页
     var downPage = function(){
         page--;
         if(page == 0){
            alert("已经是第一页了")
            page = 1;
            list(page)
         }else{
            list(page)
         }

    }
    //粉丝列表
    var fensiLists = function(obj){
        res = ' '
        $('#listS').html(res)
        obj.forEach(element => {
            res += `<tr >
                    <td class="active">
                        <input type="checkbox" openid="`+element.openid+`" id="`+element.id+`" name="box">
                    </td>
                    <td class="active" >
                        <img src="`+element.headimgurl+`" width="18" height="18"/>
                        <span>`+element.nickname+`</span>
                    </td>
                    <td class="active">`+element.province+`</td>`
                    if(element.subscribeScene == "ADD_SCENE_SEARCH"){
                        res += `<td class="active">公众号搜索</td>`
                    }else if(element.subscribeScene == "ADD_SCENE_ACCOUNT_MIGRATION"){
                        res += `<td class="active">公众号迁移</td>`
                    }else if(element.subscribeScene == "ADD_SCENE_PROFILE_CARD"){
                        res += `<td class="active">名片分享</td>`
                    }else if(element.subscribeScene == "ADD_SCENE_QR_CODE"){
                        res += `<td class="active">扫描二维码</td>`
                    }else if(element.subscribeScene == "ADD_SCENEPROFILE LINK"){
                        res += `<td class="active">图文页内名称点击</td>`
                    }else if(element.subscribeScene == "ADD_SCENE_PROFILE_ITEM"){
                        res += `<td class="active">图文页右上角菜单</td>`
                    }else if(element.subscribeScene == "ADD_SCENE_PROFILE_LINK"){
                        res += `<td class="active">图文页内名称点击</td>`
                    }else if(element.subscribeScene == "ADD_SCENE_PAID"){
                        res += `<td class="active">支付后关注</td>`
                    }else if(element.subscribeScene == "ADD_SCENE_OTHERS"){
                        res += `<td class="active">其他</td>`
                    }
                res +=  `<td class="active">`+getLocalTime(element.subscribeTime)+`</td></tr>`
        })
        $('#listS').html(res)
    }
    // 粉丝查询，查找，搜索
    var listSousuo = function(){
        console.log()
        let data = {
            appid:getQueryString("appid"),
            nickname: $('input[name=openid]').val(),
            tagidList: $('#xuanzeBiaoqian').val(),
            subscribeScene: $('#guanzhulaiyuan').val(),
            subscribe: $('input[name="subscribe"]:checked').val(),
            sex: $('input[name="sex"]:checked').val(),
            country: '',
            province: '',
            city: '',
            pageSize:50,                                                                                                  
            currentPage:1 
        }
        console.log()
        $.ajax({ 
            url: testUrl+"/userCtrl/criteriaQuery.do",
            type:"POST",
            dataType:"json",
            data:data,
            success: function(data){
                // console.log(data)
                if(data == ''){
                    $('.zanwu').show();
                    $('.zanwu').html('暂无结果');
                }else{
                	$('#geshu').html(data.total);
                    $('#allfensi').html(data.total);
                    fensiLists(data.list);
                }
            }
        });
    }


    // 时间转换
    var getLocalTime = function(nS) {     
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    }
    //全选
    var allchecked = function(obj){
        var userids=obj.checked;
        console.log(userids)
        $("input[name=box]").each(function(){
            this.checked = userids;
        });
    }
    //批量操作弹出
    var tanchuShow = function(){ 
        var length=$("input[name=box]:checked").length;
        if(length == 0){
            alert('没有选中粉丝')
        }else{
            $('.tanBox').show();
            $("body").css('overflow','hidden');
            $('#yixuanfensi').html(length)
        }
        console.log(length)
    }
    // 关闭批量操作窗口
    var closetanchu = function(){
        $('.tanBox').hide();
        $("body").css('overflow','auto');
    }
    // 开始批量操作
    var begin = function(){
        var data = "";
        var checked = $("input[name=asd]:checked").val();
        var allopenid = new Array();
        if(checked == 0){
            $("input[name=box]:checked").each(function(){
                allopenid.push("\""+$(this).attr('openid')+"\"");
            })
        }
        //选项二 0添加 1移除
        var opt = $("#biaoqian").val()
        
        console.log(allopenid)
        // 选项三
        var biaoqianid = $('#biaoqianmingzi').val();

        data = '{"openid_list":['+allopenid+'],"tagid":'+biaoqianid+'}'   
        //console.log(data);
        
        //批量操作
        overOn(opt,data,checked);
        
        $('#beginBatch').removeAttr('onclick');
        var overOns = setInterval(function(){
        	$('#beginBatch').attr('onclick','begin()');
        	clearInterval(overOns);
        }, 8000);
    }
    // 开始批量 接口调用
    var overOn = function(s,datas,checked){
	    	var opt = "";
	    	var tips = "";
	    	if(s == 0){
	    		opt = "add";
	    	}else{
	    		opt = "remove"; 
	    	}
	    	if(checked == 0){
	    		$.ajax({ 
	                url: testUrl+"/tagsCtrl/batchTagging.do",
	                dataType:"text",
	                data:{
	                    appid:getQueryString("appid"),
	                    data:datas,
	                    opt:opt
	                },
	                success: function(data){
	                    console.log(data);
	                    if(s == 0){
	                    	if(data == "success"){
	                        	alert("添加成功");
	                        }else{
	                        	alert("添加失败");
	                        }
	        	    	}else{
	        	    		if(data == "success"){
	                        	alert("移除成功");
	                        }else{
	                        	alert("移除失败");
	                        }
	        	    	}
	                }
	             });
	    	}else if(checked == 1){
	    		//显示进度条
	            $('#tag_progress').css('display','inline-block');
	            
	            $.ajax({ 
	    	    	url: testUrl+"/tagsCtrl/selBatchTagging.do",
	    	    	dataType:"text",
	    	    	data:{
	    	    		appid:getQueryString("appid"),
	    	    		tagid:$('#biaoqianmingzi').val(),
	    	    		nickname:$('input[name=openid]').val(),
	    	    		subscribeScene:$('#guanzhulaiyuan').val(),
	    	    		subscribe:$('input[name="subscribe"]:checked').val(),
	    	    		sex:$('input[name="sex"]:checked').val(),
	    	    		opt:opt
	    	    	},
	    	    	success: function(data){
	    	    		console.log(data);
	    	    		if(s == 0){
	    	    			if(data == "success"){
	    	    				alert("添加成功");
	    	    			}else{
	    	    				alert("添加失败");
	    	    			}
	    	    		}else{
	    	    			if(data == "success"){
	    	    				alert("移除成功");
	    	    			}else{
	    	    				alert("移除失败");
	    	    			}
	    	    		}
	    	    	}
	    	    });
	            
	    	    //清空重试次数
	            chongshicishu = 0;
	    		//清楚已存在的定时器
	            clearInterval(tag_timer);
	            sleep(1500);
	            //创建定时器
	            tag_timer = setInterval(tag_progress,2000);
	    	}
    }

    //微信公众号列表
    var weixinList = function(){
        $.ajax({ 
            url: testUrl+"/userCtrl/accountList.do",
            dataType:"json",
            success: function(data){
                console.log(data);
                data.forEach(element => {
                    res += `<tr >
                        <td class="active">`+element.nickName+`</td>
                        <td class="active">`+element.userName+`</td>`
                        if(element.userName.serviceTypeInfo == {"id":0}){
                            res += `<td class="active">订阅号</td>`
                        }else if(element.userName.serviceTypeInfo == {"id":1}){
                            res += `<td class="active">订阅号</td>`
                        }else if(element.userName.serviceTypeInfo== {"id":2}){
                            res += `<td class="active">服务号</td>`
                        }
                    res += `<td class="active">
                            <input type="button" value="功能管理" class="btn btn-info" onclick="clickAppid('`+element.authorizationAppid+`','`+element.nickName+`')"/>
                        </td>
                    </tr>`
                });
                $('#weixinList').html(res)
            }
         });
    }

    
    var clickAppid = function(appid,nickName){
        clickAppids(appid,nickName);
        window.location.href = "list.html?appid="+appid+"&nickName="+nickName;
    }
    // 动态生成appid url
    function clickAppids(appid,nickName){
    	//console.log("nickName:::"+nickName);
        var nav = `<li><a href="index.html?appid=`+ appid +`&nickName=`+nickName+`">群发消息</a></li>
                <li><a href="list.html?appid=`+ appid +`&nickName=`+nickName+`">粉丝列表</a></li>
                <li><a href="groups.html?appid=`+ appid +`&nickName=`+nickName+`">自动标签</a></li>
                <li><a href="weixin.html?appid=`+ appid +`&nickName=`+nickName+`">管理中心</a></li>
                <li>`+nickName+`</li>`;
        $('.lis').html(nav);
    }
