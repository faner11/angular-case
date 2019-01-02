# 基于 Angular7,ng-zorro7.x 的中后台实践案例

在一个项目维护的过程中，需求总是累加的，一开始总是很简单，之后需求越来越多，维护会越来越头疼，所以一个好的项目结构可以帮助节省很多的维护成本。  
很多开发者以组件树的形式去开发 Angular，其实以模块树的形式去开发是更好的选择。
在开始前希望你已经阅读过以下文章

- [Angular 风格指南](https:www.angular.cn/guide/styleguide)
- [Angular 最佳实现](https:zhuanlan.zhihu.com/p/28874230)
- [ng-alain 模块注册指导原则](https:ng-alain.com/docs/module/zh)

## 目录结构

这是一个标准的 Angular CLI 构建的项目，并参考了[ng-alain 的目录结构](https:ng-alain.com/docs/getting-started/zh)。

```
├── src
│   ├── app
│   │   ├── core                                # 核心模块
│   │   │   ├── net
│   │   │   │   └── default.interceptor.ts      # 默认HTTP拦截器
│   │   │   ├── services
│   │   │   │   └── startup.service.ts          # 初始化项目配置
│   │   │   └── core.module.ts                  # 核心模块文件
│   │   ├── layout                              # 通用布局
│   │   ├── modules
│   │   │   ├── home
│   │   │   │   ├── pages
│   │   │   │   │   ├── **                      # 业务目录
│   │   │   │   ├── home.module.ts              # 业务路由模块
│   │   │   │   └── home-routing.module.ts      # 业务路由注册口
│   │   ├── shared                              # 共享模块
│   │   │   └── shared.module.ts                # 共享模块文件
│   │   ├── app.component.ts                    # 根组件
│   │   └── app.module.ts                       # 根模块
│   ├── assets                                  # 本地静态资源
│   ├── environments                            # 环境变量配置
│   ├── styles                                  # 样式目录
└── └── style.less                              # 样式引导入口
```

## 开始

```bash
# 安装依赖
npm i

# 启动
ng s
```

## 问题总结

Angular 已经是非常成熟的一个框架，可以通过找到各种各样的问题解决方案，一下是一些国内比较常见但是很少有回答的一些问题。

### Angular 的 HttpClient 需要二次封装吗？

答：这个看场景，在我们之前的项目中是使用自己二次封装过的 HttpClient，现在已经放弃（因为发现封装后没啥意义），之后在群里请教[雪狼汪志成](https:www.zhihu.com/people/alpha-gde/activities),他们也没有进行二次封装。  
举个多接口前缀的例子（国内有很多这样的场景，之前我们进行二次封装也是做这个工作，通过 headers 指定头传值，在拦截器中获取到后移除 domain,具体请参考本项目登陆模块代码，

```ts
// src/environment/environment.ts  环境变量
export const environment = {
  BASE_URL: `https://test.BASE_URL.com/admin/`,
  LOGIN_URL: `https://test.LOGIN_URL.com/login/`,
  production: false
};
// src/app/coer/net/default.interceptor.service.ts  拦截器
if (req.headers.get("domain")) {
  url = environment[req.headers.get("domain")] + url;
} else {
  url = environment.BASE_URL + url;
}
// src/app/login/pages/user-login.component.ts   使用
this.httpClient
  .get("admin/login", {
    headers: { domain: "LOGIN_URL" }
  })
  .subscribe();
```

### 如何使用 RSA 加密？

答：RSA 加密是使用[jsencrypt](https://github.com/travist/jsencrypt)，具体在 Angular 中使用请参考登陆模块，有完整使用案例。

未完待续。。
