import { reactive } from 'vue';
import doctorData from '../data/doctor-user-list.json';
import patientData from '../data/patient-user.json';
import questionData from '../data/question-list.json';
import scheduleData from '../data/schedule-list.json';
import appointmentData from '../data/appointment-list.json';

export enum TimeSlot {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
}

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface Schedule {
  id: string;
  doctorUsername: string;
  date: string;
  timeSlot: TimeSlot;
  totalQuota: number;
  bookedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  appointmentNo: string;
  patientUsername: string;
  doctorUsername: string;
  scheduleId: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: string;
  username: string;
  password: string;
  name: string;
  title: string;
  department: string;
  avatar: string;
  experience: string;
  specialties: string[];
  isActive: boolean;
}

export interface Patient {
  id: string;
  name: string;
  birthday: string;
  phone: string;
  gender: string;
}

export interface Question {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  question: string;
  submitTime: string;
  status: 'pending' | 'answered';
  answer: string | null;
  answerTime: string | null;
}

interface State {
  doctors: Doctor[];
  patients: Patient[];
  questions: Question[];
  schedules: Schedule[];
  appointments: Appointment[];
  currentDoctor: Doctor | null;
  currentPatient: Patient | null;
}

const state = reactive<State>({
  doctors: doctorData as Doctor[],
  patients: patientData as Patient[],
  questions: questionData as Question[],
  schedules: scheduleData as Schedule[],
  appointments: appointmentData as Appointment[],
  currentDoctor: null,
  currentPatient: null,
});

