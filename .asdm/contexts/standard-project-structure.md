# 标准项目结构

## 概述
本文档定义了在线医疗问诊平台项目的标准结构。它提供了组织文件和目录的指南，以保持一致性并促进团队协作。

## 当前项目结构

### 完整目录树
```
qa-live-healthcare/
├── .asdm/                          # ASDM配置和工具集
│   ├── contexts/                   # AI模型上下文文件
│   │   ├── index.md                # 工作空间索引
│   │   └── data-models.md          # 数据模型文档
│   └── toolsets/                   # 已安装的ASDM工具集
│       └── context-builder/        # Context Builder工具集
│           ├── actions/            # 操作指令
│           ├── specs/              # 规范模板
│           └── INSTALL.md          # 安装指南
├── .codebuddy/                     # CodeBuddy配置
│   └── commands/                   # ASDM命令快捷方式
│       ├── asdm-context-build.md   # 上下文生成命令
│       └── asdm-context-update.md  # 上下文更新命令
├── .bolt/                          # Bolt配置目录
├── public/                         # 静态资源目录
│   └── vue.svg                     # Vue图标文件
├── src/                            # 源代码目录
│   ├── assets/                     # 资源文件（图片、字体等）
│   │   └── vue.svg                 # Vue示例图片
│   ├── components/                 # Vue可复用组件
│   │   ├── AppFooter.vue           # 页脚组件
│   │   ├── AppHeader.vue           # 页头组件
│   │   └── HelloWorld.vue          # 示例组件
│   ├── data/                       # JSON数据文件
│   │   ├── doctor-user-list.json   # 医生列表数据
│   │   ├── patient-user.json       # 患者数据
│   │   └── question-list.json      # 问题列表数据
│   ├── router/                     # 路由配置
│   │   └── index.ts                # 路由定义文件
│   ├── store/                      # 状态管理
│   │   └── index.ts                # 响应式状态存储
│   ├── views/                      # 页面视图组件
│   │   ├── About.vue               # 关于页面
│   │   ├── Consultation.vue        # 问诊页面
│   │   ├── DoctorLogin.vue         # 医生登录页面
│   │   ├── DoctorRoom.vue          # 医生诊室页面
│   │   ├── Doctors.vue             # 医生列表页面
│   │   └── Home.vue                # 首页
│   ├── App.vue                     # 应用根组件
│   ├── main.ts                     # 应用入口文件
│   ├── style.css                   # 全局样式文件
│   └── vite-env.d.ts               # Vite环境类型声明
├── index.html                      # HTML入口文件
├── package.json                    # 项目依赖配置
├── package-lock.json               # 依赖锁定文件
├── tsconfig.json                   # TypeScript主配置
├── tsconfig.app.json               # 应用TypeScript配置
├── tsconfig.node.json              # Node TypeScript配置
├── tsconfig.app.tsbuildinfo        # TypeScript构建信息
├── tsconfig.node.tsbuildinfo       # Node构建信息
├── vite.config.ts                  # Vite构建配置
├── README.md                       # 项目说明文档
└── .gitignore                      # Git忽略规则
```

## 目录用途和约定

### 核心源代码目录 (`src/`)

#### `src/views/` - 页面视图组件
**用途**: 存放页面级组件，每个组件对应一个路由页面。

**当前文件**:
- `Home.vue` - 首页，展示平台概览和在线医生
- `Consultation.vue` - 问诊页面，患者提交问题
- `DoctorLogin.vue` - 医生登录页面
- `DoctorRoom.vue` - 医生诊室管理页面
- `Doctors.vue` - 医生列表展示页面
- `About.vue` - 关于页面

**约定**:
- 使用 PascalCase 命名：`DoctorRoom.vue`
- 每个页面组件对应一个路由
- 业务逻辑应提取到 composable 或 store

#### `src/components/` - 可复用组件
**用途**: 存放可在多个页面间复用的UI组件。

**当前文件**:
- `AppHeader.vue` - 全局页头组件
- `AppFooter.vue` - 全局页脚组件
- `HelloWorld.vue` - 示例组件

