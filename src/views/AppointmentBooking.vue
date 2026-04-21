<template>
  <div class="appointment-booking">
    <!-- 医生信息头部 -->
    <div class="doctor-info" v-if="doctor">
      <img :src="doctor.avatar" :alt="doctor.name" class="doctor-avatar" />
      <div class="doctor-details">
        <h2>{{ doctor.name }}</h2>
        <p>{{ doctor.title }} · {{ doctor.department }}</p>
      </div>
    </div>

    <a-card v-if="doctor">
      <template #title>
        <CalendarOutlined /> 选择预约时间
      </template>

      <!-- 患者验证提示 -->
      <a-alert
        v-if="!isPatientLoggedIn"
        message="请先验证患者身份"
        description="需要验证您的身份后才能进行预约挂号"
        type="warning"
        show-icon
        style="margin-bottom: 16px"
      />

      <!-- 排班列表 -->
      <div class="schedule-list">
        <div v-if="doctorSchedules.length === 0" class="empty-schedule">
          <a-empty description="暂无可预约的排班" />
        </div>

        <div v-else>
          <a-row :gutter="[16, 16]">
            <a-col :xs="24" :sm="12" :md="8" v-for="schedule in doctorSchedules" :key="schedule.id">
              <a-card
                class="schedule-item"
                :class="{ 'full': isScheduleFull(schedule), 'selected': selectedSchedule?.id === schedule.id }"
                hoverable
                @click="selectSchedule(schedule)"
              >
                <div class="schedule-content">
                  <div class="schedule-date">
                    <CalendarOutlined />
                    <span>{{ formatDate(schedule.date) }}</span>
                  </div>
                  <div class="schedule-time">
                    <ClockCircleOutlined />
                    <span>{{ getTimeSlotLabel(schedule.timeSlot) }}</span>
                  </div>
                  <div class="schedule-quota" :class="{ 'full': isScheduleFull(schedule) }">
                    <template v-if="!isScheduleFull(schedule)">
                      剩余 <strong>{{ schedule.totalQuota - schedule.bookedCount }}</strong> 个号源
                    </template>
                    <template v-else>
                      已约满
                    </template>
                  </div>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </div>

      <!-- 预约按钮 -->
      <div class="booking-action" v-if="selectedSchedule && !isScheduleFull(selectedSchedule)">
        <a-button
          type="primary"
          size="large"
          block
          :disabled="!isPatientLoggedIn"
          @click="showConfirmModal"
        >
          确认预约
        </a-button>
        <p v-if="!isPatientLoggedIn" class="login-hint">请先在首页验证患者身份</p>
      </div>
    </a-card>

    <!-- 医生不存在 -->
    <a-result
      v-else
      status="warning"
      title="医生不存在"
      sub-title="未找到对应的医生信息"
    >
      <template #extra>
        <a-button type="primary" @click="goToDoctors">返回医生列表</a-button>
      </template>
    </a-result>

    <!-- 确认预约弹窗 -->
    <a-modal
      v-model:open="confirmModalVisible"
      title="确认预约信息"
      @ok="submitAppointment"
      :confirmLoading="submitting"
    >
      <a-descriptions v-if="selectedSchedule && doctor" bordered :column="1">
        <a-descriptions-item label="医生">{{ doctor.name }}</a-descriptions-item>
        <a-descriptions-item label="科室">{{ doctor.department }}</a-descriptions-item>
        <a-descriptions-item label="日期">{{ formatFullDate(selectedSchedule.date) }}</a-descriptions-item>
        <a-descriptions-item label="时段">{{ getTimeSlotLabel(selectedSchedule.timeSlot) }}</a-descriptions-item>
      </a-descriptions>

      <a-divider />

      <a-alert type="info" show-icon>
        <template #message>温馨提示</template>
        <template #description>
          请按时就诊，如需取消请提前联系。预约成功后可在"我的预约"中查看。
        </template>
      </a-alert>
    </a-modal>

    <!-- 预约成功弹窗 -->
    <a-modal
      v-model:open="successModalVisible"
      title="预约成功"
      :footer="null"
      :closable="false"
    >
      <a-result
        status="success"
        title="预约成功！"
        :sub-title="`预约号：${successAppointmentNo}`"
      >
        <template #extra>
          <a-space>
            <a-button @click="goToMyAppointments">查看我的预约</a-button>
            <a-button type="primary" @click="successModalVisible = false">继续浏览</a-button>
          </a-space>
        </template>
      </a-result>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons-vue';
