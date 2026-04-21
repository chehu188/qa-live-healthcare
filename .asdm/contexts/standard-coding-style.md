# 标准编码风格

## 概述
本文档定义了在线医疗问诊平台项目的编码标准和风格指南。一致的编码风格能够提高代码的可读性、可维护性和团队协作效率。

## 总体原则

### 1. 可读性优先
- 代码应该易于阅读和理解
- 使用有意义的变量、函数和类名
- 编写自解释的代码，清晰表达意图

### 2. 一致性
- 在整个代码库中遵循相同的模式
- 使用语言和框架的既定约定
- 保持团队成员之间的编码风格一致

### 3. 可维护性
- 编写易于修改和扩展的代码
- 保持函数和组件专注于单一职责
- 避免不必要的复杂性

## Vue 3 + TypeScript 编码规范

### 文件结构

#### Vue 单文件组件（SFC）结构
```vue
<!-- 1. Template 部分 -->
<template>
  <!-- HTML 模板内容 -->
</template>

<!-- 2. Script 部分 -->
<script setup lang="ts">
  // TypeScript 逻辑代码
</script>

<!-- 3. Style 部分 -->
<style scoped>
  /* CSS 样式 */
</style>
```

**约定**:
- 使用 `<script setup lang="ts">` 语法（Vue 3 Composition API）
- Style 使用 `scoped` 属性，避免样式污染
- 三个部分之间空一行分隔

### 命名约定

#### 变量和函数
```typescript
// ✅ 推荐：使用 camelCase
const userName = '张医生';
const isActive = true;
const doctorList = [];

function calculateTotal() {}
function getUserInfo() {}
const handleSubmit = () => {};
```

#### 组件命名
```typescript
// ✅ 推荐：使用 PascalCase，多词命名
DoctorRoom.vue
PatientCard.vue
QuestionAnswerForm.vue

// ❌ 避免
doctor-room.vue      // 使用 kebab-case
Doctor.vue           // 单词命名，可能与HTML元素冲突
doctorRoom.vue       // 使用 camelCase
```

#### 接口和类型
```typescript
// ✅ 推荐：接口使用 PascalCase，不加 I 前缀
interface Doctor {
  id: string;
  name: string;
  title: string;
}

interface Patient {
  id: string;
  name: string;
}

// ✅ 推荐：类型别名使用 PascalCase
type QuestionStatus = 'pending' | 'answered';
type UserRole = 'doctor' | 'patient';

// ❌ 避免
interface IDoctor {}   // 不要加 I 前缀
type doctor = {};      // 不要使用 camelCase
```

#### 常量
```typescript
// ✅ 推荐：使用 UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_PAGE_SIZE = 10;

// ✅ 推荐枚举常量
enum QuestionStatus {
  PENDING = 'pending',
  ANSWERED = 'answered',
}

// ✅ 简单常量可使用 camelCase（仅在组件内部）
const defaultAvatar = '/default-avatar.png';
```

### TypeScript 类型注解

#### 显式类型声明
```typescript
// ✅ 推荐：为函数参数和返回值添加类型
function formatDate(date: string): string {
  return dayjs(date).format('YYYY-MM-DD');
}

// ✅ 推荐：为变量添加类型注解（当类型不明确时）
const pendingQuestions: Question[] = questions.filter(q => q.status === 'pending');

// ✅ 推荐：使用接口定义对象形状
interface Doctor {
  id: string;
  username: string;
  name: string;
  title: string;
  department: string;
  avatar: string;
  experience: string;
  specialties: string[];
  isActive: boolean;
}

// ❌ 避免：使用 any 类型
function process(data: any) { }  // 类型不安全

// ✅ 推荐：使用 unknown 或具体类型
function process(data: unknown) {
  if (typeof data === 'string') {
    // ...
  }
}
```

#### 类型导入
```typescript
// ✅ 推荐：使用 type 关键字导入类型
import type { Doctor, Patient, Question } from '../store';

// ✅ 推荐：混合导入
import { store, Question } from '../store';
import type { Ref } from 'vue';
```

### 代码格式化

#### 缩进和空格
```typescript
// ✅ 使用 2 空格缩进
function example() {
  if (condition) {
    // ...
  }
}

// ✅ 运算符两侧加空格
const total = a + b;
const isValid = count > 0;

// ✅ 逗号后加空格
const user = { name: '张三', age: 30 };
const list = [1, 2, 3, 4];
```

