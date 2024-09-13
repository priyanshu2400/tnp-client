// ChatbotCard.js
import React from 'react';
import { Box, Typography, Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';

const ChatbotCard = () => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/help');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 50, // Increase padding from bottom
        right: 50, // Increase padding from right
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: 3,
        borderRadius: 2,
        p: 1,
      }}
    >
      <Typography variant="body1">Need Help? Chat with us!</Typography>
      <Fab
        color="primary"
        aria-label="chat"
        sx={{ ml: 1 }}
        onClick={handleChatClick}
      >
        <ChatIcon />
      </Fab>
    </Box>
  );
};

export default ChatbotCard;
