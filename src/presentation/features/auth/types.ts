export type AuthRole = 'teacher' | 'assistant';
export type AuthMode = 'login' | 'register';

export interface AssistantCredentials {
  teacherIdentifier: string;
  pin: string;
}

export interface AssistantPinCredentials {
  teacherCode: string;
  pin: string;
}

export interface TeacherAuthCredentials {
  email: string;
  password?: string;
  rememberMe: boolean;
}
