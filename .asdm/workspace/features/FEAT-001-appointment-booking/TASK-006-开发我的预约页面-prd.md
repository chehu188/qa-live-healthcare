# Task PRD: 开发我的预约页面

**Feature ID**: FEAT-001-appointment-booking
**Feature Name**: 预约挂号
**Task ID**: TASK-006
**Created Date**: 2026-04-17
**Status**: TODO
**Language**: zh

## 1. Task Overview

### 1.1 Task Summary
开发"我的预约"页面，患者可查看和管理自己的预约记录。

### 1.2 Task Objectives
- 展示患者所有预约记录
- 支持按状态筛选
- 支持取消预约
- 显示预约详细信息

### 1.3 Related Feature Requirements
- Feature requirement: REQ-P003 我的预约
- Related user story: US-P003

### 1.4 Dependencies
- **Depends on**: TASK-002, TASK-003
- **Blocks**: 无

## 2. Requirements Analysis

### 2.1 Functional Requirements
**页面功能**:
- 展示预约记录列表（按时间倒序）
- 筛选标签：全部 / 待确认 / 已确认 / 已完成 / 已取消
- 显示预约详情（医生、日期、时段、预约号）
- 取消预约按钮（仅 PENDING/CONFIRMED 状态）
- 状态标签颜色区分

### 2.2 Non-Functional Requirements
- **Performance**: 列表加载时间 < 500ms
- **Usability**: 清晰的空状态提示

## 3. Security Requirements

### 3.1 Authentication
- **必须检查**: 患者必须已登录

### 3.2 Authorization
- 仅显示当前患者的预约
- 取消操作验证患者身份

### 3.3 Input Validation
- patientUsername 与 currentPatient 匹配校验

### 3.4 Data Protection
- 敏感信息脱敏显示（姓名、手机号）

## 4. Compliance Requirements

### 4.1 Data Classification
- **Confidential**: 预约记录信息

### 4.2 Regulatory Compliance
- 符合《个人信息保护法》
- 敏感信息脱敏处理

### 4.3 Audit Requirements
- 取消操作记录时间戳

## 5. Implementation Approach

### 5.1 Recommended Methodology
1. 完善占位页面
2. 实现预约列表展示
3. 实现筛选和取消功能

### 5.2 Implementation Steps
1. 修改 `src/views/MyAppointments.vue`
2. 实现患者身份验证
3. 调用 getAppointmentsByPatient 获取预约列表
4. 实现预约卡片/列表展示
5. 实现状态筛选标签
6. 实现取消预约功能
7. 实现取消确认弹窗
8. 验证页面功能: `vue-tsc --noEmit`

### 5.3 Technical Details

**文件路径**: `src/views/MyAppointments.vue`

**脱敏规则**:
- 姓名: 张** / 王*
- 手机号: 138****1234

## 6. Testing Requirements

### 6.1 Unit Testing
- 筛选逻辑测试

### 6.2 Integration Testing
- 预约列表展示测试
- 取消预约功能测试

### 6.3 Test Framework
- 手动功能测试
- 验证命令: `vue-tsc --noEmit`

## 7. Acceptance Criteria

### 7.1 Primary Criteria
- **Criterion 1**: 预约记录按时间倒序显示
  - Validation tool: 手动验证
- **Criterion 2**: 可按状态筛选
  - Validation tool: 手动测试
- **Criterion 3**: 取消预约后号源释放
  - Validation tool: 手动验证

## 8. Estimated Effort

- **Estimated effort**: 1 小时
- **Complexity**: Medium
- **Risk**: Low

## 9. Deliverables
- `src/views/MyAppointments.vue`: 我的预约页面
