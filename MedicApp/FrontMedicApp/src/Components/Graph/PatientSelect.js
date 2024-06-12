import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { MedicContext } from '../../Context/medicContext';

export default function PatientSelect() {
  const [patientId, setPatientId] = useState("");

  const { handleSearchByMedicId, handleSearchByPatientId, patientList, currentMedic, requestNewData, setRequestNewData } = useContext(MedicContext);

  useEffect(() => {
    if (requestNewData) {
      handleSearchByMedicId(currentMedic.medic.medicId);
      setRequestNewData(false);
    }
  }, [requestNewData]);

  const handleDropSearch = (event) => {
    const id = event.target.value;
    setPatientId(event.target.value);
    handleSearchByPatientId(id);
  };
  return (
    <Box sx={{ minWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Patient id:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="patientId"
          value={patientId}
          label="Patient id:"
          defaultValue={0}
          onChange={handleDropSearch}
        >
          {patientList.map((id) => (
            <MenuItem key={id} value={id}>
              {id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};