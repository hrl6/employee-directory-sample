import { Department } from './department';

export interface Employee {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  department: number | Department;
  hire_date: string;
  status: boolean;
  created_at?: string;
  updated_at?: string;
}
