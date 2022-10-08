export interface User {
  name: string;
  email: string;
  password: string;
  company: Company;
  createdAt: Date;
}

export interface Company {
  name: string;
  createdAt: Date;
}

export interface Unit {
  name: string;
  company: string;
  assets?: string[];
  employees?: string[];
  createdAt: Date;
}

export interface Employee {
  name: string;
  company: string;
  createdAt: Date;
}

export interface Asset {
  image: string;
  name: string;
  description: string;
  model: string;
  owner: string;
  status: 'Running' | 'Alerting' | 'Stopped';
  healthLevel: number;
  createdAt: Date;
}
