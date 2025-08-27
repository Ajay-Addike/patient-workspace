// src/components/PatientCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { PatientCard } from './PatientCard'

const meta: Meta<typeof PatientCard> = {
  title: 'Components/PatientCard',
  component: PatientCard,
  args: {
    name: 'Alex Parker',
    lastSeen: '2025-08-15',
    risk: 'low',
  },
}
export default meta
type Story = StoryObj<typeof PatientCard>

export const Low: Story = {}
export const Med: Story = { args: { risk: 'med' } }
export const High: Story = { args: { risk: 'high' } }
