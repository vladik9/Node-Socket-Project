import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { MedicContext } from '../../Context/medicContext';
import { useContext } from 'react';
export default function Chart() {
  const { currentPatient } = useContext(MedicContext);

  const data = currentPatient || [];

  return (
    <LineChart
      xAxis={[{ data: Array.from({ length: data.length }, (_, i) => i + 1) }]}
      series={[
        {
          data,
          showMark: false,
        },
      ]}

      height={400}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ vertical: true, horizontal: true }}

    />
  );
}
