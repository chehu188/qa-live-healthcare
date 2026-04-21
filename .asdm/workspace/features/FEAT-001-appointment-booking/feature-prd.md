# Feature PRD: 预约挂号功能

**Feature ID**: FEAT-001-appointment-booking
**Feature Name**: 预约挂号
**Created Date**: 2026-04-17
**Status**: PLANNED
**Language**: zh

---

## 1. Feature概述

### 1.1 Feature名称和ID
- **Feature ID**: FEAT-001-appointment-booking
- **Feature Name**: 预约挂号

### 1.2 Feature描述
在医疗问诊平台中添加「预约挂号」功能，让患者可以预约医生的线下门诊。当前平台仅支持在线问诊，患者无法预约医生的线下门诊号源。本功能将补齐线下就诊能力，形成「在线问诊 → 预约挂号 → 线下就诊」的完整服务闭环。

### 1.3 业务背景和目标
- **业务背景**: 当前平台仅支持在线问诊，无法满足需要线下就诊的患者需求
- **业务目标**:
  - 提升平台服务完整性
  - 增加医生门诊利用率
  - 改善患者就医体验
- **受益角色**:
  - 患者（便捷预约）
  - 医生（门诊管理）
  - 平台运营（数据统计）

---

## 2. 用户故事

### 2.1 Patient角色

| ID | 用户故事 | 验收标准 |
|----|---------|---------|
| US-P001 | 作为患者，我可以在医生详情页查看其门诊排班信息，以便了解医生的出诊时间并选择合适的时段就诊 | - 在医生列表和医生详情页可查看排班信息<br>- 排班按日期和时段展示（上午/下午/晚间）<br>- 已约满的时段显示为不可选状态<br>- 每个时段显示剩余号源数量 |
| US-P002 | 作为已验证身份的患者，我可以选择医生的某个排班时段进行预约挂号，以便确认线下就诊的时间和医生 | - 患者需先通过身份验证才能预约<br>- 选择时段后需确认预约信息（医生、日期、时段）<br>- 预约成功后生成预约记录，含唯一预约号<br>- 同一患者同一时段不可重复预约同一医生<br>- 每个时段号源用完后不可再预约 |
| US-P003 | 作为患者，我可以查看我的预约记录并取消预约，以便管理自己的就诊安排 | - 患者可在「我的预约」页面查看所有预约记录<br>- 预约记录按时间倒序排列<br>- 可取消状态为「待确认」或「已确认」的记录<br>- 取消预约后号源释放回排班池<br>- 已完成/已取消的预约不可再次操作 |

### 2.2 Doctor角色

| ID | 用户故事 | 验收标准 |
|----|---------|---------|
| US-D001 | 作为已登录的医生，我可以设置和管理我的门诊排班，以便患者可以按照我的出诊时间进行预约 | - 医生在诊室页面可添加排班（日期、时段、号源数量）<br>- 可修改和删除未预约的排班<br>- 已有预约的排班不可删除，仅可减少号源至已预约数<br>- 排班时间不可重叠 |
| US-D002 | 作为已登录的医生，我可以查看某日排班的患者预约列表，以便提前了解就诊患者情况 | - 在诊室页面按日期查看预约患者列表<br>- 显示患者姓名、预约时段、预约号等信息<br>- 可将预约状态更新为「已完成」 |

---

## 3. 功能需求

### 3.1 患者端功能列表

| ID | 功能名称 | 优先级 | 描述 |
|----|---------|--------|------|
| REQ-P001 | 排班展示 | High | 在医生详情页面添加排班展示区域，以日历或列表形式展示医生的门诊排班，支持按周查看 |
| REQ-P002 | 预约挂号 | High | 新增预约挂号页面，患者在验证身份后可选择排班时段、确认预约信息并提交 |
| REQ-P003 | 我的预约 | Medium | 新增患者预约管理页面，展示患者所有预约记录，支持按状态筛选和取消预约操作 |
| REQ-P004 | 预约状态流转 | High | 支持预约状态流转：待确认 → 已确认 → 已完成 / 已取消 |

### 3.2 医生端功能列表

| ID | 功能名称 | 优先级 | 描述 |
|----|---------|--------|------|
| REQ-D001 | 排班管理 | High | 在医生诊室页面添加排班管理功能，支持添加、编辑、删除排班 |
| REQ-D002 | 预约列表 | High | 医生可查看排班的预约患者列表，支持将预约标记为已完成 |

