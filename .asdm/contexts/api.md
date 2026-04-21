# API 接口文档

## 概述
本文档提供了在线医疗问诊平台的完整 API 文档。包括端点定义、请求/响应格式、使用示例和测试指南，旨在帮助 AI 模型理解、设计、修改和实现 API。

**当前状态**: 项目处于原型阶段，使用 JSON 文件模拟数据。本文档描述的是未来真实的 RESTful API 设计规范。

## API 元数据

### 基础 URL

| 环境 | URL | 描述 |
|------|-----|------|
| **开发环境** | `http://localhost:3000/api/v1` | 本地开发服务器 |
| **测试环境** | `https://staging-api.healthcare.com/api/v1` | 预发布测试环境 |
| **生产环境** | `https://api.healthcare.com/api/v1` | 正式生产环境 |

### API 版本
- **当前版本**: v1.0.0
- **版本策略**: URL 路径版本控制 (`/api/v1/endpoint`)
- **支持版本**: v1.0.x（最新）

### 认证方式

#### JWT Bearer Token
所有受保护的端点都需要 JWT 认证：
```http
Authorization: Bearer <jwt_token>
```

#### Token 获取
- 医生登录: `/api/v1/auth/doctor/login`
- 患者验证: `/api/v1/auth/patient/verify`

### 速率限制

| 级别 | 限制 | 描述 |
|------|------|------|
| **匿名用户** | 60 请求/15分钟 | 未认证的 IP 地址 |
| **认证用户** | 600 请求/15分钟 | 已认证的用户 |
| **医生用户** | 1200 请求/15分钟 | 医生账户 |

### 通用请求头

| Header | 必需 | 描述 | 示例 |
|--------|------|------|------|
| `Content-Type` | 是 | 请求内容类型 | `application/json` |
| `Accept` | 是 | 期望的响应类型 | `application/json` |
| `Authorization` | 条件 | JWT Bearer Token | `Bearer eyJhbGciOiJIUzI1NiIs...` |
| `X-Request-ID` | 否 | 唯一请求标识符 | `req_123456` |
| `X-Client-Version` | 否 | 客户端版本号 | `1.0.0` |

### 通用错误响应格式
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "可读的错误消息",
    "details": {
      "field": "错误详情"
    }
  },
  "timestamp": "2026-04-17T10:30:00Z",
  "requestId": "req_123456"
}
```

### 通用成功响应格式
```json
{
  "success": true,
  "data": {
    // 响应数据
  },
  "timestamp": "2026-04-17T10:30:00Z",
  "requestId": "req_123456"
}
```

---

## API 端点定义

**组织方式**: 本节按业务模块组织 API 端点。每个模块包含相关的 API 集合。

---

## 1. 认证模块 (Authentication)

### 1.1 医生登录

**端点**: `POST /auth/doctor/login`

**描述**: 使用用户名和密码验证医生身份，返回 JWT Token。

**权限**: 公开

**请求参数**:
```json
{
  "username": "dr-zhang-wei",
  "password": "123456"
}
```

| 参数 | 类型 | 必需 | 描述 | 示例 |
|------|------|------|------|------|
| `username` | string | 是 | 医生登录用户名 | `"dr-zhang-wei"` |
| `password` | string | 是 | 登录密码（明文传输，需 HTTPS） | `"123456"` |

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 86400,
    "user": {
      "id": "doc001",
      "username": "dr-zhang-wei",
      "name": "张伟医生",
      "title": "主任医师",
      "department": "心内科",
      "avatar": "https://example.com/avatars/doctor1.jpg",
      "isActive": true
    }
  },
  "timestamp": "2026-04-17T10:30:00Z",
  "requestId": "req_001"
}
```

**错误响应**:
- **400** - 请求参数格式错误
- **401** - 用户名或密码错误
- **403** - 账户已被禁用
- **429** - 请求频率超限

**cURL 示例**:
```bash
curl -X POST http://localhost:3000/api/v1/auth/doctor/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "dr-zhang-wei",
    "password": "123456"
  }'
```

---

### 1.2 医生登出

**端点**: `POST /auth/doctor/logout`

