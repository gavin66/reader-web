# Reader 阅读器(客户端)
Web 版网络小说与漫画阅读器 

[服务端部署请点击](https://github.com/gavin66/reader)

**示例站点(本人服务器带宽不足,大家试用后最好搭建自己的服务,谢谢):**

* 域名: [http://reader.shevchenko.ink](http://reader.shevchenko.ink/)

* 帐号: `qwe123@trial.com`  `asd123@trial.com`

* 密码都为 `12345678`

  

# 功能

- 小说: 搜索, 目录, 收藏, 阅读(点击文章内容可全屏切换)
- 漫画: 搜索(目前有腾讯和漫画粉的源), 目录, 收藏, 阅读(可横向翻页)
- 我的: 收藏的小说与漫画续读



# 截图

![](http://picture.shevchenko.ink/picgo/20190918182758.jpg)

![](http://picture.shevchenko.ink/picgo/20190918182815.jpg)

![](http://picture.shevchenko.ink/picgo/20190918182835.jpg)



# 使用

1. 下载项目
```sh
$ git clone https://github.com/gavin66/reader-web.git
```

2. 安装

```sh
# 安装依赖
$ npm install

# 进入 config 目录,创建文件 prod.env.js
# 并修改你的服务端接口 baseURL
$ cd config && cp prod.env.example.js prod.env.js

# 编译
$ npm run build
```

3. 将 `dist/index.html` 部署到你的 Web 服务器



# 注意

* 会有一些接口请求超时或解析异常,错误信息不显示的情况,你只需刷新页面.这部分请求大部分来自漫画.
* 腾讯漫画只可看免费的



# 最后

如果你喜欢这个项目, 麻烦给我一个 star ⭐. 时间充裕时会持续维护这个项目.

如果有任何建议与意见欢迎提 issues.