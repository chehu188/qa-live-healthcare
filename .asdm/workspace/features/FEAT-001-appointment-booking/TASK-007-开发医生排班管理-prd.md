# Task PRD: 开发医生排班管理

**Feature ID**: FEAT-001-appointment-booking
**Feature Name**: 预约挂号
**Task ID**: TASK-007
**Created Date**: 2026-04-17
**Status**: TODO
**Language**: zh

## 1. Task Overview

### 1.1 Task Summary
在医生诊室页面添加排班管理功能，医生可添加、编辑、删除自己的门诊排班。

### 1.2 Task Objectives
- 在 DoctorRoom.vue 添加排班管理 Tab
- 实现添加排班表单
- 实现编辑排班功能
- 实现删除排班功能
- 检查排班时间重叠

### 1.3 Related Feature Requirements
- Feature requirement: REQ-D001 排班管理
- Related user story: US-D001

### 1.4 Dependencies
- **Depends on**: TASK-002
- **Blocks**: 无

## 2. Requirements Analysis

### 2.1 Functional Requirements
**排班管理功能**:
- 排班列表展示（日期、时段、号源）
- 添加排班表单（日期选择、时段选择、号源数量）
- 编辑未预约排班
- 删除无预约排班
- 已有预约的排班不可删除
- 排班时间不可重叠

### 2.2 Non-Functional Requirements
- **Performance**: 表单提交响应时间 < 300ms
- **Usability**: 清晰的表单验证提示

## 3. Security Requirements

### 3.1 Authentication
- **必须检查**: 医生必须已登录

### 3.2 Authorization
- 仅医生本人可管理自己的排班
- doctorUsername 与 currentDoctor 匹配校验

### 3.3 Input Validation
- 日期: YYYY-MM-DD 格式，不能是过去日期
- 时段: 有效枚举值
- 号源: 正整数，范围 1-100

### 3.4 Data Protection
- 防止误删有预约的排班

## 4. Compliance Requirements

### 4.1 Data Classification
- **Internal**: 医生排班信息

### 4.2 Regulatory Compliance
- 无特殊合规要求

### 4.3 Audit Requirements
- 排班变更记录 updatedAt

## 5. Implementation Approach

### 5.1 Recommended Methodology
1. 读取 DoctorRoom.vue 了解现有结构
2. 添加排班管理 Tab
3. 实现排班 CRUD 功能

### 5.2 Implementation Steps
1. 读取 `src/views/DoctorRoom.vue`
2. 添加排班管理 Tab 切换
3. 实现排班列表展示
4. 实现添加排班表单
5. 实现时段选择器
6. 实现排班重叠检查
7. 实现编辑/删除功能
8. 调用 Store 方法
9. 验证功能: `vue-tsc --noEmit`

### 5.3 Technical Details

**文件路径**: `src/views/DoctorRoom.vue`

**重叠检查逻辑**:
```typescript
const isOverlapping = schedules.some(s => 
  s.date === newSchedule.date && s.timeSlot === newSchedule.timeSlot
);
if (isOverlapping) throw new Error('该时段已有排班');
```

## 6. Testing Requirements

### 6.1 Unit Testing
- 表单验证测试
- 重叠检查测试

### 6.2 Integration Testing
- 排班 CRUD 功能测试

### 6.3 Test Framework
- 手动功能测试
- 验证命令: `vue-tsc --noEmit`

## 7. Acceptance Criteria

### 7.1 Primary Criteria
- **Criterion 1**: 医生可添加排班
  - Validation tool: 手动测试
- **Criterion 2**: 可编辑未预约的排班
  - Validation tool: 手动测试
- **Criterion 3**: 可删除无预约的排班
  - Validation tool: 手动测试
- **Criterion 4**: 排班时间不可重叠
  - Validation tool: 手动测试

## 8. Estimated Effort

- **Estimated effort**: 1.5 小时
- **Complexity**: Medium
- **Risk**: Medium

## 9. Deliverables
- 修改 `src/views/DoctorRoom.vue`: 添加排班管理功能
