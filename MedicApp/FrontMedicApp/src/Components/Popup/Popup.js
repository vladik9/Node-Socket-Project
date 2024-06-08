import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MedicContext } from '../../Context/medicContext';
import { useContext, useState } from 'react';
import styles from "./Popup.module.css";
// import Button from '@mui/material/Button';
export default function SimplePopup({ action, patientId }) {
  const [anchor, setAnchor] = React.useState(null);
  const [newPatientId, setNewPatientId] = useState("");
  const { handleSearchNewPatient } = useContext(MedicContext);

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);

  };
  const handleByNewPatientSearch = () => {
    if (newPatientId != null && newPatientId !== "") handleSearchNewPatient(newPatientId);
    setAnchor(null);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  return (
    <div>
      <MenuItem variant="contained" color="primary" aria-describedby={id} onClick={handleClick}>
        <Typography variant="body2" color="text.primary">
          Search
        </Typography>

      </MenuItem>
      <BasePopup id={id} open={open} anchor={anchor}>
        <PopupBody>

          <TextField
            id="outlined-basic"
            hiddenLabel
            size="small"
            value={newPatientId}
            variant="outlined"
            aria-label="new patient id:"
            placeholder="new patient id:"
            onChange={(e) =>
              setNewPatientId(e.target.value)
            }
          />
          <Button color="primary"
            variant="contained"
            size="small"
            className={styles.container}
            onClick={handleByNewPatientSearch}
          >
            Search
          </Button>

        </PopupBody>
      </BasePopup>
    </div>
  );
}



const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};



const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
  position:relative;
  top:10px;
`,
);

