// src/components/ProfileCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

const ProfileCard = ({ name, avatarUrl, description }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', mt: 3 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar alt={name} src={avatarUrl} sx={{ width: 56, height: 56 }} />
          </Grid>
          <Grid item>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
