# Task PRD: 开发医生预约列表

**Feature ID**: FEAT-001-appointment-booking
**Feature Name**: 预约挂号
**Task ID**: TASK-008
**Created Date**: 2026-04-17
**Status**: TODO
**Language**: zh

## 1. Task Overview

### 1.1 Task Summary
在医生诊室页面添加预约列表功能，医生可查看预约患者并标记完成。

### 1.2 Task Objectives
- 展示排班的预约患者列表
- 显示患者信息（脱敏）
- 支持将预约标记为已完成
- 支持将预约确认为已确认

### 1.3 Related Feature Requirements
- Feature requirement: REQ-D002 预约列表
- Related user story: US-D002

### 1.4 Dependencies
- **Depends on**: TASK-002
- **Blocks**: 无

## 2. Requirements Analysis

### 2.1 Functional Requirements
**预约列表功能**:
- 点击排班查看预约患者列表
- 显示患者姓名（脱敏）、预约号、预约时段、状态
- 将预约标记为已确认
- 将预约标记为已完成
- 仅医生本人可操作

### 2.2 Non-Functional Requirements
- **Performance**: 列表加载时间 < 300ms
- **Usability**: 清晰的状态标签

## 3. Security Requirements

### 3.1 Authentication
- **必须检查**: 医生必须已登录

### 3.2 Authorization
- 仅显示当前医生的预约
- 操作验证医生身份

### 3.3 Input Validation
- scheduleId 有效性校验
- 状态流转规则校验

### 3.4 Data Protection
- 患者信息脱敏显示
- 符合最小必要原则

## 4. Compliance Requirements

### 4.1 Data Classification
- **Confidential**: 预约患者信息

### 4.2 Regulatory Compliance
- 符合《个人信息保护法》
- 患者信息脱敏处理

### 4.3 Audit Requirements
- 状态变更记录 updatedAt

## 5. Implementation Approach

### 5.1 Recommended Methodology
1. 在 DoctorRoom.vue 排班管理中添加预约详情
2. 实现预约列表展示
3. 实现状态更新功能

### 5.2 Implementation Steps
1. 修改 `src/views/DoctorRoom.vue`
2. 添加点击排班查看预约的事件
3. 调用 getAppointmentsBySchedule 获取预约列表
4. 实现预约患者列表展示（脱敏）
5. 实现确认预约功能
6. 实现完成预约功能
7. 验证功能: `vue-tsc --noEmit`

### 5.3 Technical Details

**文件路径**: `src/views/DoctorRoom.vue`

**状态流转规则**:
```
PENDING → CONFIRMED → COMPLETED
            ↓
        CANCELLED
```

## 6. Testing Requirements

### 6.1 Unit Testing
- 状态流转逻辑测试

### 6.2 Integration Testing
- 预约列表展示测试
- 状态更新功能测试

### 6.3 Test Framework
- 手动功能测试
- 验证命令: `vue-tsc --noEmit`

## 7. Acceptance Criteria

### 7.1 Primary Criteria
- **Criterion 1**: 可查看排班下的预约患者
  - Validation tool: 手动测试
- **Criterion 2**: 患者信息脱敏显示
  - Validation tool: 视觉验证
- **Criterion 3**: 标记完成后状态正确更新
  - Validation tool: 手动测试

## 8. Estimated Effort

- **Estimated effort**: 1 小时
- **Complexity**: Medium
- **Risk**: Low

## 9. Deliverables
- 修改 `src/views/DoctorRoom.vue`: 添加预约列表功能
