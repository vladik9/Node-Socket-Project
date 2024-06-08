import *  as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MedicContext } from '../../Context/medicContext';
import { useContext, useEffect, useState } from 'react';

export default function PatientSelect() {
  const [patientId, setPatientId] = useState("");

  const { handleSearchByMedicId, handleSearchByPatientId, handleSearchNewPatient, patientList, currentMedic } = useContext(MedicContext);

  // ToDo: this will make a call in db to get all users info assigned to same medic
  useEffect(() => {
    handleSearchByMedicId(currentMedic.medic.medicId);
  }, []);


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