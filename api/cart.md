# 1.查询购物车接口

>接口地址 : http://localhost:3000/cart
>请求方式 : get

>参数 : 用户名username 密码password 手机号tel

>返回结果 : { code: '' ,message: '', data: ''}

>返回参数说明:

|参数名称|说明|
|----|----|
|11000|购物车没有数据|
|200|已经查到,会返回数据数组|

# 2.添加到购物车接口

>接口地址 : http://localhost:3000/cart/add
>请求方式 : get

>参数 : 用户ID:userid, 商品id:proid , 数量:num

>返回结果 : { code: '' ,message: ''}

>返回参数说明:

|参数名称|说明|
|----|----|
|200|加入购物车成功|
|200|商品数量加1|


# 3.删除购物车接口

>接口地址 : http://localhost:3000/cart/delete
>请求方式 : get

>参数 : 用户ID:userid, 商品id:proid

>返回结果 : { code: '' ,message: ''}

>返回参数说明:

|参数名称|说明|
|----|----|
|11110|删除成功|

# 4.更新购物车接口

>接口地址 : http://localhost:3000/cart/update
>请求方式 : get

>参数 :  购物车id:carid 数量:num

>返回结果 : { code: '' ,message: ''}

>返回参数说明:

|参数名称|说明|
|----|----|
|11111|更新成功|