### 3.3 通用功能

| ID | 功能名称 | 优先级 | 描述 |
|----|---------|--------|------|
| REQ-C001 | 数据模型 | High | 定义 Schedule 和 Appointment 数据模型，与现有 Patient/Doctor 接口并列 |
| REQ-C002 | Store扩展 | High | 扩展现有 Store，添加排班和预约的状态管理、CRUD 方法 |
| REQ-C003 | 路由导航 | Medium | 添加预约相关路由，在导航栏和医生卡片中添加预约入口 |

---

## 4. 非功能性需求

### 4.1 性能要求
- 排班列表加载时间 < 500ms
- 预约提交响应时间 < 300ms
- 并发预约时需保证号源不超发

### 4.2 安全要求
- 仅已验证身份的患者可创建预约
- 仅医生本人可管理自己的排班
- 预约取消需验证患者身份
- 患者姓名、手机号等敏感信息在预约列表中做脱敏处理（如：张\*\*、138\*\*\*\*1234）

### 4.3 合规性要求
- 患者个人健康信息（PHI）展示遵循最小必要原则，仅显示就诊所需信息
- 预约记录需保留操作时间戳，支持审计追溯
- 数据模型设计预留合规字段（如：知情同意标记、数据来源标识）
- 当前为前端演示模式，不涉及真实患者数据存储；生产环境需满足《个人信息保护法》和《健康医疗大数据管理办法》相关要求

---

## 5. 技术考虑

### 5.1 架构影响
- 遵循现有三层架构（展示层、应用层、数据层）
- 新增数据模型放入 `src/store/index.ts`，与现有 Doctor/Patient/Question 接口并列
- 预约相关页面放入 `src/views/`，复用现有布局和导航组件
- 数据存储使用 JSON 文件模拟，与现有模式一致

### 5.2 数据模型设计

#### 复用现有模型
- **Patient**: 复用现有 Patient 接口
- **Doctor**: 复用现有 Doctor 接口

#### 新增数据结构

**Schedule（排班）**
```typescript
interface Schedule {
  id: string;
  doctorUsername: string;
  date: string;           // YYYY-MM-DD
  timeSlot: TimeSlot;     // 时段枚举
  totalQuota: number;     // 总号源
  bookedCount: number;    // 已预约数
  createdAt: string;
  updatedAt: string;
}

enum TimeSlot {
  MORNING = 'morning',    // 上午 08:00-12:00
  AFTERNOON = 'afternoon', // 下午 14:00-17:00
  EVENING = 'evening'     // 晚间 18:00-20:00
}
```

**Appointment（预约）**
```typescript
interface Appointment {
  id: string;
  appointmentNo: string;   // 预约号
  patientUsername: string;
  doctorUsername: string;
  scheduleId: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

enum AppointmentStatus {
  PENDING = 'pending',    // 待确认
  CONFIRMED = 'confirmed', // 已确认
  COMPLETED = 'completed', // 已完成
  CANCELLED = 'cancelled'  // 已取消
}
```

