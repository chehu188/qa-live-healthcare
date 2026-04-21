<template>
  <div class="schedule-card" :class="{ 'full': isFull }">
    <div class="schedule-date">
      <CalendarOutlined />
      <span>{{ formatDate(schedule.date) }}</span>
    </div>
    <div class="schedule-time">
      <ClockCircleOutlined />
      <span>{{ getTimeSlotLabel(schedule.timeSlot) }}</span>
    </div>
    <div class="schedule-quota" :class="{ 'full': isFull }">
      <span v-if="!isFull">剩余 {{ availableQuota }} 个号源</span>
      <span v-else>已约满</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons-vue';
import type { Schedule, TimeSlot } from '../store';

const props = defineProps<{
  schedule: Schedule;
}>();

const timeSlotLabels: Record<TimeSlot, string> = {
  morning: '上午',
  afternoon: '下午',
  evening: '晚间',
};

const availableQuota = computed(() => {
  return props.schedule.totalQuota - props.schedule.bookedCount;
});

const isFull = computed(() => {
  return availableQuota.value <= 0;
});

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
};

const getTimeSlotLabel = (timeSlot: TimeSlot): string => {
  return timeSlotLabels[timeSlot] || timeSlot;
};
</script>

<style scoped>
.schedule-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: #f8f8f8;
  border-radius: 4px;
  font-size: 13px;
  margin-bottom: 4px;
}

.schedule-card.full {
  background: #f5f5f5;
  opacity: 0.7;
}

.schedule-date,
.schedule-time {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
}

.schedule-quota {
  margin-left: auto;
  color: #52c41a;
  font-weight: 500;
}

.schedule-quota.full {
  color: #ff4d4f;
}
</style>