#### 引号使用
```typescript
// ✅ 推荐：使用单引号
const message = 'Hello';
const path = '/doctor/login';

// ✅ 推荐：模板字符串用于插值
const greeting = `你好，${userName}`;

// ✅ 推荐：字符串包含单引号时使用双引号
const text = "It's a test";
```

#### 分号使用
```typescript
// ✅ 推荐：使用分号（遵循 TypeScript 标准）
const name = 'John';
function greet() {
  return 'Hello';
}

// ✅ 推荐在语句块的开始和结束使用分号
const app = createApp(App);
app.use(router);
app.mount('#app');
```

#### 行长度
```typescript
// ✅ 推荐：每行不超过 100 字符
const pendingQuestions = computed(() =>
  currentDoctor.value
    ? store.getQuestionsByDoctor(currentDoctor.value.id).filter(q => q.status === 'pending')
    : []
);

// ✅ 推荐：长链式调用换行
const result = array
  .filter(item => item.active)
  .map(item => item.value)
  .reduce((sum, val) => sum + val, 0);
```

### Vue 3 Composition API 最佳实践

#### 响应式数据
```typescript
// ✅ 推荐：使用 ref 和 reactive
import { ref, reactive, computed } from 'vue';

// 简单值使用 ref
const count = ref(0);
const userName = ref('');
const isVisible = ref(false);

// 对象使用 reactive
const state = reactive({
  doctors: [],
  patients: [],
  currentDoctor: null,
});

// ✅ 推荐：使用 computed 处理派生状态
const activeDoctors = computed(() => 
  state.doctors.filter(d => d.isActive)
);

// ✅ 推荐：访问 ref 值时使用 .value（在 script 中）
const increment = () => {
  count.value++;
};

// ✅ 推荐：在模板中直接使用 ref（自动解包）
// <div>{{ count }}</div>
```

#### 组合式函数（Composables）
```typescript
// ✅ 推荐：提取可复用逻辑到 composables
// src/composables/useAuth.ts
import { ref, computed } from 'vue';
import { store } from '@/store';

export function useAuth() {
  const currentUser = computed(() => store.state.currentDoctor);
  const isAuthenticated = computed(() => !!currentUser.value);

  const login = async (username: string, password: string): Promise<boolean> => {
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

// 使用 composables
import { useAuth } from '@/composables/useAuth';

const { currentUser, login, logout } = useAuth();
```

#### 生命周期钩子
```typescript
// ✅ 推荐：按执行顺序组织生命周期钩子
import { onMounted, onUnmounted, onUpdated } from 'vue';

onMounted(() => {
  console.log('组件已挂载');
  // 初始化逻辑
});

onUpdated(() => {
  console.log('组件已更新');
});

onUnmounted(() => {
  console.log('组件已卸载');
  // 清理逻辑
});
```

### 组件编写规范

#### Props 定义
```typescript
// ✅ 推荐：使用 TypeScript 接口定义 props
interface Props {
  title: string;
  doctorId: string;
  isActive?: boolean;  // 可选属性
}

const props = defineProps<Props>();

// ✅ 推荐：为 props 提供默认值
interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
});
```

#### Emits 定义
```typescript
// ✅ 推荐：明确定义事件
interface Emits {
  (e: 'update', value: string): void;
  (e: 'submit', data: FormData): void;
  (e: 'cancel'): void;
}

const emit = defineEmits<Emits>();

// 使用 emit
emit('update', newValue);
emit('submit', formData);
```

#### 组件组织示例
```vue
<template>
  <div class="doctor-card">
    <img :src="doctor.avatar" :alt="doctor.name" />
    <h3>{{ doctor.name }}</h3>
    <p>{{ doctor.title }} · {{ doctor.department }}</p>
    <a-button @click="handleSelect">选择医生</a-button>
  </div>
</template>

<script setup lang="ts">
// 1. 导入
import { computed } from 'vue';
import type { Doctor } from '@/types';

// 2. Props 和 Emits
interface Props {
  doctor: Doctor;
}

interface Emits {
  (e: 'select', doctorId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 3. 响应式数据
const isActive = computed(() => props.doctor.isActive);

// 4. 方法
const handleSelect = () => {
  emit('select', props.doctor.id);
};

// 5. 生命周期钩子
// ...
</script>

<style scoped>
.doctor-card {
  /* 样式 */
}
</style>
```

### 样式编写规范

