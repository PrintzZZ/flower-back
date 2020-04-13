# 1、查询产品的接口

> 地址: '/pro'

> 提交方式： get

> 参数： 

|参数|说明|默认值|
|-----|-----|----|
|pageCode|页码|0|
|limitNum|每页显示个数|10|

> 返回结果： 

```
{
  "code": "200",
  "success": "查询列表成功",
  "length": 1,
  "data": [
    {
      "__v": 0,
      "proid": "产品id",
      "use": "产品用途",
      "breed": "品种",
      "type": "类型",
      "material": "材料",
      "proname": "花名",
      "price": 2, // 价格
      "proimg": "", // 产品图片
      "note": "" // 花语
    }
  ] 
}
```