**约定**:
- 使用 PascalCase 命名
- 组件应该是可复用的、独立的
- 通过 props 和 emits 进行数据传递
- 复杂组件可创建子目录：`components/forms/InputField.vue`

#### `src/router/` - 路由配置
**用途**: 定义应用的路由规则和导航逻辑。

**当前文件**:
- `index.ts` - 路由定义和配置

**建议扩展**:
```
src/router/
├── index.ts              # 路由主入口
├── routes/               # 路由模块化
│   ├── doctor.ts         # 医生相关路由
│   ├── patient.ts        # 患者相关路由
│   └── public.ts         # 公共页面路由
└── guards/               # 路由守卫
    ├── auth.ts           # 认证守卫
    └── permission.ts     # 权限守卫
```

#### `src/store/` - 状态管理
**用途**: 集中管理应用状态和业务逻辑。

**当前实现**: 使用 Vue 3 的 `reactive` 实现简单状态管理

**建议扩展**:
```
src/store/
├── index.ts              # 主store导出
├── modules/              # 状态模块（如使用Pinia）
│   ├── doctor.ts         # 医生状态模块
│   ├── patient.ts        # 患者状态模块
│   └── question.ts       # 问题状态模块
└── types.ts              # 状态类型定义
```

**推荐工具**: 考虑迁移到 [Pinia](https://pinia.vuejs.org/)（Vue 3 官方推荐的状态管理库）

#### `src/data/` - 静态数据文件
**用途**: 存放JSON格式的模拟数据。

**当前文件**:
- `doctor-user-list.json` - 医生列表
- `patient-user.json` - 患者信息
- `question-list.json` - 问题列表

**约定**:
- 仅用于原型开发和测试
- 生产环境应替换为API调用
- 数据结构应与 TypeScript 接口保持一致

**建议扩展**:
```
src/data/
├── mock/                 # Mock数据
│   ├── doctor-user-list.json
│   ├── patient-user.json
│   └── question-list.json
└── fixtures/             # 测试固件数据
    └── test-data.json
```

#### `src/assets/` - 静态资源
**用途**: 存放图片、字体、图标等静态资源。

**约定**:
- 图片文件：`assets/images/`
- 字体文件：`assets/fonts/`
- 样式文件：`assets/styles/`（或使用 `src/styles/`）
- 小于 4KB 的图片会被 Vite 自动转为 base64

**建议扩展**:
```
src/assets/
├── images/
│   ├── icons/            # 图标
│   ├── logos/            # Logo
│   └── doctors/          # 医生头像
├── fonts/
│   └── custom-font.woff2
└── styles/
    ├── variables.css     # CSS变量
    ├── reset.css         # 样式重置
    └── utilities.css     # 工具类样式
```

### 配置文件目录

#### 根目录配置文件
| 文件名 | 用途 | 重要程度 |
|--------|------|----------|
| `package.json` | 项目依赖和脚本配置 | ⭐⭐⭐⭐⭐ |
| `tsconfig.json` | TypeScript主配置 | ⭐⭐⭐⭐⭐ |
| `vite.config.ts` | Vite构建工具配置 | ⭐⭐⭐⭐⭐ |
| `index.html` | 应用HTML入口 | ⭐⭐⭐⭐⭐ |
| `.gitignore` | Git版本控制忽略规则 | ⭐⭐⭐⭐ |

#### TypeScript配置文件
- `tsconfig.json` - 主配置文件，继承其他配置
- `tsconfig.app.json` - 应用代码的TypeScript配置
- `tsconfig.node.json` - Node环境（如Vite配置）的TypeScript配置

### 特殊目录

#### `.asdm/` - ASDM工具集目录
**用途**: ASDM (AI First System Development Methodology) 相关配置和工具集。

**结构**:
- `contexts/` - AI模型上下文文档
- `toolsets/` - 已安装的ASDM工具集

**约定**:
- 不要手动编辑 `.asdm/toolsets/` 中的文件
- 使用 ASDM CLI 命令管理工具集
- 上下文文件应保持更新

#### `.codebuddy/` - CodeBuddy配置目录
**用途**: Tencent CodeBuddy AI 编程助手的配置和命令。

**结构**:
- `commands/` - 自定义命令快捷方式

## Vue 3 项目结构最佳实践

### 组件组织方式

#### 按功能模块组织（推荐用于大型项目）
```
src/
├── modules/                       # 功能模块
│   ├── doctor/                    # 医生模块
│   │   ├── views/
│   │   │   ├── DoctorLogin.vue
│   │   │   └── DoctorRoom.vue
│   │   ├── components/
│   │   │   └── DoctorCard.vue
│   │   ├── store/
│   │   │   └── doctor.ts
│   │   ├── router/
│   │   │   └── doctor.ts
│   │   └── types/
│   │       └── doctor.ts
│   ├── patient/                   # 患者模块
│   └── consultation/              # 问诊模块
├── shared/                        # 共享资源
│   ├── components/
│   ├── composables/
│   └── utils/
└── core/                          # 核心功能
    ├── router/
    ├── store/
    └── api/
```

#### 按技术层次组织（当前采用，适合小型项目）
```
src/
├── views/          # 页面组件
├── components/     # 可复用组件
├── router/         # 路由配置
├── store/          # 状态管理
├── data/           # 数据文件
└── assets/         # 静态资源
```

### Composables 目录（建议添加）
**用途**: 存放 Vue 3 组合式 API 的可复用逻辑。

**建议结构**:
```
src/composables/
├── useAuth.ts           # 认证逻辑
├── useDoctor.ts         # 医生相关逻辑
├── usePatient.ts        # 患者相关逻辑
├── useQuestion.ts       # 问题管理逻辑
└── useNotification.ts   # 通知逻辑
```

**示例**:
```typescript
// src/composables/useAuth.ts
import { ref, computed } from 'vue';
import { store } from '@/store';

export function useAuth() {
  const currentUser = computed(() => store.state.currentDoctor);
  const isAuthenticated = computed(() => !!currentUser.value);

  const login = async (username: string, password: string) => {
    const doctor = store.loginDoctor(username, password);
    return !!doctor;
  };

  const logout = () => {
    store.logoutDoctor();
  };

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
  };
}
```

### API 目录（建议添加）
**用途**: 封装API请求和后端通信。

**建议结构**:
```
src/api/
├── index.ts              # API主入口和配置
├── doctor.ts             # 医生相关API
├── patient.ts            # 患者相关API
├── question.ts           # 问题相关API
└── types.ts              # API响应类型定义
```

**示例**:
```typescript
// src/api/index.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
```

### 工具函数目录（建议添加）
**用途**: 存放通用的工具函数。

**建议结构**:
```
src/utils/
├── index.ts              # 工具函数主入口
├── date.ts               # 日期处理
├── validation.ts         # 数据验证
├── format.ts             # 格式化工具
└── constants.ts          # 常量定义
```

### 类型定义目录（建议添加）
**用途**: 集中管理 TypeScript 类型定义。

**建议结构**:
```
src/types/
├── index.ts              # 类型导出入口
├── doctor.ts             # 医生相关类型
├── patient.ts            # 患者相关类型
├── question.ts           # 问题相关类型
└── api.ts                # API响应类型
```

## 命名约定

### 文件命名

#### Vue 组件
- **PascalCase**: `DoctorRoom.vue`, `PatientCard.vue`
- **多词命名**: 避免使用 `Header.vue`，使用 `AppHeader.vue`

#### TypeScript 文件
- **camelCase**: `useAuth.ts`, `doctorApi.ts`
- **描述性命名**: 文件名应清晰表达其用途

#### 样式文件
- **kebab-case**: `reset.css`, `theme-variables.css`

#### 测试文件
- **`.spec.ts` 后缀**: `DoctorCard.spec.ts`
- **`.test.ts` 后缀**: `useAuth.test.ts`

### 目录命名
- **kebab-case**: `user-management/`, `api-gateway/`
- **简短明确**: 目录名应简洁但具有描述性

### 组件命名
```typescript
// ✅ 推荐
AppHeader.vue
DoctorLoginCard.vue
QuestionAnswerForm.vue

// ❌ 避免
header.vue           // 单词，可能与HTML元素冲突
doctor_login.vue     // 使用下划线
DoctorLoginV2.vue    // 版本号应通过文档管理
```

## 测试目录结构（建议添加）

```
tests/
├── unit/                        # 单元测试
│   ├── components/
│   │   ├── AppHeader.spec.ts
│   │   └── DoctorCard.spec.ts
│   ├── composables/
│   │   └── useAuth.spec.ts
│   └── store/
│       └── store.spec.ts
├── integration/                 # 集成测试
│   └── doctor-workflow.spec.ts
└── e2e/                         # 端到端测试（如使用Cypress）
    ├── login.cy.ts
    └── consultation.cy.ts
```

## 配置文件管理

### 环境变量文件（建议添加）
```
项目根目录/
├── .env                         # 全局环境变量
├── .env.development             # 开发环境变量
├── .env.staging                 # 预发布环境变量
├── .env.production              # 生产环境变量
└── .env.example                 # 环境变量示例（提交到Git）
```

**示例 `.env.example`**:
```bash
# API配置
VITE_API_BASE_URL=https://api.example.com
VITE_API_TIMEOUT=10000

# 认证配置
VITE_AUTH_TOKEN_KEY=auth_token

# 功能开关
VITE_ENABLE_MOCK_DATA=true
```

## 扩展建议

### 当前项目缺失的目录

1. **`src/composables/`** - 可复用的组合式函数
2. **`src/api/`** - API请求封装
3. **`src/utils/`** - 工具函数
4. **`src/types/`** - 类型定义
5. **`src/styles/`** - 全局样式
6. **`tests/`** - 测试文件
7. **`docs/`** - 项目文档

### 建议的目标结构

```
qa-live-healthcare/
├── .asdm/                          # ASDM配置
├── .codebuddy/                     # CodeBuddy配置
├── public/                         # 静态资源
├── src/
│   ├── api/                        # API封装 ⭐建议添加
│   ├── assets/                     # 资源文件
│   ├── components/                 # 可复用组件
│   ├── composables/                # 组合式函数 ⭐建议添加
│   ├── data/                       # 模拟数据
│   ├── router/                     # 路由配置
│   ├── store/                      # 状态管理
│   ├── styles/                     # 全局样式 ⭐建议添加
│   ├── types/                      # 类型定义 ⭐建议添加
│   ├── utils/                      # 工具函数 ⭐建议添加
│   ├── views/                      # 页面组件
│   ├── App.vue
│   └── main.ts
├── tests/                          # 测试文件 ⭐建议添加
├── docs/                           # 项目文档 ⭐建议添加
├── .env.example                    # 环境变量示例 ⭐建议添加
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 迁移步骤

### 第1步：创建新目录结构
```bash
mkdir -p src/{api,composables,types,utils,styles}
mkdir -p tests/{unit,integration,e2e}
mkdir -p docs
```

### 第2步：迁移类型定义
1. 从 `src/store/index.ts` 提取接口定义
2. 创建 `src/types/doctor.ts`, `src/types/patient.ts`, `src/types/question.ts`
3. 更新导入路径

### 第3步：提取组合式函数
1. 从页面组件提取可复用逻辑
2. 创建 `src/composables/useAuth.ts`, `src/composables/useDoctor.ts` 等

### 第4步：封装 API 层
1. 创建 `src/api/index.ts` 配置 axios 实例
2. 创建各模块的 API 文件

### 第5步：添加测试
1. 配置测试框架（Vitest）
2. 为关键逻辑添加单元测试

## 最佳实践总结

### 1. 保持扁平结构
- 避免过深的目录嵌套（最多 3-4 层）
- 相关文件应靠近放置

### 2. 清晰的职责分离
- 视图组件只负责展示
- 业务逻辑放在 composables 或 store
- API 调用封装在 api 层

### 3. 一致的命名约定
- 文件和目录遵循统一的命名规则
- 名称应清晰表达用途

### 4. 模块化设计
- 按功能模块组织代码
- 保持模块的低耦合和高内聚

### 5. 文档化
- 为复杂模块添加 README
- 保持代码注释的更新

---

*此项目结构文档应在项目演进过程中保持更新。使用 `/asdm-context-update` 命令更新此文档。*
