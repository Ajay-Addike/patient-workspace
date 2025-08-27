import type { Patient } from './types';

export const PATIENTS: Patient[] = [
  { id: 'pt-201', name: 'Ava Johnson', age: 45, doctor: 'Dr. Patel',     status: 'admitted',    room: '3A-12', updatedAt: '2025-08-24T15:10:00Z' },
  { id: 'pt-202', name: 'Michael Chen', age: 61, doctor: 'Dr. Alvarez',  status: 'observation', room: '2B-07', updatedAt: '2025-08-23T12:00:00Z' },
  { id: 'pt-203', name: 'Priya Singh',  age: 29, doctor: 'Dr. Garcia',   status: 'discharged',  room: '—',     updatedAt: '2025-07-30T09:22:00Z' },
];
