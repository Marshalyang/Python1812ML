$(function () {
	$(".number_increase").click(function () {
        var num = $(this).prev().children('input').val()
		// console.log(33)
		num= Number(num)+1
		// alert(num)
		$(this).prev().children('input').val(num)
        var p = $(this).parent().parent().prev().children('span').text()
        $(this).parent().parent().next().next().children('span').text(num*Number(p))
        // $(".ccc").text(num*Number($(".bbb").text()))
    })

    $(".number_reduce").click(function () {
        var num = $(this).next().children('input').val()
        // alert(num)
        if (num >1){
            num= Number(num)-1;
            $(this).next().children('input').val(num)
            var p = $(this).parent().parent().prev().children('span').text()
            $(this).parent().parent().next().next().children('span').text(num*Number(p))
        }


    })

     function setcheck(){
        var flag = true;
        $('.th-cart .box-chk input').each(function(){
            if($(this).prop('checked')==false) flag=false
        });
        if(flag) $('#selectall').prop('checked',true);
        else $('#selectall').prop('checked',false);
    }

    // 全选
    $("#checkAll").click(function(){
        var flag = $(this).prop('checked');
        var fx = true;

        $('.checkboxli').each(function(){
            $(this).children(0).prop('checked',flag)
        });




        }
        // var flag =$(this).prop('checked');
        // flag ? flag : !flag ;
        // $(".cart-box-current input[type=checkbox]").each(function(){
        //     $(this).prop("checked",flag);
        //     getsum();
        // });
    );

	$(".checkboxli").change(function () {

        var sum = 0
	    $('.clearfix').each(function(){
            if($(this).children(0).children('#y').is(':checked')){
	            // console.log(111)
                var p = $(this).children().next().next().next().next().next().children('span').html()
                // console.log(p)
                sum += Number(p)


            }

         });

        $('#pricetotal').text(sum)
    })
    $(".button3").click(function () {
        var sum = $('#pricetotal').html();
        $.get('../order',{'sum':sum},function (response) {
            if(response.status=='200'){

                location.href='../order_li/'
            }

        })
    })

    // // 单选点击
    // $('.th-cart .box-chk input').click(function(){
    //     var flag = $(this).prop('checked');
    //     var goodsid = $(this).attr('data-goodsid');
    //     var descs = $(this).parent().next().next().html();
    //     var sizess = $(this).parent().next().next().next().html();
    //     console.log(descs,sizess)
    //     requset_data = {
    //         'flag': flag,
    //         'goodsid': goodsid,
    //     };
    //     if(descs) requset_data['descs']=descs;
    //     if(sizess) requset_data['sizess']=sizess;
    //
    //     $.get('/modicartselect/',requset_data,function(response){
    //         console.log('23333----')
    //         if(response.status==1){
    //             if($(this).attr('checked')){
    //                 $(this).attr('checked',false);
    //             } else{
    //                 $(this).attr('checked',true);
    //             }
    //             setcheck();
    //             getsum();
    //         }
    //     });
    // });





    // $('#checkAll').change(function () {
		// var flag = $(this).prop('checked');
		// flag=!flag
    //
		// $('.list_content input[checkbox]').prop('checked',flag.each(function () {
		//     $('',prop)
    //
    //     })
    // })

    //结账


    //下单

})