**描述**: 使当前医生的 JWT Token 失效。

**权限**: 需要 JWT 认证（医生）

**请求参数**: 无

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "message": "登出成功"
  },
  "timestamp": "2026-04-17T10:30:00Z",
  "requestId": "req_002"
}
```

---

### 1.3 患者身份验证

**端点**: `POST /auth/patient/verify`

**描述**: 通过姓名和生日验证患者身份，首次验证会自动创建账户。

**权限**: 公开

**请求参数**:
```json
{
  "name": "赵明",
  "birthday": "1985-03-15"
}
```

| 参数 | 类型 | 必需 | 描述 | 示例 |
|------|------|------|------|------|
| `name` | string | 是 | 患者姓名（2-20字符） | `"赵明"` |
| `birthday` | string | 是 | 出生日期（YYYY-MM-DD格式） | `"1985-03-15"` |

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 7200,
    "isNewUser": false,
    "user": {
      "id": "patient001",
      "name": "赵明",
      "birthday": "1985-03-15",
      "phone": "138****1234",
      "gender": "男"
    }
  },
  "timestamp": "2026-04-17T10:30:00Z",
  "requestId": "req_003"
}
```

**错误响应**:
- **400** - 参数验证失败
- **422** - 日期格式错误

**cURL 示例**:
```bash
curl -X POST http://localhost:3000/api/v1/auth/patient/verify \
  -H "Content-Type: application/json" \
  -d '{
    "name": "赵明",
    "birthday": "1985-03-15"
  }'
```

---

### 1.4 患者登出

**端点**: `POST /auth/patient/logout`

**描述**: 使当前患者的 JWT Token 失效。

**权限**: 需要 JWT 认证（患者）

**请求参数**: 无

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "message": "登出成功"
  },
  "timestamp": "2026-04-17T10:30:00Z"
}
```

---

### 1.5 刷新 Token

**端点**: `POST /auth/refresh`

**描述**: 使用当前有效的 Token 获取新的 Token。

**权限**: 需要 JWT 认证

**请求参数**: 无

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 86400
  }
}
```

---

## 2. 医生管理模块 (Doctors)

### 2.1 获取医生列表

**端点**: `GET /doctors`

**描述**: 获取所有医生列表，支持筛选和分页。

**权限**: 公开

**查询参数**:

| 参数 | 类型 | 必需 | 描述 | 示例 |
|------|------|------|------|------|
| `isActive` | boolean | 否 | 筛选在线医生 | `true` |
| `department` | string | 否 | 按科室筛选 | `"心内科"` |
| `page` | number | 否 | 页码（默认1） | `1` |
| `limit` | number | 否 | 每页数量（默认10，最大50） | `10` |
| `search` | string | 否 | 搜索关键词（姓名、科室） | `"张伟"` |

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "doctors": [
      {
        "id": "doc001",
        "username": "dr-zhang-wei",
        "name": "张伟医生",
        "title": "主任医师",
        "department": "心内科",
        "avatar": "https://example.com/avatars/doctor1.jpg",
        "experience": "15年临床经验",
        "specialties": ["高血压", "冠心病", "心律失常"],
        "isActive": true
      }
    ],
    "pagination": {
      "total": 5,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    }
  }
}
```

**cURL 示例**:
```bash
# 获取所有在线医生
curl -X GET "http://localhost:3000/api/v1/doctors?isActive=true"

# 按科室筛选
curl -X GET "http://localhost:3000/api/v1/doctors?department=心内科"

# 搜索医生
curl -X GET "http://localhost:3000/api/v1/doctors?search=张伟"
```

---

### 2.2 获取医生详情

**端点**: `GET /doctors/:id`

**描述**: 根据医生ID获取详细信息。

**权限**: 公开

**路径参数**:

| 参数 | 类型 | 必需 | 描述 | 示例 |
|------|------|------|------|------|
| `id` | string | 是 | 医生ID | `"doc001"` |

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "id": "doc001",
    "username": "dr-zhang-wei",
    "name": "张伟医生",
    "title": "主任医师",
    "department": "心内科",
    "avatar": "https://example.com/avatars/doctor1.jpg",
    "experience": "15年临床经验",
    "specialties": ["高血压", "冠心病", "心律失常"],
    "isActive": true,
    "statistics": {
      "totalQuestions": 120,
      "answeredRate": 0.95,
      "avgResponseTime": "2小时"
    }
  }
}
```

