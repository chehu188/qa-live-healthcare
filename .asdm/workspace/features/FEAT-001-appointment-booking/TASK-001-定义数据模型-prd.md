# Task PRD: 定义数据模型

**Feature ID**: FEAT-001-appointment-booking
**Feature Name**: 预约挂号
**Task ID**: TASK-001
**Created Date**: 2026-04-17
**Status**: TODO
**Language**: zh

## 1. Task Overview

### 1.1 Task Summary
定义预约挂号功能的核心数据模型，包括 Schedule（排班）和 Appointment（预约）接口，以及相关的枚举类型。

### 1.2 Task Objectives
- 定义 Schedule 接口，包含医生、日期、时段、号源等信息
- 定义 Appointment 接口，包含患者、医生、排班、状态等信息
- 定义 TimeSlot 和 AppointmentStatus 枚举
- 创建 TypeScript 类型定义
- 创建模拟数据 JSON 文件

### 1.3 Related Feature Requirements
- Feature requirement: REQ-C001 数据模型
- Related user story: US-P001, US-P002, US-D001

### 1.4 Dependencies
- **Depends on**: 无
- **Blocks**: TASK-002, TASK-004, TASK-005, TASK-006, TASK-007, TASK-008

## 2. Requirements Analysis

### 2.1 Functional Requirements
- Schedule 接口需包含：id, doctorUsername, date, timeSlot, totalQuota, bookedCount, createdAt, updatedAt
- Appointment 接口需包含：id, appointmentNo, patientUsername, doctorUsername, scheduleId, status, createdAt, updatedAt
- TimeSlot 枚举：MORNING (上午), AFTERNOON (下午), EVENING (晚间)
- AppointmentStatus 枚举：PENDING (待确认), CONFIRMED (已确认), COMPLETED (已完成), CANCELLED (已取消)

### 2.2 Non-Functional Requirements
- **Performance**: 接口定义应简洁，避免不必要的嵌套
- **Scalability**: 数据模型预留扩展字段
- **Maintainability**: 与现有接口风格保持一致

## 3. Security Requirements

### 3.1 Authentication
- 无需用户认证（数据模型定义阶段）

### 3.2 Authorization
- 无权限控制需求（数据模型定义阶段）

### 3.3 Input Validation
- id: 非空字符串
- date: YYYY-MM-DD 格式
- totalQuota: 正整数
- status: 枚举值之一

### 3.4 Data Protection
- 数据模型不存储敏感信息（患者真实数据）
- 预留知情同意标记字段（consentFlag）

## 4. Compliance Requirements

### 4.1 Data Classification
- **Public**: 无
- **Internal**: Schedule 基本信息
- **Confidential**: Appointment 关联信息
- **PHI**: 暂不涉及真实患者数据

### 4.2 Regulatory Compliance
- 预留合规字段：为后续对接医疗系统做准备
- 符合《个人信息保护法》最小必要原则
- 数据模型不包含真实患者敏感信息

### 4.3 Audit Requirements
- 数据模型包含 createdAt 和 updatedAt 字段
- 支持操作时间戳记录

## 5. Implementation Approach

### 5.1 Recommended Methodology
1. 参考现有数据模型设计风格
2. 定义 TypeScript 接口和枚举
3. 创建 JSON 模拟数据文件

### 5.2 Implementation Steps
1. 读取 `src/store/index.ts` 了解现有接口风格
2. 在 `src/store/index.ts` 末尾添加 Schedule 和 Appointment 接口
3. 添加 TimeSlot 和 AppointmentStatus 枚举
4. 创建 `src/data/schedule-list.json` 模拟数据
5. 创建 `src/data/appointment-list.json` 模拟数据
6. 运行 `vue-tsc --noEmit` 验证类型

### 5.3 Technical Details

**文件路径**:
- 接口定义: `src/store/index.ts`
- 排班数据: `src/data/schedule-list.json`
- 预约数据: `src/data/appointment-list.json`

**接口设计**:
```typescript
// Schedule 排班接口
interface Schedule {
  id: string;
  doctorUsername: string;
  date: string;           // YYYY-MM-DD
  timeSlot: TimeSlot;     // MORNING | AFTERNOON | EVENING
  totalQuota: number;     // 总号源
  bookedCount: number;    // 已预约数
  createdAt: string;
  updatedAt: string;
}

// Appointment 预约接口
interface Appointment {
  id: string;
  appointmentNo: string;   // 预约号
  patientUsername: string;
  doctorUsername: string;
  scheduleId: string;
  status: AppointmentStatus; // PENDING | CONFIRMED | COMPLETED | CANCELLED
  createdAt: string;
  updatedAt: string;
}

// 枚举定义
enum TimeSlot {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening'
}

enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}
```

### 5.4 Reference to Project Context
- `.asdm/contexts/data-models.md`: 数据模型参考
- `.asdm/contexts/standard-coding-style.md`: 代码风格规范

## 6. Testing Requirements

### 6.1 Unit Testing
- 类型定义验证测试
- 枚举值正确性测试

### 6.2 Integration Testing
- JSON 文件导入测试

### 6.3 Test Framework
- TypeScript 编译器作为类型验证工具
- 验证命令: `vue-tsc --noEmit`

## 7. Acceptance Criteria

### 7.1 Primary Criteria
- **Criterion 1**: TypeScript 编译无错误
  - Validation tool: `vue-tsc --noEmit`
- **Criterion 2**: 接口字段完整，符合设计要求
  - Validation tool: 代码审查
- **Criterion 3**: JSON 数据文件可正常导入
  - Validation tool: TypeScript 编译验证

### 7.2 Edge Cases
- 空号源排班（bookedCount = totalQuota）的边界情况
- 预约号唯一性保证

### 7.3 Negative Tests
- 缺少必填字段时应报错
- 类型不匹配时应报错

## 8. Estimated Effort

- **Estimated effort**: 0.5 小时
- **Complexity**: Low
- **Risk**: Low

## 9. Deliverables
- `src/store/index.ts`: 新增 Schedule、Appointment 接口和枚举定义
- `src/data/schedule-list.json`: 排班模拟数据
- `src/data/appointment-list.json`: 预约模拟数据
