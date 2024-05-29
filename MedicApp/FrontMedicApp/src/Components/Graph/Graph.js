import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import SimplePopup from '../Popup/Popup';
export default function Hero() {
  const [patientId, setPatientId] = useState(0);
  return (
    <Box
      id="graph"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : 'linear-gradient(#02294F, #090E10)',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            component="h2"
            variant="h2"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            EOG&nbsp;
            <Typography
              component="span"
              variant="h2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              life dynamics
            </Typography>
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <TextField
              id="patientId"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter patient Id:"
              placeholder="Patient Id:"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              inputProps={{
                autocomplete: 'off',
                ariaLabel: 'Patient Id:',
              }}
            />
            <SimplePopup action={"Search"} patientId={patientId} />
          </Stack>

        </Stack>
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
            backgroundImage:
              theme.palette.mode === 'light'
                ? 'url("/static/images/templates/templates-images/hero-light.png")'
                : 'url("/static/images/templates/templates-images/hero-dark.png")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          })}
        />
      </Container>
    </Box>
  );
}