<template>
  <div class="my-appointments">
    <div class="page-header">
      <h1>我的预约</h1>
      <p>管理您的预约记录</p>
    </div>

    <a-card>
      <!-- 患者验证提示 -->
      <a-alert
        v-if="!isPatientLoggedIn"
        message="请先验证患者身份"
        description="需要验证您的身份后才能查看预约记录"
        type="warning"
        show-icon
        style="margin-bottom: 16px"
      />

      <template #title v-if="isPatientLoggedIn">
        <Space>
          <span>我的预约</span>
          <a-badge :count="filteredAppointments.length" :number-style="{ backgroundColor: '#1890ff' }" />
        </Space>
      </template>

      <!-- 状态筛选标签 -->
      <div v-if="isPatientLoggedIn" class="filter-tabs">
        <a-radio-group v-model:value="statusFilter" button-style="solid">
          <a-radio-button value="all">全部</a-radio-button>
          <a-radio-button value="pending">待确认</a-radio-button>
          <a-radio-button value="confirmed">已确认</a-radio-button>
          <a-radio-button value="completed">已完成</a-radio-button>
          <a-radio-button value="cancelled">已取消</a-radio-button>
        </a-radio-group>
      </div>

      <!-- 预约列表 -->
      <div v-if="isPatientLoggedIn" class="appointments-list">
        <a-empty v-if="filteredAppointments.length === 0" description="暂无预约记录">
          <a-button type="primary" @click="goToDoctors">去预约</a-button>
        </a-empty>

        <a-card
          v-for="appointment in filteredAppointments"
          :key="appointment.id"
          class="appointment-card"
          :class="getStatusClass(appointment.status)"
        >
          <div class="appointment-header">
            <span class="appointment-no">预约号：{{ appointment.appointmentNo }}</span>
            <a-tag :color="getStatusColor(appointment.status)">
              {{ getStatusLabel(appointment.status) }}
            </a-tag>
          </div>

          <div class="appointment-body">
            <div class="appointment-info">
              <div class="info-row">
                <UserOutlined />
                <span>{{ getDoctorName(appointment.doctorUsername) }}</span>
              </div>
              <div class="info-row">
                <CalendarOutlined />
                <span>{{ getScheduleInfo(appointment.scheduleId) }}</span>
              </div>
              <div class="info-row">
                <ClockCircleOutlined />
                <span>{{ formatDateTime(appointment.createdAt) }}</span>
              </div>
            </div>
          </div>

          <div class="appointment-footer">
            <a-space>
              <a-button
                v-if="canCancel(appointment.status)"
                danger
                @click="showCancelModal(appointment)"
              >
                取消预约
              </a-button>
              <a-button
                v-if="appointment.status === 'pending'"
                type="primary"
                @click="confirmAppointmentHandler(appointment.id)"
              >
                已线下确认
              </a-button>
            </a-space>
          </div>
        </a-card>
      </div>
    </a-card>

    <!-- 取消确认弹窗 -->
    <a-modal
      v-model:open="cancelModalVisible"
      title="确认取消预约"
      @ok="cancelAppointment"
      :confirmLoading="cancelling"
    >
      <a-result
        status="warning"
        title="确定要取消此预约吗？"
        :sub-title="`预约号：${cancelTarget?.appointmentNo || ''}`"
      >
        <template #extra>
          <p style="color: #ff4d4f">取消后号源将释放，其他患者可继续预约</p>
        </template>
      </a-result>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import {
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons-vue';
import type { Appointment, AppointmentStatus } from '../store';
import { store } from '../store';

const router = useRouter();

// 状态
const isPatientLoggedIn = computed(() => store.state.currentPatient !== null);
const statusFilter = ref<string>('all');
const cancelModalVisible = ref(false);
const cancelling = ref(false);
const cancelTarget = ref<Appointment | null>(null);

// 获取当前患者的预约
const myAppointments = computed(() => {
  if (!store.state.currentPatient) return [];
  return store.getAppointmentsByPatient(store.state.currentPatient.name);
});

// 筛选预约
const filteredAppointments = computed(() => {
  if (statusFilter.value === 'all') {
    return myAppointments.value;
  }
  return myAppointments.value.filter(a => a.status === statusFilter.value);
});

// 获取医生名称
const getDoctorName = (doctorUsername: string): string => {
  const doctor = store.getDoctorByUsername(doctorUsername);
  return doctor?.name || doctorUsername;
};

// 获取排班信息
const getScheduleInfo = (scheduleId: string): string => {
  const schedule = store.getScheduleById(scheduleId);
  if (!schedule) return '排班信息不存在';

  const date = new Date(schedule.date);
  const dateStr = `${date.getMonth() + 1}月${date.getDate()}日`;

  const timeSlotLabels: Record<string, string> = {
    morning: '上午',
    afternoon: '下午',
    evening: '晚间',
  };

  return `${dateStr} ${timeSlotLabels[schedule.timeSlot] || schedule.timeSlot}`;
};

// 格式化日期时间
const formatDateTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

// 状态相关方法
const getStatusLabel = (status: AppointmentStatus): string => {
  const labels: Record<AppointmentStatus, string> = {
    pending: '待确认',
    confirmed: '已确认',
    completed: '已完成',
    cancelled: '已取消',
  };
  return labels[status] || status;
};

const getStatusColor = (status: AppointmentStatus): string => {
  const colors: Record<AppointmentStatus, string> = {
    pending: 'orange',
    confirmed: 'blue',
    completed: 'green',
    cancelled: 'red',
  };
  return colors[status] || 'default';
};

const getStatusClass = (status: AppointmentStatus): string => {
  return `status-${status}`;
};

const canCancel = (status: AppointmentStatus): boolean => {
  return status === 'pending' || status === 'confirmed';
};

// 取消预约
const showCancelModal = (appointment: Appointment) => {
  cancelTarget.value = appointment;
  cancelModalVisible.value = true;
};

const cancelAppointment = async () => {
  if (!cancelTarget.value) return;

  cancelling.value = true;

  await new Promise(resolve => setTimeout(resolve, 500));

  const result = store.cancelAppointment(cancelTarget.value.id);

  cancelling.value = false;

  if (result) {
    message.success('预约已取消');
    cancelModalVisible.value = false;
  } else {
    message.error('取消失败');
  }
};

// 确认预约（线下确认）
const confirmAppointmentHandler = async (appointmentId: string) => {
  const result = store.confirmAppointment(appointmentId);
  if (result) {
    message.success('已确认预约');
  } else {
    message.error('操作失败');
  }
};

// 导航
const goToDoctors = () => {
  router.push('/doctors');
};
</script>

<style scoped>
.my-appointments {
  min-height: calc(100vh - 64px);
  background: #f0f2f5;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 48px 24px;
  text-align: center;
  color: #fff;
}

.page-header h1 {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}

.page-header p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.filter-tabs {
  margin-bottom: 16px;
}

.appointments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.appointment-card {
  transition: all 0.3s;
}

.appointment-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.appointment-card.status-cancelled {
  opacity: 0.6;
}

.appointment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.appointment-no {
  font-size: 13px;
  color: #999;
}

.appointment-body {
  padding: 12px 0;
}

.appointment-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
}

.appointment-footer {
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
  margin-top: 12px;
}
</style>