**错误响应**:
- **404** - 医生不存在

**cURL 示例**:
```bash
curl -X GET http://localhost:3000/api/v1/doctors/doc001
```

---

### 2.3 获取当前医生信息

**端点**: `GET /doctors/me`

**描述**: 获取当前登录医生的详细信息。

**权限**: 需要 JWT 认证（医生）

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "id": "doc001",
    "username": "dr-zhang-wei",
    "name": "张伟医生",
    "title": "主任医师",
    "department": "心内科",
    "avatar": "https://example.com/avatars/doctor1.jpg",
    "experience": "15年临床经验",
    "specialties": ["高血压", "冠心病", "心律失常"],
    "isActive": true,
    "email": "zhangwei@hospital.com",
    "phone": "138****5678"
  }
}
```

---

### 2.4 更新医生信息

**端点**: `PUT /doctors/me`

**描述**: 更新当前医生的个人资料。

**权限**: 需要 JWT 认证（医生）

**请求参数**:
```json
{
  "avatar": "https://example.com/new-avatar.jpg",
  "isActive": true
}
```

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `avatar` | string | 否 | 头像URL |
| `isActive` | boolean | 否 | 在线状态 |

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "id": "doc001",
    "avatar": "https://example.com/new-avatar.jpg",
    "isActive": true,
    "updatedAt": "2026-04-17T10:30:00Z"
  }
}
```

---

### 2.5 修改密码

**端点**: `PUT /doctors/me/password`

**描述**: 修改医生登录密码。

**权限**: 需要 JWT 认证（医生）

**请求参数**:
```json
{
  "currentPassword": "123456",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "message": "密码修改成功，请重新登录"
  }
}
```

---

## 3. 患者管理模块 (Patients)

### 3.1 获取当前患者信息

**端点**: `GET /patients/me`

**描述**: 获取当前登录患者的详细信息。

**权限**: 需要 JWT 认证（患者）

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "id": "patient001",
    "name": "赵明",
    "birthday": "1985-03-15",
    "phone": "138****1234",
    "gender": "男",
    "createdAt": "2026-01-15T08:00:00Z"
  }
}
```

---

### 3.2 更新患者信息

**端点**: `PUT /patients/me`

**描述**: 更新当前患者的个人资料。

**权限**: 需要 JWT 认证（患者）

**请求参数**:
```json
{
  "phone": "13800138000",
  "gender": "男"
}
```

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `phone` | string | 否 | 手机号码 |
| `gender` | string | 否 | 性别 |

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "id": "patient001",
    "phone": "13800138000",
    "gender": "男",
    "updatedAt": "2026-04-17T10:30:00Z"
  }
}
```

---

## 4. 问题管理模块 (Questions)

### 4.1 获取问题列表

**端点**: `GET /questions`

**描述**: 获取问题列表，支持按医生、患者、状态筛选。

**权限**: 需要 JWT 认证

**查询参数**:

| 参数 | 类型 | 必需 | 描述 | 示例 |
|------|------|------|------|------|
| `doctorId` | string | 否 | 按医生ID筛选 | `"doc001"` |
| `patientId` | string | 否 | 按患者ID筛选 | `"patient001"` |
| `status` | string | 否 | 按状态筛选 | `"pending"` 或 `"answered"` |
| `page` | number | 否 | 页码（默认1） | `1` |
| `limit` | number | 否 | 每页数量（默认20） | `20` |

