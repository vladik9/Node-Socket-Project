import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
const items = [
  {
    icon: <LocalHospitalIcon />,
    title: "Handy for medics",
    description: "This app provides essential tools and resources for medical professionals."

  },
  {
    icon: <VisibilityIcon />,
    title: 'Monitories patient metrics',
    description:
      "This platform allows healthcare providers to monitor patient metrics from any location."
  },
  {
    icon: <ScreenSearchDesktopIcon />,
    title: 'View inspect and analyze',
    description:
      "This tool enables to view, inspect, and analyze medical data with ease. Offering advanced visualization features, detailed inspection capabilities",
  },
];

export default function About() {
  return (
    <Box
      id="about"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            EOG
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            System to monitoring patient metrics
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}