//
// /**
//  * Created by Administrator on 2016/10/10 0010.
//  */
//
//
// $(function(){
//     if (location.search){
//         var user =location.search.split("?")[1];
//         $("#ul_header .theLi").eq(0).find("a").html(user);
//         $("#ul_header .theLi").eq(2).find("a").html("退出");
//     }
//
//     //处理点击事件
//     var aNode = $(".shoppinglistTab").find("a");
//     aNode.click(function(){
//         aNode.removeClass("selectedTab").eq($(this).index()).addClass("selectedTab");
//         $(".shoppingCartContent").hide().eq($(this).index()).show();
//     });
//
//     //显示购物车里面的商品
//     //解析cookie
//     var aGood = $.cookie("good") ? JSON.parse($.cookie("good")):[];
//     if(aGood.length>0){
//         //表示商品存在
//         $.each(aGood,function(index,obj){
//             //创建标签保存商品
//             //console.log(obj);
//
//
//             $(".list_content").append('<ul class="list_content_ul clearfix">' +
//                 '<li id="checkboxli">' +
//                 '<input type="checkbox" class="check">' +
//                 '</li>' +
//                 '<li class="list_content_left">' +
//                 '<p class="list_content_img border_color1">' +
//                 '<a target="_blank" href=""><img src='+obj.data.img+' title="淡蓝色条纹长袖衬衫" alt="淡蓝色条纹长袖衬衫"></a>' +
//                 '</p>' +
//                 '<p class="list_content_info">' +
//                 '<span class="list_content_name" title="KENT&amp;CURVEN">' +
//                 '<a target="_blank" href="" class="sublong" style="width: 250px;">KENT&amp;CURVEN</a>' +
//                 '</span>' +
//                 '<span title="淡蓝色条纹长袖衬衫">' +
//                 '<a target="_blank" href="" class="sublong" style="width: 250px;">'+obj.tittle+'</a>' +
//                 '</span>' +
//                 '<span class="list_content_size">尺寸：'+obj.Size +'</span>' +
//                 '<span class="list_content_State" id="3026015200000387748"></span>' +
//                 '</p>' +
//                 '</li>' +
//                 '<li class="price">¥ '+obj.data.price+'</li>' +
//                 '<li>' +
//                 '<div class="number_choose">' +
//                 '<span class="number_reduce">-</span>' +
//                 '<span class="quantity_number"><input class="productNum" value='+obj.num+'></span>' +
//                 '<span class="number_increase">+</span>' +
//                 '</div>' +
//                 '</li>' +
//                 '<li></li>' +
//                 '<li class="priceSum">¥ '+obj.data.price *obj.num+'</li>' +
//                 '<li class="li_pop">' +
//                 '<div class="pop_up_box box2 box_2" style="display: none;">' +
//                 '<div class="box_top">' +
//                 '<div class="top_icon"></div>' +
//                 '</div>' +
//                 '<div class="box_content">' +
//                 '<p class="p1">您确定要删除该商品吗？</p>' +
//                 '<p class="p2">' +
//                 '<span class="button01" >取消</span>' +
//                 '<span class="button02" >确定</span>' +
//                 '</p>' +
//                 '</div>' +
//                 '</div>' +
//                 '<img class="list_content_delete" src="images1/icon_delete.png">' +
//                 '</li>' +
//                 '</ul>');
//
//
//             //修改商品的数量，保存到cookie中
//             ////点击减少商品数量按钮
//             ////因为上面是遍历添加商品的，所以要解除上面的绑定事件
//             //$(".number_reduce").unbind("click");
//             //$(".number_reduce").click(function(){
//             //    var index = $(this).parent().parent().parent().index();
//             //    //console.log($(this).parent().parent().parent().index());
//             //    var Num = $(this).parent().find("input").val();
//             //    if(Num>1){
//             //        aGood[index].num --;
//             //        $.cookie("good",JSON.stringify(aGood),{"expires":7});
//             //        location.href = "shoppingbag.html";
//             //    }
//             //    console.log(Num);
//             //})
//             //
//             ////点击添加商品数量按钮
//             ////因为上面是遍历添加商品的，所以要解除上面的绑定事件
//             //$(".number_increase").unbind("click");
//             //$(".number_increase").click(function(){
//             //    var index = $(this).parent().parent().parent().index();
//             //    var Num = $(this).parent().find("input").val();
//             //
//             //        aGood[index].num ++;
//             //        $.cookie("good",JSON.stringify(aGood),{"expires":7});
//             //        location.href = "shoppingbag.html";
//             //})
//             //
//             ////计算商品的总价格
//             //console.log($("#priceSum").length);
//
//         });
//
//         // 判断按钮的选中状态，
//         $("[type=checkbox]").prop("checked",true);
//         $("#checkAll").click(function(){
//             var isChecked = $(this).prop("checked");
//             $(".check").prop("checked",isChecked);
//             pricefn();
//         })
//         $(".check").click(function(){
//             var aa  = $(".check").length;
//             var bb = $(".check:checked").length;
//             $("#checkAll").prop("checked",aa==bb);
//             pricefn();
//         })
//
//
//         //另外一种方法写加减商品数量
//         $(".number_increase").unbind("click");
//         $(".number_increase").click(function(){
//             var Num = $(this).parent().find("input").val();
//             Num++;
//             $(this).parent().find("input").val(Num);
//             pricefn();
//             cookiefn();
//         })
//
//         $(".number_reduce").unbind("click");
//         $(".number_reduce").click(function(){
//             var Num = $(this).parent().find("input").val();
//             Num--;
//             if(Num<=1){
//                 Num = 1;
//             }
//             $(this).parent().find("input").val(Num);
//             pricefn();
//             cookiefn()
//         });
//
//         //输入数量失去焦点的时候更改cookie和商品价格
//         $(".productNum").blur(function(){
//             pricefn();
//             cookiefn();
//         });
//
//
//         //封装一个函数
//         function pricefn(){
//             var pricetotal=0;
//             var numtotal = 0;
//             for(var i=0;i<$(".price").length;i++){
//                 if($(".check").eq(i).prop("checked")){
//                     var price = $(".price").eq(i).html().replace("¥ ","");
//                     //var priceSum = $("#priceSum").eq(i).html().replace("¥ ","");
//
//                     var productNum = $(".productNum").eq(i).val();
//                     var priceSum = parseInt(price)*parseInt(productNum);
//                     numtotal += parseInt(productNum);
//                     $(".priceSum").eq(i).html("¥ "+priceSum);
//                     pricetotal += priceSum;
//                 }
//
//             }
//             $("#pricetotal").html("¥"+pricetotal);
//             $("#bagshopingAmount").val(numtotal);
//         }
//
//         // 封装一个保存cookie的函数
//         function cookiefn(){
//             var goodlist = $.cookie( "good" ) ? JSON.parse($.cookie("good")) : [];
//             for(var i=0;i<goodlist.length;i++){
//                 goodlist[i].num = $(".productNum").eq(i).val();
//             }
//             $.cookie("good",JSON.stringify(goodlist),{"expires":7,"path":"/"});
//             //console.log($.cookie( "good" ));
//         }
//
//         //删除按钮
//         $(".list_content_delete").unbind("click");
//         $(".list_content_delete").click(function(){
//             var index = $(this).parent().parent().index()-2;  // 减2是因为上面样式设置得不好的问题
//             var goodlist = $.cookie( "good" ) ? JSON.parse($.cookie("good")) : [];
//             goodlist.splice(index,1);
//             console.log(goodlist);
//             console.log(index);
//             console.log($(this).parent().parent());
//             $.cookie("good",JSON.stringify(goodlist),{"expires":7,"path":"/"});
//             var bln = confirm("确定要删除该商品吗？");
//             if(bln){
//                 $(this).parent().parent().remove();
//                 return;
//             }
//
//             //console.log($.cookie( "good" ));
//             pricefn()
//         })
//         pricefn();
//
//        // 清除cookie
//        // $("#clearshop").unbind('click');
//         $("#clearshop").click(function(){
//             $.cookie("good","",{expires:0, path:"/"}); //清空cookie
//             console.log($.cookie( "good" ));
//             location.href = "shoppingbag.html?"+user;
//         })
//     }else{
//         //商品不存在
//
//     }
//
//     //点击继续购买按钮
//     $(".button4").click(function(){
//         location.href = "Men.html?"+user;
//     })
//
//     // 点击结账按钮
//     $(".button3").click(function(){
//         if($("#bagshopingAmount").val()>=1){
//             var bln = confirm("确定你有钱买得起这些商品吗？");
//             if(bln){
//                 alert("你是个土豪！！！！");
//                 location.href = "Homepage.html?"+user;
//             }else {
//                 alert("不，我只是看看而已");
//             }
//         }else {
//             alert("你的购物车是空的，快去选点商品吧！");
//             location.href = "Men.html?"+user;
//         }
//
//     })
//
//
//
//
//
// });