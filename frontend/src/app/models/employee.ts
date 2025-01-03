export interface Employee {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  department: number;
  hire_date: string;
  status: boolean;
}

export interface Department {
  id?: number;
  name: string;
}