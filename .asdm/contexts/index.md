# 工作空间上下文索引

## 概述
本文档作为AI模型理解和操作此工作空间的索引和指南。它提供了工作空间内容的结构化概述，并引导AI模型找到相关的上下文信息。

## 工作空间信息

### 基本信息
- **工作空间名称**: qa-live-healthcare
- **项目名称**: 专业在线医疗问诊平台
- **描述**: 连接专业医生与患者，提供便捷、高效的医疗咨询服务
- **创建日期**: 2026-04-17
- **最后更新**: 2026-04-17

### 技术栈
- **主要开发语言**: TypeScript
- **前端框架**: Vue 3 (v3.5.10)
- **构建工具**: Vite (v5.4.8)
- **UI组件库**: Ant Design Vue (v4.2.6)
- **路由管理**: Vue Router (v4.6.3)
- **工具库**: dayjs (v1.11.19)
- **类型检查**: vue-tsc (v2.1.6)

### 业务上下文
- **业务领域**: 医疗健康
- **核心业务流程**:
  - 医生登录和身份验证
  - 患者身份验证和注册
  - 在线问诊咨询
  - 问题提交与回答管理
  - 医生诊室运营
- **关键业务规则**:
  - 医生需要通过用户名和密码登录才能进入诊室
  - 患者通过姓名和生日进行身份验证
  - 问题状态包括：待回答(pending)和已回答(answered)
  - 在线医生诊室对公众开放

## 工作空间结构

### 文件树结构
```
qa-live-healthcare/
├── .asdm/                          # ASDM配置和工具集
│   ├── contexts/                   # 上下文文件（本目录）
│   └── toolsets/                   # 已安装的工具集
│       └── context-builder/        # Context Builder工具集
├── .codebuddy/                     # CodeBuddy配置
│   └── commands/                   # ASDM命令快捷方式
├── public/                         # 静态资源目录
│   └── vue.svg                     # Vue图标
├── src/                            # 源代码目录
│   ├── assets/                     # 资源文件
│   ├── components/                 # Vue组件
│   │   ├── AppFooter.vue           # 页脚组件
│   │   ├── AppHeader.vue           # 页头组件
│   │   └── HelloWorld.vue          # 示例组件
│   ├── data/                       # 数据文件
│   │   ├── doctor-user-list.json   # 医生列表数据
│   │   ├── patient-user.json       # 患者数据
│   │   └── question-list.json      # 问题列表数据
│   ├── router/                     # 路由配置
│   │   └── index.ts                # 路由定义
│   ├── store/                      # 状态管理
│   │   └── index.ts                # 响应式状态存储
│   ├── views/                      # 页面视图
│   │   ├── About.vue               # 关于页面
│   │   ├── Consultation.vue        # 问诊页面
│   │   ├── DoctorLogin.vue         # 医生登录页面
│   │   ├── DoctorRoom.vue          # 医生诊室页面
│   │   ├── Doctors.vue             # 医生列表页面
│   │   └── Home.vue                # 首页
│   ├── App.vue                     # 根组件
│   ├── main.ts                     # 应用入口
│   ├── style.css                   # 全局样式
│   └── vite-env.d.ts               # Vite类型声明
├── index.html                      # HTML入口文件
├── package.json                    # 项目依赖配置
├── tsconfig.json                   # TypeScript配置
├── tsconfig.app.json               # 应用TypeScript配置
├── tsconfig.node.json              # Node TypeScript配置
└── vite.config.ts                  # Vite配置文件
```

### 关键目录说明
- **`src/views/`**: 页面视图组件 - AI应关注此处的业务逻辑实现
- **`src/components/`**: 可复用组件 - AI应在此创建通用组件
- **`src/store/`**: 状态管理 - 集中管理应用状态和业务逻辑
- **`src/router/`**: 路由配置 - 定义应用路由规则
- **`src/data/`**: JSON数据文件 - 模拟后端数据
- **`.asdm/contexts/`**: 上下文文件 - AI模型参考文档

### 核心数据模型

