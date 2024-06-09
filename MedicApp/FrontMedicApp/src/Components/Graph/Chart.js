import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { MedicContext } from '../../Context/medicContext';
import { useContext } from 'react';
import { Grid } from '@mui/material';

export default function Chart() {
  const { currentPatient } = useContext(MedicContext);

  const dataOne = currentPatient.dataSeriesOne || [];
  const dataTwo = currentPatient.dataSeriesTwo || [];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12}>
        <LineChart
          xAxis={[{ data: Array.from({ length: dataOne.length }, (_, i) => i + 1) }]}
          series={[
            {
              curve: 'natural', data: dataOne,
              showMark: false,
            },
          ]}
          height={400}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <LineChart
          xAxis={[{ data: Array.from({ length: dataTwo.length }, (_, i) => i + 1) }]}
          series={[
            {
              curve: 'natural', color: 'rgb(85, 146, 181)', data: dataTwo,
              showMark: false,
            },
          ]}
          height={400}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        />
      </Grid>
    </Grid>
  );
}
