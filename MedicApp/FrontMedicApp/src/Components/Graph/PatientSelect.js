import *  as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MedicContext } from '../../Context/medicContext';
import { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'; // Add this import

export default function PatientSelect() {
  const [patientId, setPatientId] = useState("");
  const [newPatientId, setNewPatientId] = useState("");

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
  const handleByNewPatientSearch = () => {
    if (newPatientId != null && newPatientId !== "") handleSearchNewPatient(newPatientId);
  };

  return (
    <>
      <Grid container spacing={1} direction="row" alignItems="center">
        <Grid item xs={12} md={5} lg={5}>
          <InputLabel id="demo-simple-select-label">Patient id:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="patientId"
            value={patientId}
            label="Patient id:"
            onChange={handleDropSearch}
            fullWidth
          >
            {patientList.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            id="outlined-basic"
            hiddenLabel
            size="small"
            value={newPatientId}
            variant="outlined"
            aria-label="Patient id:"
            placeholder="Patient id:"
            onChange={(e) =>
              setNewPatientId(e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Button variant="contained" color="primary" onClick={handleByNewPatientSearch} >
            Search a new patient
          </Button>
        </Grid>
      </Grid>
    </>

  );
};