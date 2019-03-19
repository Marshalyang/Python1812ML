import hashlib
import random
import time
from urllib.parse import parse_qs

from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from MlApp.alipay import alipay
from MlApp.models import User, Goods, Shoppingbag, Order, OrderGoods


def generate_token():
    md5 = hashlib.md5()
    tempstr = str(time.time()) + str(random.random())
    md5.update(tempstr.encode('utf-8'))
    return md5.hexdigest()


def generate_password(param):
    md5 = hashlib.md5()
    md5.update(param.encode('utf-8'))
    return md5.hexdigest()


def Homepage(request):
    token = request.session.get('token')
    user = None
    if token:
        user = User.objects.get(token=token)
    return render(request,'Homepage.html',context={"user":user})



def regsiter(request):
    if request.method == 'GET':
        return render(request,'regsiter.html')
    elif request.method == 'POST':
        user = User()
        user.username = request.POST.get('username')
        user.password = generate_password(request.POST.get('password'))

        user.token = generate_token()
        request.session['token'] = user.token

        user.save()
        return redirect('ml:home')



def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username)

        try:
            user = User.objects.get(username=username)
            if user.password == generate_password(password):
                user.token = generate_token()
                user.save()
                request.session['token'] = user.token
                return redirect("ml:home")
            else:
                return render(request, 'login.html', context={'erro1': '您输入的密码错误，请重新输入'})
        except:
            return render(request, 'login.html', context={'erro': '您的用户名不存在，请重新输入'})




def men(request):
    token = request.session.get('token')
    user = None
    if token:
        user = User.objects.get(token=token)

    goods = Goods.objects.all()
    print(type(goods))
    return render(request,'Men.html',context={"user":user,'goods':goods})

def goodsdetail(request,goodsid):
    token = request.session.get('token')
    user = None
    if token:
        user = User.objects.get(token=token)

    # 商品

    goodsid = Goods.objects.get(id=goodsid)


    return render(request,'GoodsDetails.html',context={"user":user,'goodsid':goodsid})

def logout(request):
    request.session.flush()
    return redirect('ml:home')


def shoppingbag(request):
    token = request.session.get('token')
    user = None
    shoppingbag = None


    if token:
        user = User.objects.get(token=token)
        if request.GET.get('goodsid'):


            goodsid = request.GET.get('goodsid')

            goodsnumber = request.GET.get('goodsnum')
            goodssize = request.GET.get('size')

            goods = Goods.objects.get(pk=int(goodsid))
            print(goods)
            shoppingbag = Shoppingbag.objects.filter(user=user).filter(goods=goods)
            print(shoppingbag)
            if shoppingbag.count():
                shoppingbag = shoppingbag.first()
                shoppingbag.number += int(goodsnumber)
                shoppingbag.specifics = goodssize
                shoppingbag.save()
            else:
                shoppingbag = Shoppingbag()
                shoppingbag.user = user
                shoppingbag.goods = goods
                shoppingbag.number = int(goodsnumber)
                shoppingbag.save()

        else:
            redirect('ml:login')
        shoppingbag = Shoppingbag.objects.filter(user=user)
        return render(request, 'shoppingbag.html', context={'user': user, "shoppingbag": shoppingbag})

def generate_identifier():
    temp = random.randrange(1000000, 10000000)
    return temp

def order(request):
    token = request.session.get('token')
    user = User.objects.get(token=token)


    order = Order()
    order.user = user
    order.identifier = generate_identifier()
    order.sum = request.GET.get('sum')
    order.save()
    response_data={}
    response_data['status'] = '200'

    return JsonResponse(response_data)


def order_li(request):
    token = request.session.get('token')
    user = User.objects.get(token=token)
    order = Order.objects.filter(user=user).last()

    return render(request, 'order.html',context={'order':order})



def returnurl(request):
    return render(request,'order.html')


@csrf_exempt
def appnotifyurl(request):
    print('支付成功')
    if request.method == 'POST':
        body_str = request.body.decode('utf-8')
        post_data = parse_qs(body_str)
        post_dic = {}
        for k, v in post_data.items():
            post_dic[k] = v[0]

        out_trade_no = post_dic['out_trade_no']
        Order.objects.filter(identifier=out_trade_no).update(status=1)
        return JsonResponse({'msg': 'success'})



def pay(request):
    identifier = request.GET.get('identifier')
    ordersum = request.GET.get('ordersum')

    data = alipay.direct_pay(
        subject='魅力惠', # 显示标题
        out_trade_no=identifier,    # 爱鲜蜂 订单号
        total_amount=str(ordersum),   # 支付金额
        return_url='http://39.105.230.182/ml/returnurl/'
    )

    alipay_url = 'https://openapi.alipaydev.com/gateway.do?{data}'.format(data=data)


    response_data = {
        'msg': '调用支付接口',
        'alipay_url':alipay_url,
        'status':1

    }
    return JsonResponse(response_data)