### 5.3 API设计（预留后端集成）

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/schedules` | GET | 获取排班列表 |
| `/api/schedules` | POST | 创建排班 |
| `/api/schedules/:id` | PUT | 更新排班 |
| `/api/schedules/:id` | DELETE | 删除排班 |
| `/api/appointments` | GET | 获取预约列表 |
| `/api/appointments` | POST | 创建预约 |
| `/api/appointments/:id` | PUT | 更新预约状态 |
| `/api/appointments/:id` | DELETE | 取消预约 |

### 5.4 前端组件设计

| 组件 | 位置 | 描述 |
|------|------|------|
| AppointmentBooking.vue | src/views/ | 预约挂号页面 |
| MyAppointments.vue | src/views/ | 我的预约页面 |
| ScheduleCard.vue | src/components/ | 排班卡片组件 |
| DoctorSchedule.vue | src/views/ | 医生排班管理（扩展 DoctorRoom.vue） |

### 5.5 依赖关系
- Vue 3 Composition API（内部）
- Vue Router（内部）
- Ant Design Vue 日历/日期组件（内部）
- dayjs 日期处理库（内部，已安装）
- 现有 Store 状态管理（内部）

---

## 6. 任务分解

### 6.1 Task列表

| Task ID | Task Name | Status | Priority | Depends On | Description |
|---------|-----------|--------|----------|------------|-------------|
| TASK-001 | 定义数据模型 | TODO | High | - | 定义 Schedule、Appointment 接口和 TimeSlot/AppointmentStatus 枚举；创建模拟数据 JSON 文件 |
| TASK-002 | 扩展 Store | TODO | High | TASK-001 | 添加排班和预约的 State 及 CRUD 方法 |
| TASK-003 | 添加路由配置 | TODO | High | - | 添加预约相关路由 |
| TASK-004 | 开发排班展示组件 | TODO | High | TASK-002 | 医生卡片排班摘要、ScheduleCard 组件 |
| TASK-005 | 开发预约挂号页面 | TODO | High | TASK-002, TASK-003 | AppointmentBooking.vue |
| TASK-006 | 开发我的预约页面 | TODO | Medium | TASK-002, TASK-003 | MyAppointments.vue |
| TASK-007 | 开发医生排班管理 | TODO | Medium | TASK-002 | DoctorRoom.vue 排班管理 Tab |
| TASK-008 | 开发医生预约列表 | TODO | Medium | TASK-002 | DoctorRoom.vue 预约列表功能 |
| TASK-009 | 导航入口集成 | TODO | Medium | TASK-003 | 导航栏、医生卡片预约按钮 |
| TASK-010 | 功能验证 | TODO | Medium | TASK-001~009 | 端到端测试、TypeScript 编译检查 |

### 6.2 任务依赖关系

```
TASK-001 ──┬── TASK-002 ──┬── TASK-004
           │              ├── TASK-005
           │              ├── TASK-006
           │              ├── TASK-007
           │              └── TASK-008
           │
TASK-003 ──┴── TASK-005
                TASK-006
                TASK-009

TASK-004 ~ TASK-009 ─── TASK-010
```

---

## 7. 成功指标和验收标准

### 7.1 成功指标
- 患者可成功查看医生排班并完成预约挂号
- 医生可创建排班并查看预约列表
- 预约状态正确流转（待确认 → 已确认 → 已完成 / 已取消）
- 号源数量正确扣减和释放
- 新增页面和功能与现有 UI 风格一致

### 7.2 验收标准
- TypeScript 类型定义完整，`vue-tsc` 编译无错误
- 所有用户故事的验收标准通过
- 无控制台报错
- 数据操作一致性（号源不超发、不欠发）

### 7.3 成功标准清单

| 验收项 | 标准 | 测试方法 |
|--------|------|---------|
| 排班展示 | 医生卡片显示排班信息，剩余号源正确 | 页面操作验证 |
| 预约创建 | 患者验证后可预约，生成唯一预约号 | 功能测试 |
| 号源扣减 | 预约后剩余号源正确减少 | 数据校验 |
| 预约取消 | 取消后号源正确释放 | 功能测试 |
| 状态流转 | 待确认→已确认→已完成/已取消 | 流程测试 |
| 排班管理 | 医生可添加/编辑/删除排班 | 功能测试 |
| 类型安全 | TypeScript 编译无错误 | `vue-tsc` |

---

## 8. 风险与应对

| 风险 | 影响 | 应对措施 |
|------|------|---------|
| 号源超发 | High | 前端实时校验；后端加锁（后续） |
| 与问诊流程冲突 | Medium | 预约和问诊作为独立入口，互不干扰 |
| 排班管理复杂度 | Medium | MVP 仅支持逐条添加，不做周期性排班 |
| 数据持久化 | Low | 提示演示模式；预留后端 API |

---

## 9. 范围定义

### 9.1 In Scope（本期实现）
- 排班数据模型与 CRUD
- 预约数据模型与 CRUD
- 患者端：查看排班、预约挂号、我的预约
- 医生端：排班管理、预约列表
- 预约状态流转
- JSON 模拟数据

### 9.2 Out of Scope（后续迭代）
- 在线支付和费用管理
- 周期性排班模板
- 短信/消息通知
- 预约排队和候补
- 门诊叫号系统对接
- 医保对接
- 后端 API 真实集成
- 管理员后台排班审核
