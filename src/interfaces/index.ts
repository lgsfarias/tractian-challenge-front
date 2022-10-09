export interface User {
  _id: string;
  name: string;
  email: string;
  company: Company;
}

export interface Company {
  _id: string;
  name: string;
}

export interface Unit {
  _id: string;
  name: string;
  company: string;
}

export interface Employee {
  _id: string;
  name: string;
  unit: string;
}

export interface Asset {
  _id: string;
  image: string;
  name: string;
  description: string;
  model: string;
  owner: string;
  status: 'Running' | 'Alerting' | 'Stopped';
  healthLevel: number;
}