#### Doctor（医生）
```typescript
interface Doctor {
  id: string;
  username: string;
  password: string;
  name: string;
  title: string;         // 职称
  department: string;    // 科室
  avatar: string;
  experience: string;    // 经验
  specialties: string[]; // 专长
  isActive: boolean;     // 是否在线
}
```

#### Patient（患者）
```typescript
interface Patient {
  id: string;
  name: string;
  birthday: string;
  phone: string;
  gender: string;
}
```

#### Question（问题）
```typescript
interface Question {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  question: string;
  submitTime: string;
  status: 'pending' | 'answered';
  answer: string | null;
  answerTime: string | null;
}
```

### 路由配置

| 路径 | 名称 | 组件 | 说明 |
|------|------|------|------|
| `/` | Home | Home.vue | 首页，展示平台概览和在线医生 |
| `/consultation` | Consultation | Consultation.vue | 问诊页面 |
| `/consultation/:doctorUsername` | ConsultationRoom | Consultation.vue | 指定医生的问诊室 |
| `/doctors` | Doctors | Doctors.vue | 医生列表页面 |
| `/about` | About | About.vue | 关于页面 |
| `/doctor/login` | DoctorLogin | DoctorLogin.vue | 医生登录页面 |
| `/doctor/room/:username` | DoctorRoom | DoctorRoom.vue | 医生诊室管理页面 |

## 开发指南

### 构建和编译
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 开发服务器
- **开发服务器**: Vite开发服务器
- **默认端口**: 通常为 5173
- **热更新**: 支持

### 代码质量
- **类型检查**: 使用 `vue-tsc` 进行TypeScript类型检查
- **构建验证**: 构建过程包含类型检查
- **代码风格**: Vue 3 Composition API (`<script setup>`)

## 上下文文件参考

本工作空间在 `.asdm/contexts/` 目录中提供以下上下文文件：

1. **[standard-project-structure.md](./standard-project-structure.md)** - 标准项目结构和组织方式
2. **[standard-coding-style.md](./standard-coding-style.md)** - 编码标准和风格指南
3. **[data-models.md](./data-models.md)** - 数据模型、关系和图示
4. **[deployment.md](./deployment.md)** - 部署配置和流程
5. **[api.md](./api.md)** - API定义、端点和文档
6. **[architecture.md](./architecture.md)** - 系统架构和设计决策

## AI模型指南

### 如何使用此上下文
1. **从此索引开始** 了解工作空间结构
2. **根据具体任务** 参考特定的上下文文件
3. **遵循开发指南** 进行构建、测试和部署
4. **保持一致性** 遵循现有模式和约定

### 常见任务指南
- **添加新功能**: 首先查看架构和数据模型
- **修改API**: 参考API文档并相应更新
- **数据模型变更**: 更新数据模型和迁移脚本
- **部署更新**: 遵循部署流程文档

### 代码模式
- **组件开发**: 使用 Vue 3 Composition API (`<script setup lang="ts">`)
- **状态管理**: 使用响应式 `reactive` 对象，避免复杂的状态管理库
- **路由导航**: 使用 Vue Router 的 `useRouter()` 和 `router.push()`
- **数据存储**: 目前使用 JSON 文件模拟，后续可迁移至真实后端

### 故障排查
- 如遇问题，检查相关的上下文文件
- 对于构建问题，验证依赖和配置
- 对于运行时问题，检查部署和环境配置
- 对于类型错误，检查 TypeScript 配置

## 后续开发建议

### 待完善功能
1. 真实后端API集成
2. 用户认证和授权系统
3. 实时通信功能（WebSocket）
4. 数据持久化存储
5. 单元测试和端到端测试
6. 国际化支持

### 技术债务
- 当前使用JSON文件模拟数据，需要迁移至真实数据库
- 缺少完整的错误处理机制
- 需要添加表单验证逻辑
- 需要优化移动端响应式体验

## 版本历史

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|----------|------|
| 1.0.0 | 2026-04-17 | 初始上下文创建 | Context Builder |

---

*此上下文文件由Context Builder工具集维护。当工作空间发生变更时，使用 `/asdm-context-update` 命令更新。*