export const store = {
  state,

  loginDoctor(username: string, password: string): Doctor | null {
    const doctor = state.doctors.find(
      d => d.username === username && d.password === password
    );
    if (doctor) {
      state.currentDoctor = doctor;
      return doctor;
    }
    return null;
  },

  logoutDoctor() {
    state.currentDoctor = null;
  },

  verifyPatient(name: string, birthday: string): Patient {
    let patient = state.patients.find(
      p => p.name === name && p.birthday === birthday
    );

    if (!patient) {
      patient = {
        id: `patient${Date.now()}`,
        name,
        birthday,
        phone: '',
        gender: '',
      };
      state.patients.push(patient);
    }

    state.currentPatient = patient;
    return patient;
  },

  logoutPatient() {
    state.currentPatient = null;
  },

  getQuestionsByDoctor(doctorId: string): Question[] {
    return state.questions.filter(q => q.doctorId === doctorId);
  },

  getQuestionsByPatient(patientId: string): Question[] {
    return state.questions.filter(q => q.patientId === patientId);
  },

  addQuestion(question: Omit<Question, 'id' | 'submitTime' | 'status' | 'answer' | 'answerTime'>): Question {
    const newQuestion: Question = {
      ...question,
      id: `q${Date.now()}`,
      submitTime: new Date().toISOString(),
      status: 'pending',
      answer: null,
      answerTime: null,
    };
    state.questions.push(newQuestion);
    return newQuestion;
  },

  answerQuestion(questionId: string, answer: string) {
    const question = state.questions.find(q => q.id === questionId);
    if (question) {
      question.status = 'answered';
      question.answer = answer;
      question.answerTime = new Date().toISOString();
    }
  },

  markQuestionAsAnswered(questionId: string) {
    const question = state.questions.find(q => q.id === questionId);
    if (question) {
      question.status = 'answered';
      question.answer = '已口述解答';
      question.answerTime = new Date().toISOString();
    }
  },

  getDoctorByUsername(username: string): Doctor | undefined {
    return state.doctors.find(d => d.username === username);
  },

  getActiveDoctors(): Doctor[] {
    return state.doctors.filter(d => d.isActive);
  },

  getStatistics() {
    const totalDoctors = state.doctors.length;
    const totalQuestions = state.questions.length;
    const activeSessions = state.questions.filter(q => q.status === 'pending').length;
    const totalSessions = state.doctors.filter(d => d.isActive).length;

    return {
      totalDoctors,
      totalQuestions,
      activeSessions,
      totalSessions,
    };
  },

  getSchedulesByDoctor(doctorUsername: string): Schedule[] {
    return state.schedules.filter(s => s.doctorUsername === doctorUsername);
  },

  getScheduleById(scheduleId: string): Schedule | undefined {
    return state.schedules.find(s => s.id === scheduleId);
  },

  getAvailableSchedulesByDoctor(doctorUsername: string): Schedule[] {
    return state.schedules.filter(
      s => s.doctorUsername === doctorUsername && s.bookedCount < s.totalQuota
    );
  },

  addSchedule(schedule: Omit<Schedule, 'id' | 'createdAt' | 'updatedAt' | 'bookedCount'>): Schedule {
    const newSchedule: Schedule = {
      ...schedule,
      id: `sched${Date.now()}`,
      bookedCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.schedules.push(newSchedule);
    return newSchedule;
  },

  updateSchedule(scheduleId: string, updates: Partial<Schedule>): Schedule | null {
    const schedule = state.schedules.find(s => s.id === scheduleId);
    if (schedule) {
      Object.assign(schedule, updates, { updatedAt: new Date().toISOString() });
      return schedule;
    }
    return null;
  },

  deleteSchedule(scheduleId: string): boolean {
    const index = state.schedules.findIndex(s => s.id === scheduleId);
    if (index > -1) {
      state.schedules.splice(index, 1);
      return true;
    }
    return false;
  },

  getAppointmentsByPatient(patientUsername: string): Appointment[] {
    return state.appointments.filter(a => a.patientUsername === patientUsername);
  },

  getAppointmentsByDoctor(doctorUsername: string): Appointment[] {
    return state.appointments.filter(a => a.doctorUsername === doctorUsername);
  },

  getAppointmentsBySchedule(scheduleId: string): Appointment[] {
    return state.appointments.filter(a => a.scheduleId === scheduleId);
  },

  getAppointmentById(appointmentId: string): Appointment | undefined {
    return state.appointments.find(a => a.id === appointmentId);
  },

  addAppointment(
    patientUsername: string,
    doctorUsername: string,
    scheduleId: string
  ): Appointment | null {
    const schedule = state.schedules.find(s => s.id === scheduleId);
    if (!schedule) return null;
    if (schedule.bookedCount >= schedule.totalQuota) return null;

    const existingAppointment = state.appointments.find(
      a => a.patientUsername === patientUsername &&
           a.doctorUsername === doctorUsername &&
           a.scheduleId === scheduleId &&
           a.status !== AppointmentStatus.CANCELLED
    );
    if (existingAppointment) return null;

    const newAppointment: Appointment = {
      id: `apt${Date.now()}`,
      appointmentNo: `A${String(state.appointments.length + 1).padStart(6, '0')}`,
      patientUsername,
      doctorUsername,
      scheduleId,
      status: AppointmentStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.appointments.push(newAppointment);
    schedule.bookedCount++;
    return newAppointment;
  },

  updateAppointmentStatus(appointmentId: string, status: AppointmentStatus): Appointment | null {
    const appointment = state.appointments.find(a => a.id === appointmentId);
    if (!appointment) return null;

    const oldStatus = appointment.status;
    appointment.status = status;
    appointment.updatedAt = new Date().toISOString();

    if (status === AppointmentStatus.CANCELLED && oldStatus !== AppointmentStatus.CANCELLED) {
      const schedule = state.schedules.find(s => s.id === appointment.scheduleId);
      if (schedule && schedule.bookedCount > 0) {
        schedule.bookedCount--;
      }
    }

    return appointment;
  },

  confirmAppointment(appointmentId: string): Appointment | null {
    return this.updateAppointmentStatus(appointmentId, AppointmentStatus.CONFIRMED);
  },

  cancelAppointment(appointmentId: string): Appointment | null {
    return this.updateAppointmentStatus(appointmentId, AppointmentStatus.CANCELLED);
  },

  completeAppointment(appointmentId: string): Appointment | null {
    return this.updateAppointmentStatus(appointmentId, AppointmentStatus.COMPLETED);
  },
};
