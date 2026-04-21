# Task PRD: 开发排班展示组件

**Feature ID**: FEAT-001-appointment-booking
**Feature Name**: 预约挂号
**Task ID**: TASK-004
**Created Date**: 2026-04-17
**Status**: TODO
**Language**: zh

## 1. Task Overview

### 1.1 Task Summary
开发排班展示组件，在医生列表页和医生详情区域展示医生的门诊排班信息。

### 1.2 Task Objectives
- 创建 ScheduleCard 组件
- 在医生列表页添加排班摘要
- 显示剩余号源数量
- 标记已约满时段

### 1.3 Related Feature Requirements
- Feature requirement: REQ-P001 排班展示
- Related user story: US-P001

### 1.4 Dependencies
- **Depends on**: TASK-002 扩展 Store
- **Blocks**: 无

## 2. Requirements Analysis

### 2.1 Functional Requirements
**ScheduleCard 组件**:
- 显示排班日期（格式化）
- 显示时段（上午/下午/晚间）
- 显示剩余号源数量
- 已约满时显示不可选状态

**医生列表页集成**:
- 在医生卡片中显示近期排班摘要（最多显示3个）
- 点击"查看更多排班"展开完整列表

### 2.2 Non-Functional Requirements
- **Performance**: 列表渲染性能优化
- **Responsiveness**: 响应式布局支持
- **Reusability**: 组件可复用

## 3. Security Requirements

### 3.1 Authentication
- 无需用户认证（展示组件）

### 3.2 Authorization
- 无权限控制需求

### 3.3 Input Validation
- 数据过滤：仅显示有效排班
- 日期校验：过滤过期排班

## 4. Compliance Requirements

### 4.1 Data Classification
- **Public**: 排班基本信息

### 4.2 Regulatory Compliance
- 无特殊合规要求

### 4.3 Audit Requirements
- 无审计需求

## 5. Implementation Approach

### 5.1 Recommended Methodology
1. 创建 ScheduleCard 组件
2. 读取医生列表页代码
3. 集成排班展示

### 5.2 Implementation Steps
1. 创建 `src/components/ScheduleCard.vue` 组件
2. 实现日期和时段格式化显示
3. 实现剩余号源计算和显示
4. 实现约满状态样式
5. 修改 `Doctors.vue` 医生卡片，添加排班摘要
6. 实现"查看更多"展开功能
7. 验证: `vue-tsc --noEmit`

### 5.3 Technical Details

**文件路径**:
- 组件: `src/components/ScheduleCard.vue`
- 修改: `src/views/Doctors.vue`

**组件设计**:
```vue
<template>
  <div class="schedule-card">
    <span class="date">{{ formatDate(schedule.date) }}</span>
    <span class="time-slot">{{ getTimeSlotLabel(schedule.timeSlot) }}</span>
    <span class="quota">
      剩余 {{ schedule.totalQuota - schedule.bookedCount }} 个号源
    </span>
  </div>
</template>
```

## 6. Testing Requirements

### 6.1 Unit Testing
- 组件渲染测试

### 6.2 Integration Testing
- 医生卡片集成测试

### 6.3 Test Framework
- 手动功能测试
- 验证命令: `vue-tsc --noEmit`

## 7. Acceptance Criteria

### 7.1 Primary Criteria
- **Criterion 1**: 医生卡片中可见排班信息
  - Validation tool: 手动验证
- **Criterion 2**: 已约满时段显示为不可选
  - Validation tool: 视觉验证
- **Criterion 3**: TypeScript 编译无错误
  - Validation tool: `vue-tsc`

## 8. Estimated Effort

- **Estimated effort**: 1 小时
- **Complexity**: Medium
- **Risk**: Low

## 9. Deliverables
- `src/components/ScheduleCard.vue`: 排班卡片组件
- 修改 `src/views/Doctors.vue`: 集成排班展示