**权限说明**:
- 医生只能查看自己的问题
- 患者只能查看自己的问题
- 管理员可查看所有问题

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "q001",
        "patientId": "patient001",
        "patientName": "赵明",
        "doctorId": "doc001",
        "doctorName": "张伟医生",
        "question": "最近总是感觉胸闷气短，特别是爬楼梯的时候，这是什么原因？",
        "submitTime": "2026-04-17T09:30:00Z",
        "status": "answered",
        "answer": "根据您的描述，可能是心脏功能问题。建议您做个心电图和心脏彩超检查。",
        "answerTime": "2026-04-17T09:45:00Z"
      }
    ],
    "pagination": {
      "total": 7,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
}
```

**cURL 示例**:
```bash
# 医生获取自己的待回答问题
curl -X GET "http://localhost:3000/api/v1/questions?status=pending" \
  -H "Authorization: Bearer <doctor_token>"

# 患者获取自己的问题
curl -X GET "http://localhost:3000/api/v1/questions" \
  -H "Authorization: Bearer <patient_token>"
```

---

### 4.2 提交问题

**端点**: `POST /questions`

**描述**: 患者向医生提交问诊问题。

**权限**: 需要 JWT 认证（患者）

**请求参数**:
```json
{
  "doctorId": "doc001",
  "question": "最近总是感觉胸闷气短，特别是爬楼梯的时候，这是什么原因？"
}
```

| 参数 | 类型 | 必需 | 描述 | 示例 |
|------|------|------|------|------|
| `doctorId` | string | 是 | 目标医生ID | `"doc001"` |
| `question` | string | 是 | 问题内容（10-1000字符） | `"问题描述..."` |

**成功响应 (201)**:
```json
{
  "success": true,
  "data": {
    "id": "q008",
    "patientId": "patient001",
    "patientName": "赵明",
    "doctorId": "doc001",
    "doctorName": "张伟医生",
    "question": "最近总是感觉胸闷气短，特别是爬楼梯的时候，这是什么原因？",
    "submitTime": "2026-04-17T10:30:00Z",
    "status": "pending",
    "answer": null,
    "answerTime": null
  }
}
```

**错误响应**:
- **400** - 参数验证失败
- **404** - 医生不存在或已下线

**cURL 示例**:
```bash
curl -X POST http://localhost:3000/api/v1/questions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <patient_token>" \
  -d '{
    "doctorId": "doc001",
    "question": "最近总是感觉胸闷气短，特别是爬楼梯的时候，这是什么原因？"
  }'
```

---

### 4.3 获取问题详情

**端点**: `GET /questions/:id`

**描述**: 获取单个问题的详细信息。

**权限**: 需要 JWT 认证（相关医生或患者）

**路径参数**:

| 参数 | 类型 | 必需 | 描述 | 示例 |
|------|------|------|------|------|
| `id` | string | 是 | 问题ID | `"q001"` |

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "id": "q001",
    "patientId": "patient001",
    "patientName": "赵明",
    "doctorId": "doc001",
    "doctorName": "张伟医生",
    "question": "最近总是感觉胸闷气短，特别是爬楼梯的时候，这是什么原因？",
    "submitTime": "2026-04-17T09:30:00Z",
    "status": "answered",
    "answer": "根据您的描述，可能是心脏功能问题。建议您做个心电图和心脏彩超检查。",
    "answerTime": "2026-04-17T09:45:00Z"
  }
}
```

---

### 4.4 回答问题

**端点**: `PUT /questions/:id/answer`

**描述**: 医生回答患者的问题。

**权限**: 需要 JWT 认证（医生，且是问题的接诊医生）

**路径参数**:

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `id` | string | 是 | 问题ID |

**请求参数**:
```json
{
  "answer": "根据您的描述，可能是心脏功能问题。建议您做个心电图和心脏彩超检查，同时注意休息，避免剧烈运动。"
}
```

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `answer` | string | 是 | 回答内容（10-2000字符） |

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "id": "q001",
    "status": "answered",
    "answer": "根据您的描述，可能是心脏功能问题...",
    "answerTime": "2026-04-17T09:45:00Z"
  }
}
```

**错误响应**:
- **403** - 无权回答此问题
- **404** - 问题不存在
- **409** - 问题已被回答

**cURL 示例**:
```bash
curl -X PUT http://localhost:3000/api/v1/questions/q001/answer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <doctor_token>" \
  -d '{
    "answer": "根据您的描述，可能是心脏功能问题。建议您做个心电图和心脏彩超检查。"
  }'
