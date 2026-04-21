# Task PRD: 扩展 Store 状态和方法

**Feature ID**: FEAT-001-appointment-booking
**Feature Name**: 预约挂号
**Task ID**: TASK-002
**Created Date**: 2026-04-17
**Status**: TODO
**Language**: zh

## 1. Task Overview

### 1.1 Task Summary
在现有 Store 中添加排班和预约的状态管理，扩展 State 类型并实现 CRUD 方法。

### 1.2 Task Objectives
- 在 Store 的 State 中添加 schedules 和 appointments 数组
- 实现排班 CRUD 方法
- 实现预约 CRUD 方法
- 实现号源扣减和释放逻辑

### 1.3 Related Feature Requirements
- Feature requirement: REQ-C002 Store扩展
- Related user story: US-P001, US-P002, US-P003, US-D001, US-D002

### 1.4 Dependencies
- **Depends on**: TASK-001 定义数据模型
- **Blocks**: TASK-004, TASK-005, TASK-006, TASK-007, TASK-008

## 2. Requirements Analysis

### 2.1 Functional Requirements
**排班方法**:
- addSchedule(schedule): 添加排班
- updateSchedule(id, updates): 更新排班
- deleteSchedule(id): 删除排班（需检查无已确认预约）
- getSchedulesByDoctor(doctorUsername): 获取医生的排班列表

**预约方法**:
- addAppointment(appointment): 创建预约（自动扣减号源）
- cancelAppointment(id): 取消预约（自动释放号源）
- getAppointmentsByPatient(patientUsername): 获取患者的预约列表
- getAppointmentsBySchedule(scheduleId): 获取排班的预约列表
- confirmAppointment(id): 确认预约
- completeAppointment(id): 完成预约

### 2.2 Non-Functional Requirements
- **Performance**: 方法响应时间 < 100ms
- **Scalability**: 数据结构支持未来后端集成
- **Reliability**: 号源操作保证一致性

## 3. Security Requirements

### 3.1 Authentication
- 方法调用需检查用户登录状态

### 3.2 Authorization
- 排班管理仅医生本人可操作
- 预约操作仅患者本人可执行
- 通过 currentUser 检查用户身份

### 3.3 Input Validation
- 所有输入参数进行类型校验
- scheduleId 必须存在
- patientUsername 必须与当前用户匹配
- doctorUsername 必须与当前用户匹配（医生端操作）

### 3.4 Data Protection
- 号源数据一致性保护
- 防止并发预约超发

## 4. Compliance Requirements

### 4.1 Data Classification
- **Internal**: schedules 和 appointments 数组
- **Confidential**: 预约关联的患者信息

### 4.2 Regulatory Compliance
- 操作记录保留时间戳
- 符合《个人信息保护法》最小必要原则

### 4.3 Audit Requirements
- 所有状态变更记录 updatedAt
- 保留 createdAt 创建时间
- 预留操作日志扩展点

## 5. Implementation Approach

### 5.1 Recommended Methodology
1. 扩展 State 类型
2. 添加响应式数据
3. 实现 CRUD 方法
4. 实现号源管理逻辑

### 5.2 Implementation Steps
1. 读取 `src/store/index.ts` 了解现有结构
2. 在 State 接口中添加 schedules 和 appointments
3. 使用 ref/reactive 添加响应式数据
4. 实现 addSchedule/updateSchedule/deleteSchedule/getSchedulesByDoctor 方法
5. 实现 addAppointment/cancelAppointment/getAppointmentsByPatient/getAppointmentsBySchedule 方法
6. 实现 confirmAppointment 和 completeAppointment 方法
7. 实现号源扣减逻辑（在 addAppointment 中）
8. 实现号源释放逻辑（在 cancelAppointment 中）
9. 添加权限校验逻辑
10. 验证 TypeScript 编译: `vue-tsc --noEmit`

### 5.3 Technical Details

**文件路径**: `src/store/index.ts`

**核心逻辑**:
```typescript
// 号源扣减 - addAppointment
if (schedule.bookedCount >= schedule.totalQuota) {
  throw new Error('号源已满')
}

// 号源释放 - cancelAppointment
schedule.bookedCount -= 1

// 状态校验
// cancelAppointment: 仅 PENDING/CONFIRMED
// completeAppointment: 仅 CONFIRMED
```

### 5.4 Reference to Project Context
- `.asdm/contexts/architecture.md`: Store 设计模式
- `.asdm/contexts/data-models.md`: 数据模型参考

## 6. Testing Requirements

### 6.1 Unit Testing
- CRUD 方法单元测试
- 号源扣减/释放逻辑测试
- 状态流转校验测试

### 6.2 Integration Testing
- Store 方法联动测试
- 号源一致性测试

### 6.3 Test Framework
- 手动功能测试
- 验证命令: `vue-tsc --noEmit`

## 7. Acceptance Criteria

### 7.1 Primary Criteria
- **Criterion 1**: Store 方法可正常调用，TypeScript 编译无错误
  - Validation tool: `vue-tsc --noEmit`
- **Criterion 2**: 排班号源扣减逻辑正确
  - Validation tool: 手动验证数据变化
- **Criterion 3**: 预约取消后号源正确释放
  - Validation tool: 手动验证数据变化

### 7.2 Edge Cases
- 号源不足时 addAppointment 应返回错误
- 已取消/已完成的预约不可再次取消
- 同一患者同一排班重复预约应被拒绝

### 7.3 Negative Tests
- 删除有预约的排班应报错
- 取消不存在的预约应报错
- 超额预约应被拒绝

## 8. Estimated Effort

- **Estimated effort**: 1.5 小时
- **Complexity**: Medium
- **Risk**: Medium

## 9. Deliverables
- `src/store/index.ts`: 新增排班和预约的状态管理及 CRUD 方法
