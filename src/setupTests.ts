import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// 👇 This line wires up all jest-dom matchers to Vitest's expect for you
import '@testing-library/jest-dom/vitest'

// Clean up the DOM after each test
afterEach(() => {
  cleanup()
})
