from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=256)
    token = models.CharField(max_length=256)

# # 商品 模型
class Goods(models.Model):
    # 商品ID
    productid = models.CharField(max_length=10)
    # 商品图片
    productimg = models.CharField(max_length=100)
    # 商品名称
    productname = models.CharField(max_length=100,)
    # 商品规格
    specifics = models.CharField(max_length=100)
    # 商品价格
    price = models.DecimalField(max_digits=6,decimal_places=2)

# 购物车 模型类
class Shoppingbag(models.Model):
    # 用户 [添加的这个商品属于哪个用户]
    user = models.ForeignKey(User)

    # 商品 [添加的是哪个商品]
    goods = models.ForeignKey(Goods)

    ## 具体规格 [颜色、内存、版本、大小.....]
    # 商品规格
    specifics = models.CharField(max_length=100)
    # 商品数量
    number = models.IntegerField()

    # 是否选中
    isselect = models.BooleanField(default=True)
    # 是否删除
    isdelete = models.BooleanField(default=False)




class Order(models.Model):
    # 用户
    user = models.ForeignKey(User)
    # 状态
    # -2 退款
    # -1 过期
    # 0 未付款
    # 1 已付款，未发货
    # 2 已付款，已发货
    # 3 已签收，未评价
    # 4 已评价
    status = models.IntegerField(default=0)
    # 创建时间
    createtime = models.DateTimeField(auto_now_add=True)

    identifier = models.CharField(max_length=256)

    sum = models.CharField(max_length=256,default=0)



class OrderGoods(models.Model):

    order = models.ForeignKey(Order)

    goods = models.ForeignKey(Goods)

    number = models.IntegerField()