#### CSS 选择器命名
```css
/* ✅ 推荐：使用 kebab-case 和语义化类名 */
.doctor-card { }
.doctor-avatar { }
.question-list { }
.submit-button { }

/* ✅ 推荐：使用 BEM 命名（可选） */
.card { }
.card__header { }
.card__body { }
.card--active { }

/* ❌ 避免：使用 camelCase */
.doctorCard { }
.submitButton { }

/* ❌ 避免：过度嵌套 */
.doctor-card .header .title .text { }
```

#### 样式组织
```css
/* ✅ 推荐：按布局、外观、交互顺序组织样式 */
.doctor-card {
  /* 1. 布局相关 */
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* 2. 尺寸和边距 */
  width: 300px;
  padding: 24px;
  margin: 16px;
  
  /* 3. 外观样式 */
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  /* 4. 文字样式 */
  font-size: 14px;
  color: #333;
  
  /* 5. 其他 */
  cursor: pointer;
  transition: all 0.3s;
}

/* ✅ 推荐：使用 CSS 变量 */
:root {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --danger-color: #ff4d4f;
  --text-color: #333;
  --border-radius: 12px;
}

.doctor-card {
  background: var(--primary-color);
  border-radius: var(--border-radius);
}
```

#### 响应式设计
```css
/* ✅ 推荐：使用移动优先的媒体查询 */
.container {
  width: 100%;
  padding: 16px;
}

@media (min-width: 768px) {
  .container {
    max-width: 1200px;
    padding: 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 32px;
  }
}

/* ✅ 推荐：使用相对单位 */
.doctor-card {
  width: 100%;
  max-width: 30rem;  /* 使用 rem */
  font-size: 1rem;
  gap: 1em;          /* 使用 em */
}
```

## 错误处理规范

### 异常捕获
```typescript
// ✅ 推荐：使用 try-catch 处理可预期的错误
async function fetchDoctor(id: string): Promise<Doctor | null> {
  try {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof NetworkError) {
      message.error('网络错误，请检查网络连接');
    } else if (error instanceof NotFoundError) {
      message.error('医生不存在');
    } else {
      message.error('获取医生信息失败');
      console.error('Fetch doctor error:', error);
    }
    return null;
  }
}

// ❌ 避免：空 catch 块
try {
  riskyOperation();
} catch (error) {
  // 什么都不做
}

// ✅ 推荐：至少记录错误
try {
  riskyOperation();
} catch (error) {
  console.error('Operation failed:', error);
}
```

### 用户友好的错误提示
```typescript
// ✅ 推荐：使用 Ant Design Vue 的 message 组件
import { message } from 'ant-design-vue';

// 成功提示
message.success('保存成功');

// 错误提示
message.error('保存失败，请重试');

// 警告提示
message.warning('该操作可能会影响数据');

// 信息提示
message.info('请先登录');
```

## 注释规范

### 何时注释
- 解释"为什么"而不是"什么"（代码本身应该清晰表达功能）
- 文档化复杂的算法或业务逻辑
- 标注临时的变通方案或 TODO
- 文档化公共 API 和接口

### 注释风格

#### 单行注释
```typescript
// ✅ 推荐：单行注释使用 //
// 计算折扣后的价格
const finalPrice = price * (1 - discount);

// ✅ 推荐：说明复杂的业务逻辑
// 使用 Dijkstra 算法查找最短路径（用于医生推荐功能）
const shortestPath = findShortestPath(graph, start, end);

// ❌ 避免：无意义的注释
const count = 0;  // 初始化计数器为0
```

#### 多行注释
```typescript
// ✅ 推荐：使用 JSDoc 风格的注释
/**
 * 根据医生ID获取问题列表
 * 
 * @param doctorId - 医生ID
 * @param status - 问题状态过滤（可选）
 * @returns 医生的问题列表
 * 
 * @example
 * const questions = getQuestionsByDoctor('doc001', 'pending');
 */
function getQuestionsByDoctor(
  doctorId: string, 
  status?: QuestionStatus
): Question[] {
  return state.questions.filter(q => 
    q.doctorId === doctorId && 
    (!status || q.status === status)
  );
}
```

#### TODO 和 FIXME 注释
```typescript
// ✅ 推荐：使用标准格式
// TODO: 添加分页功能
// FIXME: 修复在移动端的显示问题
// HACK: 临时解决方案，需要重构
// NOTE: 这个API将在下个版本中废弃
```

## Git 提交规范

