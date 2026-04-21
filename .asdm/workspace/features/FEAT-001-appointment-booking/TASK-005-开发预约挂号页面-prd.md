# Task PRD: 开发预约挂号页面

**Feature ID**: FEAT-001-appointment-booking
**Feature Name**: 预约挂号
**Task ID**: TASK-005
**Created Date**: 2026-04-17
**Status**: TODO
**Language**: zh

## 1. Task Overview

### 1.1 Task Summary
开发预约挂号页面，患者可选择医生的排班时段并完成预约。

### 1.2 Task Objectives
- 实现患者身份验证流程
- 展示医生排班日历
- 实现时段选择
- 实现预约确认和提交
- 显示预约成功信息

### 1.3 Related Feature Requirements
- Feature requirement: REQ-P002 预约挂号, REQ-P004 预约状态流转
- Related user story: US-P002

### 1.4 Dependencies
- **Depends on**: TASK-002, TASK-003
- **Blocks**: 无

## 2. Requirements Analysis

### 2.1 Functional Requirements
**页面流程**:
1. 患者验证（检查是否已登录患者账号）
2. 选择排班时段
3. 确认预约信息（医生、日期、时段）
4. 提交预约
5. 显示预约结果（预约号等）

**交互要求**:
- 已约满时段不可选
- 同一患者同一时段不可重复预约
- 预约成功后自动跳转或显示成功弹窗

### 2.2 Non-Functional Requirements
- **Performance**: 页面加载时间 < 500ms
- **Usability**: 简洁直观的用户流程

## 3. Security Requirements

### 3.1 Authentication
- **必须检查**: 患者必须已登录
- **未登录处理**: 跳转到登录页

### 3.2 Authorization
- 仅已验证身份的患者可预约
- 验证 currentPatient 与操作匹配

### 3.3 Input Validation
- doctorUsername 格式校验
- 排班时段有效性校验
- 防止重复提交（防抖处理）

## 4. Compliance Requirements

### 4.1 Data Classification
- **Confidential**: 患者个人信息

### 4.2 Regulatory Compliance
- 符合《个人信息保护法》最小必要原则
- 仅显示就诊所需信息

### 4.3 Audit Requirements
- 预约操作记录时间戳
- 保留预约号供查询

## 5. Implementation Approach

### 5.1 Recommended Methodology
1. 完善占位页面
2. 实现页面布局
3. 实现预约流程

### 5.2 Implementation Steps
1. 修改 `src/views/AppointmentBooking.vue`
2. 实现患者身份验证
3. 获取并展示医生排班
4. 实现排班日历/列表展示
5. 实现时段选择交互
6. 实现预约确认弹窗
7. 调用 addAppointment 创建预约
8. 实现预约成功反馈
9. 验证页面功能: `vue-tsc --noEmit`

### 5.3 Technical Details

**文件路径**: `src/views/AppointmentBooking.vue`

**流程设计**:
```
患者验证 → 获取排班 → 选择时段 → 确认信息 → 提交预约 → 显示结果
```

## 6. Testing Requirements

### 6.1 Unit Testing
- 组件逻辑测试

### 6.2 Integration Testing
- 完整预约流程测试
- 号源扣减验证

### 6.3 Test Framework
- 手动功能测试
- 验证命令: `vue-tsc --noEmit`

## 7. Acceptance Criteria

### 7.1 Primary Criteria
- **Criterion 1**: 患者验证后可进入预约流程
  - Validation tool: 手动测试
- **Criterion 2**: 选择时段后显示确认弹窗
  - Validation tool: 手动测试
- **Criterion 3**: 提交后生成预约记录
  - Validation tool: 手动验证
- **Criterion 4**: 号源正确扣减
  - Validation tool: 手动验证

## 8. Estimated Effort

- **Estimated effort**: 1.5 小时
- **Complexity**: High
- **Risk**: Medium

## 9. Deliverables
- `src/views/AppointmentBooking.vue`: 预约挂号页面
