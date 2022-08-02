import { Stack } from '@mui/material';
import { ReactNode } from 'react';

export const Container = ({ children }: { children?: ReactNode }) => (
  <Stack
    spacing={3}
    direction="row"
    sx={{
      alignItems: 'center',
      justifyContent: 'center',
      margin: 8
    }}
  >
    <Stack spacing={3} sx={{ width: 500 }}>
      {children}
    </Stack>
  </Stack>
);