```

---

### 4.5 标记为已口头解答

**端点**: `PUT /questions/:id/mark-answered`

**描述**: 医生标记问题为已通过其他方式（如电话、视频）解答。

**权限**: 需要 JWT 认证（医生，且是问题的接诊医生）

**路径参数**:

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `id` | string | 是 | 问题ID |

**请求参数**: 无

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "id": "q001",
    "status": "answered",
    "answer": "已口述解答",
    "answerTime": "2026-04-17T10:00:00Z"
  }
}
```

---

## 5. 统计数据模块 (Statistics)

### 5.1 获取平台统计数据

**端点**: `GET /statistics`

**描述**: 获取平台的整体统计数据。

**权限**: 公开

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "totalDoctors": 5,
    "totalQuestions": 7,
    "activeSessions": 3,
    "totalSessions": 4,
    "answeredRate": 0.857,
    "avgResponseTime": "1.5小时"
  }
}
```

**cURL 示例**:
```bash
curl -X GET http://localhost:3000/api/v1/statistics
```

---

### 5.2 获取医生统计数据

**端点**: `GET /statistics/doctor/:id`

**描述**: 获取指定医生的统计数据。

**权限**: 公开

**路径参数**:

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `id` | string | 是 | 医生ID |

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "doctorId": "doc001",
    "doctorName": "张伟医生",
    "totalQuestions": 3,
    "answeredQuestions": 2,
    "pendingQuestions": 1,
    "answeredRate": 0.667,
    "avgResponseTime": "30分钟"
  }
}
```

---

## 6. 科室管理模块 (Departments) - 扩展功能

### 6.1 获取科室列表

**端点**: `GET /departments`

**描述**: 获取所有科室列表。

**权限**: 公开

**成功响应 (200)**:
```json
{
  "success": true,
  "data": {
    "departments": [
      {
        "id": "dept001",
        "name": "心内科",
        "description": "心血管内科",
        "doctorCount": 2,
        "icon": "heart"
      },
      {
        "id": "dept002",
        "name": "儿科",
        "description": "儿童健康科",
        "doctorCount": 1,
        "icon": "baby"
      }
    ]
  }
}
```

---

## HTTP 状态码参考

| 状态码 | 描述 | 使用场景 |
|--------|------|----------|
| **200** | OK | 请求成功 |
| **201** | Created | 资源创建成功 |
| **204** | No Content | 删除成功（无返回内容） |
| **400** | Bad Request | 请求参数错误 |
| **401** | Unauthorized | 未认证或 Token 无效 |
| **403** | Forbidden | 无权限访问 |
| **404** | Not Found | 资源不存在 |
| **409** | Conflict | 资源冲突 |
| **422** | Unprocessable Entity | 语义错误 |
| **429** | Too Many Requests | 请求频率超限 |
| **500** | Internal Server Error | 服务器内部错误 |
| **503** | Service Unavailable | 服务不可用 |

---

## 错误代码参考

| 错误代码 | HTTP 状态 | 描述 |
|----------|-----------|------|
| `VALIDATION_ERROR` | 400 | 请求参数验证失败 |
| `INVALID_CREDENTIALS` | 401 | 用户名或密码错误 |
| `TOKEN_EXPIRED` | 401 | Token 已过期 |
| `TOKEN_INVALID` | 401 | Token 无效 |
| `UNAUTHORIZED` | 401 | 未认证 |
| `FORBIDDEN` | 403 | 无权限 |
| `NOT_FOUND` | 404 | 资源不存在 |
| `DOCTOR_NOT_FOUND` | 404 | 医生不存在 |
| `PATIENT_NOT_FOUND` | 404 | 患者不存在 |
| `QUESTION_NOT_FOUND` | 404 | 问题不存在 |
| `CONFLICT` | 409 | 资源冲突 |
| `QUESTION_ALREADY_ANSWERED` | 409 | 问题已被回答 |
| `RATE_LIMIT_EXCEEDED` | 429 | 请求频率超限 |
| `INTERNAL_ERROR` | 500 | 服务器内部错误 |

