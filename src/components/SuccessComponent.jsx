import React from 'react';
import { Paper, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999,
  padding: theme.spacing(4),
  backgroundColor: '#4caf50', // Green color for success
  color: '#fff', // White text color
  borderRadius: '8px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  animation: '$fadeIn 0.5s ease-in-out',
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(0.8)',
    },
    '100%': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
    },
  },
}));

const SuccessComponent = ({ text }) => {
  return (
    <StyledPaper elevation={5}>
      <IconButton
        style={{ fontSize: 60, color: '#fff', marginBottom: '1rem' }}
        aria-label="success"
      >
        <CheckCircleOutlineIcon fontSize="inherit" />
      </IconButton>
      <Typography variant="h5" component="div">
        {text}
      </Typography>
    </StyledPaper>
  );
};

export default SuccessComponent;
