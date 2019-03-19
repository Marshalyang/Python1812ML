from django.conf.urls import url
from MlApp import views

urlpatterns = [
    url(r'^$', views.Homepage,name='home'),
    url(r'^regsiter/', views.regsiter,name='regsiter'),
    url(r'^login/$', views.login,name='login'),
    url(r'^logout/$', views.logout,name='logout'),
    url(r'^men/$', views.men,name='men'),
    url(r'^goodsdetail/(\d+)/$', views.goodsdetail,name='goodsdetail'),
    url(r'^shoppingbag/$', views.shoppingbag,name='shoppingbag'),
    url(r'^order/$',views.order,name='order'),
    url(r'^order_li/$',views.order_li,name='order_li'),

    # url(r'^randomtest/$', views.randomtest, name='randomtest'), # 测试接口

    url(r'^returnurl/$', views.returnurl, name='returnurl'),    # 支付成功后，客户端的显示
    url(r'^appnotifyurl/$', views.appnotifyurl, name='appnotifyurl'), # 支付成功后，订单的处理
    url(r'^pay/$', views.pay, name='pay'),
]