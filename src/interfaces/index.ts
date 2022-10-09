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
  company: Company;
}

export interface Employee {
  _id: string;
  name: string;
  unit: Unit;
}

export interface Asset {
  _id: string;
  image: string;
  name: string;
  description: string;
  model: string;
  status: 'Running' | 'Alerting' | 'Stopped';
  healthLevel: number;
  owner: Employee;
  unit: Unit;
}
