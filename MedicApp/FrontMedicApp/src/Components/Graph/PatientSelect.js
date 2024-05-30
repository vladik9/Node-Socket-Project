import *  as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MedicContext } from '../../Context/medicContext';
import { useContext, useEffect, useState } from 'react';
export default function PatientSelect() {
  const [patientId, setPatientId] = useState(0);

  const patientList = [
    12345678,
    87654321,
    23456789,
    98765432,
    34567890,
    67890123,
    45678901,
    78901234
  ];
  const { handleSearch } = useContext(MedicContext);

  // //ToDo: this will make a call in db to get all users info assigned to same medic
  useEffect(() => {
    console.log("getting list of patients from db...");
  }, []);
  useEffect(() => {
    console.log("get info for one patient");
  }, [patientId]);


  const handleDropSearch = (event) => {
    const id = event.target.value;
    console.log(id);
    setPatientId(event.target.value);
    handleSearch(id);
  };

  return (
    <Box sx={{ minWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Patient id:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="patientId"
          value={patientList[0]}
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
}