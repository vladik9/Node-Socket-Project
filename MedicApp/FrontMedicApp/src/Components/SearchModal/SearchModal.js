import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import React, { useContext, useState } from 'react';
import { MedicContext } from '../../Context/medicContext';
import styles from './SearchModal.module.css';

export default function SearchModal({ action, patientId }) {
  const [searchAnchor, setSearchAnchor] = useState(null);
  const [responseAnchor, setResponseAnchor] = useState(null);
  const [newPatientId, setNewPatientId] = useState('');
  const { handleSearchNewPatient } = useContext(MedicContext);
  const [responseMessage, setResponseMessage] = useState('null');
  const handleShowModal = (event) => {
    setSearchAnchor(searchAnchor ? null : event.currentTarget);
  };

  const handleShowResponseModal = (event) => {
    setResponseAnchor(responseAnchor ? null : event.currentTarget);
    setTimeout(() => {
      setResponseAnchor(null);
    }, 2000);
  };

  const handleByNewPatientSearch = async () => {
    if (!newPatientId || newPatientId === '') {
      return;
    }
    if (newPatientId && newPatientId !== '') {
      try {
        const response = await handleSearchNewPatient(newPatientId);
        setResponseMessage(response.data.message);
      } catch (error) {
        setResponseMessage(error.message);
      }
    }
    setTimeout(() => {
      setNewPatientId('');
      setSearchAnchor(null);
      handleShowResponseModal({ currentTarget: searchAnchor });
    }, 1000);
  };


  const searchOpen = Boolean(searchAnchor);
  const searchId = searchOpen ? 'simple-popup' : undefined;

  const responseOpen = Boolean(responseAnchor);
  const responseId = responseOpen ? 'simple-popper' : undefined;

  return (
    <div>
      <MenuItem variant="contained" color="primary" aria-describedby={searchId} onClick={handleShowModal}>
        <Typography variant="body2" color="text.primary">
          Search
        </Typography>
      </MenuItem>
      <BasePopup id={searchId} open={searchOpen} anchor={searchAnchor}>
        <PopupBody>
          <TextField
            id="outlined-basic"
            hiddenLabel
            size="small"
            value={newPatientId}
            variant="outlined"
            aria-label="new patient id:"
            placeholder="patient id:"
            onChange={(e) => setNewPatientId(e.target.value)}
          />
          <Button
            color="primary"
            variant="contained"
            size="small"
            className={styles.container}
            onClick={handleByNewPatientSearch}
          >
            Search
          </Button>
        </PopupBody>
      </BasePopup>
      <BasePopup id={responseId} open={responseOpen} anchor={responseAnchor}>
        <PopupBody>{responseMessage}</PopupBody>
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

const PopupBody = styled('div')(({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${theme.palette.mode === 'dark'
    ? '0px 4px 8px rgb(0 0 0 / 0.7)'
    : '0px 4px 8px rgb(0 0 0 / 0.1)'};
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
  position: relative;
  top: 10px;
`);
