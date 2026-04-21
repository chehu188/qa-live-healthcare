# Task PRD: 导航入口集成

**Feature ID**: FEAT-001-appointment-booking
**Feature Name**: 预约挂号
**Task ID**: TASK-009
**Created Date**: 2026-04-17
**Status**: TODO
**Language**: zh

## 1. Task Overview

### 1.1 Task Summary
在应用导航中添加预约功能入口，包括导航栏、医生卡片和首页。

### 1.2 Task Objectives
- 在 AppHeader 导航栏添加"我的预约"入口
- 在医生卡片添加"预约挂号"按钮
- 在首页添加预约引导

### 1.3 Related Feature Requirements
- Feature requirement: REQ-C003 路由导航
- Related user story: US-P001, US-P002

### 1.4 Dependencies
- **Depends on**: TASK-003
- **Blocks**: 无

## 2. Requirements Analysis

### 2.1 Functional Requirements
**导航栏入口**:
- 在 AppHeader 添加"我的预约"链接
- 仅患者登录后显示
- 点击跳转 /my-appointments

**医生卡片入口**:
- 在医生卡片添加"预约挂号"按钮
- 点击跳转 /appointment/:doctorUsername

**首页引导**:
- 在首页添加预约功能引导入口
- 吸引用户使用预约功能

### 2.2 Non-Functional Requirements
- **Usability**: 入口醒目但不干扰
- **Responsiveness**: 移动端适配

## 3. Security Requirements

### 3.1 Authentication
- 入口显示条件：用户已登录

### 3.2 Authorization
- "我的预约"：仅患者可见
- 医生卡片预约按钮：登录患者可见

### 3.3 Input Validation
- 无输入验证需求

## 4. Compliance Requirements

### 4.1 Data Classification
- **Public**: 导航入口信息

### 4.2 Regulatory Compliance
- 无特殊合规要求

### 4.3 Audit Requirements
- 无审计需求

## 5. Implementation Approach

### 5.1 Recommended Methodology
1. 修改导航栏
2. 修改医生卡片
3. 添加首页入口

### 5.2 Implementation Steps
1. 读取 `src/components/AppHeader.vue`
2. 添加"我的预约"导航链接
3. 添加患者角色判断
4. 读取 `src/views/Doctors.vue`
5. 在医生卡片添加预约按钮
6. 读取首页组件
7. 添加预约引导入口
8. 验证功能: `vue-tsc --noEmit`

### 5.3 Technical Details

**文件路径**:
- 导航栏: `src/components/AppHeader.vue`
- 医生列表: `src/views/Doctors.vue`
- 首页: `src/views/Home.vue`

**权限控制**:
```vue
<a-menu-item v-if="currentPatient" key="my-appointments">
  <router-link to="/my-appointments">我的预约</router-link>
</a-menu-item>
```

## 6. Testing Requirements

### 6.1 Unit Testing
- 组件条件渲染测试

### 6.2 Integration Testing
- 不同角色登录测试
- 入口可见性测试

### 6.3 Test Framework
- 手动功能测试
- 验证命令: `vue-tsc --noEmit`

## 7. Acceptance Criteria

### 7.1 Primary Criteria
- **Criterion 1**: 导航栏可见"我的预约"链接
  - Validation tool: 手动测试
- **Criterion 2**: 医生卡片有预约按钮
  - Validation tool: 手动测试
- **Criterion 3**: 首页有预约引导入口
  - Validation tool: 视觉验证

## 8. Estimated Effort

- **Estimated effort**: 0.5 小时
- **Complexity**: Low
- **Risk**: Low

## 9. Deliverables
- 修改 `src/components/AppHeader.vue`: 添加"我的预约"入口
- 修改 `src/views/Doctors.vue`: 添加预约按钮
- 修改 `src/views/Home.vue`: 添加预约引导
