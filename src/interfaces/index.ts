export interface User {
  name: string;
  email: string;
  company: Company;
}

export interface Company {
  name: string;
}

export interface Unit {
  name: string;
  company: string;
}

export interface Employee {
  name: string;
  unit: string;
}

export interface Asset {
  image: string;
  name: string;
  description: string;
  model: string;
  owner: string;
  status: 'Running' | 'Alerting' | 'Stopped';
  healthLevel: number;
}
