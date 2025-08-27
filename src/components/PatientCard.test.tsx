// src/components/PatientCard.test.tsx
import { render, screen } from '@testing-library/react'
import React from 'react'
import { PatientCard } from './PatientCard'

describe('PatientCard', () => {
  test('renders patient name and risk', () => {
    render(<PatientCard name="Jamie Lee" lastSeen="2025-08-20" risk="med" />)
    expect(screen.getByTestId('name')).toHaveTextContent('Jamie Lee')
    expect(screen.getByText('MED')).toBeInTheDocument()
    expect(screen.getByText(/Last seen:/i)).toBeInTheDocument()
  })
})