import { store, Schedule, TimeSlot } from '../store';

const router = useRouter();
const route = useRoute();
const doctorUsername = route.params.doctorUsername as string;

// 状态
const doctor = computed(() => store.getDoctorByUsername(doctorUsername));
const isPatientLoggedIn = computed(() => store.state.currentPatient !== null);
const selectedSchedule = ref<Schedule | null>(null);
const confirmModalVisible = ref(false);
const successModalVisible = ref(false);
const successAppointmentNo = ref('');
const submitting = ref(false);

// 获取医生的排班
const doctorSchedules = computed(() => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return store.getSchedulesByDoctor(doctorUsername)
    .filter(s => new Date(s.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
});

// 检查排班是否已满
const isScheduleFull = (schedule: Schedule): boolean => {
  return schedule.bookedCount >= schedule.totalQuota;
};

// 格式化日期
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return `${date.getMonth() + 1}月${date.getDate()}日 ${weekDays[date.getDay()]}`;
};

const formatFullDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};

// 获取时段标签
const getTimeSlotLabel = (timeSlot: TimeSlot): string => {
  const labels: Record<TimeSlot, string> = {
    morning: '上午 (08:00-12:00)',
    afternoon: '下午 (14:00-17:00)',
    evening: '晚间 (18:00-20:00)',
  };
  return labels[timeSlot] || timeSlot;
};

// 选择排班
const selectSchedule = (schedule: Schedule) => {
  if (isScheduleFull(schedule)) {
    message.warning('该时段已约满，请选择其他时段');
    return;
  }
  selectedSchedule.value = schedule;
};

// 显示确认弹窗
const showConfirmModal = () => {
  if (!isPatientLoggedIn.value) {
    message.warning('请先验证患者身份');
    return;
  }
  confirmModalVisible.value = true;
};

// 提交预约
const submitAppointment = async () => {
  if (!selectedSchedule.value || !store.state.currentPatient) return;

  submitting.value = true;

  // 模拟异步操作
  await new Promise(resolve => setTimeout(resolve, 500));

  const result = store.addAppointment(
    store.state.currentPatient.name,
    doctorUsername,
    selectedSchedule.value.id
  );

  submitting.value = false;

  if (result) {
    confirmModalVisible.value = false;
    successAppointmentNo.value = result.appointmentNo;
    successModalVisible.value = true;
    selectedSchedule.value = null;
  } else {
    message.error('预约失败，请重试');
  }
};

// 导航方法
const goToDoctors = () => {
  router.push('/doctors');
};

const goToMyAppointments = () => {
  router.push('/my-appointments');
};

onMounted(() => {
  if (!doctor.value) {
    message.error('医生不存在');
  }
});
</script>

<style scoped>
.appointment-booking {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: #f0f2f5;
}

.doctor-info {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.doctor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.doctor-details h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
}

.doctor-details p {
  margin: 0;
  color: #666;
}

.schedule-list {
  margin-bottom: 24px;
}

.empty-schedule {
  padding: 48px;
  text-align: center;
}

.schedule-item {
  transition: all 0.3s;
  cursor: pointer;
}

.schedule-item:hover {
  border-color: #1890ff;
}

.schedule-item.full {
  opacity: 0.6;
  cursor: not-allowed;
}

.schedule-item.selected {
  border: 2px solid #1890ff;
  background: #e6f7ff;
}

.schedule-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.schedule-date,
.schedule-time {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-size: 15px;
}

.schedule-quota {
  color: #52c41a;
  font-size: 13px;
}

.schedule-quota.full {
  color: #ff4d4f;
}

.booking-action {
  margin-top: 24px;
}

.login-hint {
  text-align: center;
  color: #ff4d4f;
  margin-top: 8px;
  font-size: 13px;
}
</style>
