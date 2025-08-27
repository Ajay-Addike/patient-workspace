import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

function Hello() { return <h1>Hello Vitest</h1> }

test('renders hello', () => {
  render(<Hello />)
  expect(screen.getByRole('heading', { name: /hello vitest/i })).toBeInTheDocument()
})