---

## API 测试

### 测试账号

#### 医生账号
```
用户名: dr-zhang-wei
密码: 123456
```

```
用户名: dr-li-na
密码: 123456
```

#### 患者账号
```
姓名: 赵明
生日: 1985-03-15
```

```
姓名: 孙丽
生日: 1990-07-22
```

### 完整测试流程

#### 1. 医生登录并查看问题
```bash
# 步骤1: 医生登录
curl -X POST http://localhost:3000/api/v1/auth/doctor/login \
  -H "Content-Type: application/json" \
  -d '{"username":"dr-zhang-wei","password":"123456"}' \
  -c cookies.txt

# 步骤2: 获取待回答问题
curl -X GET "http://localhost:3000/api/v1/questions?status=pending" \
  -H "Authorization: Bearer <token_from_step1>"

# 步骤3: 回答问题
curl -X PUT http://localhost:3000/api/v1/questions/q001/answer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_from_step1>" \
  -d '{"answer":"根据您的描述，建议您做个心电图检查。"}'
```

#### 2. 患者验证并提交问题
```bash
# 步骤1: 患者验证
curl -X POST http://localhost:3000/api/v1/auth/patient/verify \
  -H "Content-Type: application/json" \
  -d '{"name":"赵明","birthday":"1985-03-15"}'

# 步骤2: 查看可用医生
curl -X GET "http://localhost:3000/api/v1/doctors?isActive=true"

# 步骤3: 提交问题
curl -X POST http://localhost:3000/api/v1/questions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_from_step1>" \
  -d '{"doctorId":"doc001","question":"最近总是感觉胸闷气短，这是什么原因？"}'
```

---

## API 实现建议

### 后端技术栈建议

#### Node.js + Express + TypeScript
```typescript
// src/api/routes/doctor.ts
import { Router } from 'express';
import { DoctorController } from '../controllers/DoctorController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const controller = new DoctorController();

router.get('/', controller.list);
router.get('/me', authMiddleware, controller.getCurrentDoctor);
router.get('/:id', controller.getById);
router.put('/me', authMiddleware, controller.update);

export default router;
```

#### 数据库连接（PostgreSQL）
```typescript
// src/database/connection.ts
import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
```

### 前端 API 客户端

#### Axios 封装
```typescript
// src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

#### API 模块化
```typescript
// src/api/doctor.ts
import apiClient from './client';
import type { Doctor } from '@/types';

export const doctorApi = {
  list: (params?: { isActive?: boolean; department?: string }) => 
    apiClient.get('/doctors', { params }),
  
  getById: (id: string) => 
    apiClient.get(`/doctors/${id}`),
  
  getCurrent: () => 
    apiClient.get('/doctors/me'),
  
  update: (data: Partial<Doctor>) => 
    apiClient.put('/doctors/me', data),
};
```

---

## WebSocket 扩展（实时通信）

### WebSocket 端点

**连接地址**: `ws://localhost:3000/ws`

**认证**: 连接时通过 query 参数传递 token
```
ws://localhost:3000/ws?token=<jwt_token>
```

### 事件类型

#### 医生端事件
```typescript
// 新问题通知
{
  "event": "new_question",
  "data": {
    "questionId": "q008",
    "patientName": "赵明",
    "question": "问题描述..."
  }
}
```

#### 患者端事件
```typescript
// 问题已回答通知
{
  "event": "question_answered",
  "data": {
    "questionId": "q001",
    "doctorName": "张伟医生",
    "answer": "医生回复内容..."
  }
}
```

---

## API 变更日志

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| **v1.0.0** | 2026-04-17 | 初始 API 设计文档发布 |

---

## 未来扩展计划

### v1.1.0 计划功能
- 预约挂号 API
- 处方管理 API
- 在线支付 API
- 文件上传 API（检查报告、影像）

### v1.2.0 计划功能
- 视频问诊 API
- 实时聊天 API
- 评价反馈 API
- 数据导出 API

---

*此 API 文档应在端点变更时更新。使用 `/asdm-context-update` 命令保持文档最新。*
