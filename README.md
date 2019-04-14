# 荔课小程序

## 运行

- 创建数据库并导入`mysql.sql`
- `yarn` 或者 `npm` 进行依赖安装
- `tsc` 进行编译
- `config/default.json`下修改配置
- `npm run start`运行

## 简介

**教师**生产课程，**学院/组织**作为发行商选择课程发布，给**学生**进行上课并进行评价反馈。

## 界面逻辑

### 教师后台

- 填写教师个人信息（姓名、简介、头像）
- 添加课程原型（名称，课程内容）

* 浏览自己的课程原型，详页可见对应的已发行的课程
* 已发行的课程详页可见评论/评分等
* 浏览发行中的课程，详页可获得课程二维码/海报
* 获取学院/组织的发行请求，通过卡片推送通知

### 学院/组织后台

* 浏览已生产的课程，查看详情并申请发布
* 获取发行中的课程并生成二维码/海报
* 浏览自己发布过的课程

### 学生界面

* 仅对课程进行评价

## 概念

* 发布课程：教师添加课程原型
* 发行课程：组织/学院选择课程原型开始准备授课
* 发行课程以原有课程为原型，取其快照作为内容，并允许修改

## 数据库

* 所有表均含id自增主键
* 所有字段均不为Null

#### teacher

| 字段       | 类型 | 描述       |
| ---------- | ---- | ---------- |
| user_id    |      | 指向`user` |
| intro      |      | 简介       |
| avatar_url |      | 头像       |

#### organization

| 字段    | 类型 | 描述     |
| ------- | ---- | -------- |
| user_id |      |          |
| name    |      | 组织名称 |

#### prototype

课程原型/样品

| 字段       | 类型 | 描述                                                         |
| ---------- | ---- | ------------------------------------------------------------ |
| name       |      | 课程名称                                                     |
| teacher_id |      | 指向`teacher`                                                |
| content    |      | 课程内容                                                     |
| status     |      | 原型状态【可用，不可用】，不可用则不会出现在列表中，但可以出现在单个查询中 |

#### published

已发行的课程

| 字段            | 类型 | 描述     |
| --------------- | ---- | -------- |
| teacher_id      |      |          |
| prototype_id    |      |          |
| organization_id |      |          |
| name            |      | 课程名称 |
| content         |      | 课程内容 |

#### judgement

评价

| 字段         | 类型 | 描述        |
| ------------ | ---- | ----------- |
| user_id      |      |             |
| published_id |      |             |
| content      |      | 评论内容    |
| mark         |      | 评分，满分5 |
| create_at    |      | 创建时间    |

#### request

组织的发行的请求

| 字段            | 类型 | 描述                             |
| --------------- | ---- | -------------------------------- |
| prototype_id    |      | 指向`prototype_id`               |
| organization_id |      | 指向`organization`               |
| status          |      | 状态，常量【待操作、同意、拒绝】 |
| create_at       |      | 创建时间                         |

#### user

| 字段       | 类型 | 描述                                           |
| ---------- | ---- | ---------------------------------------------- |
| open_id    |      |                                                |
| nickname   |      | 微信名                                         |
| avatar_url |      | 头像url                                        |
| type       |      | 指代用户类型，常量【学生（默认）、教师、组织】 |
| name       |      | 真实姓名                                       |
| account    |      | 工号                                           |

## 接口

#### teacher

| URL            | METHOD | 接收参数            | 返回参数                  | 描述         |
| -------------- | ------ | ------------------- | ------------------------- | ------------ |
|                |        |                     |                           |              |
| `/teacher`     | `PUT`  | `{ intro, avatar }` |                           | 更新信息     |
| `/teacher/:id` | `GET`  |                     | `{ name, intro, avatar }` | 获取教师信息 |



#### prototype

| URL               | METHOD   | 接收参数            | 返回参数                                                     | 描述           |
| :---------------- | -------- | ------------------- | ------------------------------------------------------------ | -------------- |
| `/prototypes`     | `POST`   | `{ name, content }` |                                                              | `创建原型`     |
| `/prototypes`     | `PUT`    | `{ name, content }` |                                                              | `更新原型`     |
| `/prototypes/:id` | `DELETE` |                     |                                                              | `删除原型`     |
| `/prototypes/:id` | `GET`    |                     | `{ name, content, teacher: { id, name, avatar, unit, account  } }` | `获取原型信息` |
| `/prototypes`     | `GET`    | `limit, offset`     | `{ data: [{ id, name }], count }`                            | `获取原型列表` |



#### published

| URL              | METHOD   | 接收参数            | 返回参数                                                     | 描述           |
| ---------------- | -------- | ------------------- | ------------------------------------------------------------ | -------------- |
|                  |          |                     |                                                              |                |
| `/published`     | `PUT`    | `{ name, content }` |                                                              | `更新课程`     |
| `/published/:id` | `DELETE` |                     |                                                              | `删除课程`     |
| `/published/:id` | `GET`    |                     | `{ name, organization: { id, name }, prototype: { id, name, content, teacher }, content }` | `获取课程信息` |
| `/published`     | `GET`    | `limit, offset`     | `{ data: [{ id, name, organization: { id, name, content }, prototype_id }], count }` | `获取课程列表` |

#### judgement

| URL           | METHOD | 接收参数                          | 返回参数                                             | 描述         |
| ------------- | ------ | --------------------------------- | ---------------------------------------------------- | ------------ |
| `/judgements` | `POST` | `{ content, mark,  publishedId }` |                                                      | 创建评论     |
| `/judgements` | `GET`  | `publishedId, limit, offset`      | `{ data: [{ id, content, mark, createAt }], count }` | 获取评论列表 |

#### request

| URL            | METHOD | 接收参数          | 返回参数                                                     | 描述                                          |
| -------------- | ------ | ----------------- | ------------------------------------------------------------ | --------------------------------------------- |
| `/request`     | `GET`  |                   | `{ data: [{ prototype: { id, name }, createAt, status }], count }` | 获取发行请求列表                              |
| `/request`     | `POST` | `{ prototypeId }` |                                                              | 组织账号发起请求                              |
| `/request/:id` | `PUT`  | `{ status }`      |                                                              | 教师对请求进行操作，接收后自动创建`published` |

























