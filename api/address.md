# 1.添加地址接口

>接口地址 : http://localhost:3000/address/add

>请求方式 : post

>参数 : 用户ID:userid, 用户名:name , 手机号:tel , 默认标识:flag ,地址ID:addressid, 地址:address

>返回结果 : { code: '' ,message: ''}

>返回参数说明:

|参数名称|说明|
|----|----|
|10010|添加地址成功|
|10002|用户已存在,请直接登录|

# 2.获取地址接口

>接口地址 : http://localhost:3000/address/getaddress

>请求方式 : post

>参数 :  用户ID:userid

>返回结果 : { code: '' ,message: '' ,data: ''}

>返回参数说明:

|参数名称|说明|
|----|----|
|10011|地址不存在|
|10012|查询成功|

# 3.修改地址接口

>接口地址 : http://localhost:3000/address/upadd

>请求方式 : post

>参数 :  用户名:name , 手机号:tel , 用户id:userid, 默认标识:flag ,地址id:addressid, 地址:address

>返回结果 : { code: '' ,message: '' ,data: ''}

>返回参数说明:

|参数名称|说明|
|----|----|
|10013|地址不存在|
|10014|修改成功|

# 3.删除地址接口

>接口地址 : http://localhost:3000/address/deladd

>请求方式 : post

>参数 :  用户id:userid,地址id:addressid

>返回结果 : { code: '' ,message: '' }

>返回参数说明:

|参数名称|说明|
|----|----|
|10015|删除成功|