### 提交消息格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type 类型
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构（既不是新功能也不是修复 bug）
- `perf`: 性能优化
- `test`: 添加测试
- `chore`: 构建过程或辅助工具的变动

#### 示例
```bash
# 新功能
feat(doctor): 添加医生登录功能

# Bug 修复
fix(question): 修复问题状态更新不正确的bug

# 文档更新
docs(readme): 更新安装说明

# 重构
refactor(store): 重构状态管理逻辑

# 性能优化
perf(list): 优化医生列表渲染性能
```

## 测试规范

### 测试文件命名
```
// 单元测试
DoctorCard.spec.ts
useAuth.spec.ts

// 集成测试
doctor-workflow.spec.ts

// E2E 测试（如使用 Cypress）
login.cy.ts
consultation.cy.ts
```

### 测试结构
```typescript
// ✅ 推荐：使用 AAA 模式（Arrange, Act, Assert）
describe('useAuth', () => {
  describe('login', () => {
    it('should return true when credentials are valid', () => {
      // Arrange
      const username = 'dr-zhang-wei';
      const password = '123456';

      // Act
      const result = store.loginDoctor(username, password);

      // Assert
      expect(result).toBeTruthy();
      expect(store.state.currentDoctor).toBeDefined();
    });

    it('should return false when credentials are invalid', () => {
      // Arrange
      const username = 'invalid';
      const password = 'wrong';

      // Act
      const result = store.loginDoctor(username, password);

      // Assert
      expect(result).toBeNull();
      expect(store.state.currentDoctor).toBeNull();
    });
  });
});
```

### 测试命名约定
```typescript
// ✅ 推荐：使用描述性的测试名称
it('should return user when valid ID is provided', () => {});
it('should throw error when email is duplicate', () => {});
it('should display error message when login fails', () => {});

// ❌ 避免：模糊的测试名称
it('works', () => {});
it('test login', () => {});
```

## 性能优化建议

### 组件性能
```typescript
// ✅ 推荐：使用 computed 缓存计算结果
const activeDoctors = computed(() => 
  doctors.value.filter(d => d.isActive)
);

// ❌ 避免：在模板中使用复杂表达式
<div>{{ doctors.filter(d => d.isActive).length }}</div>

// ✅ 推荐：使用 v-if 和 v-show 合理选择
// v-if: 条件很少改变
// v-show: 频繁切换

// ✅ 推荐：使用 v-for 时添加 key
<div v-for="doctor in doctors" :key="doctor.id">
  {{ doctor.name }}
</div>
```

### 列表渲染优化
```typescript
// ✅ 推荐：大数据列表使用虚拟滚动
import { VirtualList } from 'ant-design-vue';

// ✅ 推荐：分页加载
const loadMore = async () => {
  const newData = await fetchDoctors(page.value + 1);
  doctors.value.push(...newData);
  page.value++;
};
```

## 工具配置

### EditorConfig
```ini
# .editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

### ESLint 配置
```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "parser": "@typescript-eslint/parser"
  },
  "rules": {
    "no-console": "warn",
    "no-debugger": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { 
      "argsIgnorePattern": "^_" 
    }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "vue/multi-word-component-names": "error",
    "vue/no-v-html": "warn"
  }
}
```

### Prettier 配置
```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

## 代码审查清单

### 审查要点
1. **功能正确性**: 代码是否按预期工作？
2. **可读性**: 代码是否易于理解？
3. **测试覆盖**: 是否有足够的测试？
4. **性能**: 是否存在性能问题？
5. **安全性**: 是否存在安全漏洞？
6. **可维护性**: 代码是否易于维护？

### 审查意见撰写
```markdown
// ✅ 推荐：建设性的意见
建议：这里可以使用 computed 来缓存计算结果，提高性能。

疑问：这个逻辑是否需要在组件卸载时清理？

改进：考虑将这个函数提取到 composable 中，以便复用。

// ❌ 避免：模糊或批评性的意见
这里写得不好。
代码有问题。
```

## 持续改进

### 代码重构时机
- 当函数超过 50 行时
- 当组件超过 300 行时
- 当出现重复代码时
- 当命名不再清晰表达意图时
- 当添加新功能变得困难时

### 技术债务管理
- 在代码中标注 TODO 和 FIXME
- 定期清理技术债务
- 优先级：安全 > 性能 > 可维护性 > 美观

---

*此编码标准文档应根据项目演进和团队需求持续更新。使用 `/asdm-context-update` 命令更新此文档。*
