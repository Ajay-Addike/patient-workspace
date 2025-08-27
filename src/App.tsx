import React from 'react';
import { AppShell } from './layout/AppShell';
import { PatientList } from './features/patients/PatientList';

export default function App() {
  return (
    <AppShell>
      <PatientList />
    </AppShell>
  );
}
