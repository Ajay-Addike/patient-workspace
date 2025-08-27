export type PatientStatus = 'admitted' | 'observation' | 'discharged';

export interface Patient {
  id: string;
  name: string;
  age: number;
  doctor: string;
  status: PatientStatus;
  room?: string;
  updatedAt: string; // ISO string
}
