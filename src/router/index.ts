import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/consultation',
    name: 'Consultation',
    component: () => import('../views/Consultation.vue'),
  },
  {
    path: '/consultation/:doctorUsername',
    name: 'ConsultationRoom',
    component: () => import('../views/Consultation.vue'),
  },
  {
    path: '/doctors',
    name: 'Doctors',
    component: () => import('../views/Doctors.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/doctor/login',
    name: 'DoctorLogin',
    component: () => import('../views/DoctorLogin.vue'),
  },
  {
    path: '/doctor/room/:username',
    name: 'DoctorRoom',
    component: () => import('../views/DoctorRoom.vue'),
  },
  {
    path: '/appointment/:doctorUsername',
    name: 'AppointmentBooking',
    component: () => import('../views/AppointmentBooking.vue'),
  },
  {
    path: '/my-appointments',
    name: 'MyAppointments',
    component: () => import('../views/MyAppointments.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
