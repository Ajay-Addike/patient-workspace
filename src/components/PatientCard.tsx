// src/components/PatientCard.tsx
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material'

export type Risk = 'low' | 'med' | 'high'
type Props = { name: string; lastSeen: string; risk: Risk }

const riskColor = (r: Risk) => (r === 'high' ? 'error' : r === 'med' ? 'warning' : 'success')

export function PatientCard({ name, lastSeen, risk }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" data-testid="name">{name}</Typography>
          <Chip label={risk.toUpperCase()} color={riskColor(risk)} size="small" />
        </Stack>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
          Last seen: {new Date(lastSeen).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  )
}
